import { ClientRepositoryInterface } from './client-repository';
import { RxdbService } from '../services/rxdb.service';
import { Client } from '../clients/models/client.interface';
import { forkJoin, from, Observable, of } from 'rxjs';
import { EntityIdGeneratorService } from '../services/entity-id-generator.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import { exhaustMap, first, map, switchMap, take, tap } from 'rxjs/operators';
import { ClientEvent } from '../clients/models/client-event';

export class RxdbClientRepository implements ClientRepositoryInterface {
  constructor(private rxdb: RxdbService, private idGenerator: EntityIdGeneratorService) {}
  saveClient({ client }: { client: Client }): Observable<Client> {
    const newClient: Client = { ...client, id: this.idGenerator.generate() };
    console.log(newClient.id, newClient);
    return this.rxdb.getDb$().pipe(
      switchMap((db) => fromPromise(db.clients.insert(newClient))),
      map((addedClient) => addedClient.getClientData()),
    );
  }
  updateClient({ client }: { client: Client }) {
    return this.rxdb.getDb$().pipe(
      switchMap((db) =>
        from(
          db.clients
            .findOne(client.id)
            .exec()
            .then((clientDoc) =>
              clientDoc.atomicUpdate((oldData) => {
                console.log(`old ${oldData}\n client: ${client}`);
                return { ...oldData, ...client };
              }),
            ),
        ),
      ),
    );
  }
  deleteClient(clientId) {
    const deleteClientEvents$ = this.rxdb.getDb$().pipe(
      exhaustMap((db) =>
        from(
          db.client_events
            .find()
            .where('client')
            .equals(clientId)
            .remove(),
        ),
      ),
      first(),
    );
    const deleteClient$ = this.rxdb.getDb$().pipe(
      exhaustMap((db) => from(db.clients.findOne(clientId).remove())),
      first(),
    );
    return forkJoin(deleteClient$, deleteClientEvents$);
  }
  getAll(): Observable<Array<Client>> {
    return this.rxdb.getDb$().pipe(
      tap((clients) => console.log('fromClients', clients)),
      switchMap((db) => db.clients.find().$.pipe(map((result) => result.map((client) => client.getClientData())))),
    );
  }

  getClient({ clientId }: { clientId: any }): Observable<Client> {
    return this.rxdb.getDb$().pipe(
      switchMap((db) => db.clients.findOne({ id: { $eq: clientId } }).$),
      map((result) => ({ ...result.getClientData() })),
    );
  }

  addClientEvent(payload: { client: Client; clientEvent: ClientEvent }): Observable<any> {
    return of('dupa');
  }

  saveClientNote({ note, client }: { note: any; client: Client }) {
    return this.rxdb.getDb$().pipe(
      switchMap((db) => db.clients.findOne(client.id).$.pipe(first())),
      switchMap((clientDoc) => from(clientDoc.update({ $set: { clientNotes: note } }))),
    );
  }
}
