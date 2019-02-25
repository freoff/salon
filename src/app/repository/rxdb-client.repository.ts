import { ClientRepository, ClientRepositoryInterface } from './client-repository';
import { RxdbService } from '../services/rxdb.service';
import { Client } from '../clients/models/client.interface';
import { from, Observable, of } from 'rxjs';
import { EntityIdGeneratorService } from '../services/entity-id-generator.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import { mergeMap, switchMap, tap } from 'rxjs/operators';

export class RxdbClientRepository implements ClientRepositoryInterface {
  constructor(private rxdb: RxdbService, private idGenerator: EntityIdGeneratorService) {}
  saveClient({ client }: { client: Client }): Observable<Client> {
    const newClient: Client = { ...client, id: this.idGenerator.generate() };
    return from(
      this.rxdb
        .getDb()
        .then((db) => db.clients.insert({ ...client, id: this.idGenerator.generate() }))
        .then(() => newClient),
    );
  }
  // Promise<Observable<RxDocument<Client, ClientDocMethods>[]> | never>
  // Observable<Observable<RxDocument<Client, ClientDocMethods>[]>>
  getAll(): Observable<Array<Client>> {

    const queryPromise = this.rxdb
      .getDb()
      .then((db) => db.clients.find().$)
      .then((res$query$) => res$query$);

    return fromPromise(queryPromise).pipe(
      switchMap((query$) => query$),
      tap((query) => console.log('query from getAll but from return', query)),
    );
  }

  getClient({ clientId }: { clientId: any }): Observable<Client> {
    return undefined;
  }
}
