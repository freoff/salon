import {Client} from '../clients/models/client.interface';
import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {ClientEvent} from '../clients/models/client-event';

export interface ClientRepositoryInterface {
  saveClient({ client }: { client: Client }): Observable<Client>;
  addClientEvent(payload: { client: Client; clientEvent: ClientEvent }): Observable<any>;
  getAll(): Observable<Array<Client>>;
  getClient({ clientId }): Observable<Client>;
  saveClientNote({note, client}: { note: string; client: Client});

}

export const ClientRepository = new InjectionToken<ClientRepositoryInterface>('clientRepository');
