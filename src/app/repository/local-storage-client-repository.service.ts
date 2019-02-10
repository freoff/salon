import { ClientRepository } from './client-repository';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Client } from '../clients/models/client.interface';
import { EntityIdGeneratorService } from '../services/entity-id-generator.service';

export const CLIENTS_KEY = 'CLIENTS';
/*
    CLIETNS_KEY: HasMap(clientId: Client)



 */

@Injectable()
export class LocalStorageClientRepository implements ClientRepository {
  constructor(private store: Storage, private id: EntityIdGeneratorService) {}
  saveClient({ client }) {
    const createClientPromise = this.store.ready().then(() =>
      this.store.get(CLIENTS_KEY).then((clients) => {
        const clientId = this.id.generate();
        const newClient = { ...client, id: clientId };
        return this.store.set(CLIENTS_KEY, { ...clients, [clientId]: newClient }).then(() => newClient);
      }),
    );
    return from(createClientPromise);
  }

  getAll(): Observable<Array<Client>> {
    return from(
      this.store
        .ready()
        .then(() => this.store.get(CLIENTS_KEY))
        .then((clients) => clients ? Object.values(clients) as Array<Client> : null),
    );
  }

  getClient({ clientId }: { clientId: any }): Observable<Client> {
    return undefined;
  }
}
