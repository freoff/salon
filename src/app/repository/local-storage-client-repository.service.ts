import {ClientRepository, ClientRepositoryInterface} from './client-repository';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Client } from '../clients/models/client.interface';
import { EntityIdGeneratorService } from '../services/entity-id-generator.service';

export const CLIENTS_KEY = 'CLIENTS';
/*
    CLIETNS_KEY: HasMap(clientId: Client)



 */

@Injectable()
export class LocalStorageClientRepository implements ClientRepositoryInterface {
  constructor(private store: Storage, private id: EntityIdGeneratorService) {}
  saveClient({ client }) {
    const createClientPromise = this.getClientsFromStore().then((clients) => {
      const clientId = this.id.generate();
      const newClient = { ...client, id: clientId };
      return this.store.set(CLIENTS_KEY, { ...clients, [clientId]: newClient }).then(() => newClient);
    });
    return from(createClientPromise);
  }

  getAll(): Observable<Array<Client>> {
    return from(
      this.getClientsFromStore().then((clients) => (clients ? (Object.values(clients) as Array<Client>) : null)),
    );
  }

  getClient({ clientId }: { clientId: string }): Observable<Client> {
    return from(
        this.getClientsFromStore().then((clients: { [key: string]: Client }) => clients[clientId]).then(client => {
          console.log('im getting client', client);
          if (client) {
            return Promise.resolve(client);
          } else {
            return Promise.reject('Client dont exist');
          }
        })
    );
  }

  private getClientsFromStore(): Promise<{ [key: string]: Client }> {
    return this.store.ready().then(() => this.store.get(CLIENTS_KEY));
  }
}
