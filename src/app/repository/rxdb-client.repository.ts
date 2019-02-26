import { ClientRepository, ClientRepositoryInterface } from './client-repository';
import { RxdbService } from '../services/rxdb.service';
import { Client } from '../clients/models/client.interface';
import { from, Observable, of } from 'rxjs';
import { EntityIdGeneratorService } from '../services/entity-id-generator.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { MonoTypeOperatorFunction } from 'rxjs/src/internal/types';

export class RxdbClientRepository implements ClientRepositoryInterface {
  constructor(private rxdb: RxdbService, private idGenerator: EntityIdGeneratorService) {}
  saveClient({ client }: { client: Client }): Observable<Client> {
    const newClient: Client = { ...client, id: this.idGenerator.generate() };
    return from(
      this.rxdb
        .getDb()
        .then((db) => db.clients.insert(newClient))
        .then(() => newClient),
    );
  }
  // Promise<Observable<RxDocument<Client, ClientDocMethods>[]> | never>
  // Observable<Observable<RxDocument<Client, ClientDocMethods>[]>>
  getAll(): Observable<Array<Client>> {
    return from(this.rxdb.getDb()).pipe(
      tap((clients) => console.log('fromClients', clients)),
      switchMap((db) => db.clients.find().$.pipe(
          map(result => result.map(client => client.getClientData()))
      )),
    );
  }

  getClient({ clientId }: { clientId: any }): Observable<Client> {

    return this.rxdb.getDb$().pipe(
      switchMap((db) => db.clients.findOne({ id: { $eq: clientId } }).$),
      tap((data) => console.log(data)),
        map(result => ({...result.getClientData()}))
    );
  }
}

export const log = tap((data) => console.log(data));
