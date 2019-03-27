import { Injectable } from '@angular/core';
import { State } from '../state/reducers';
import { Store } from '@ngrx/store';
import { ClientFormInterface } from '../clients/types/client-form.interface';
import {
  CreateNewClient, EditClient,
  GoToClientDetails,
  LoadAllClients,
  LoadClient,
  SaveClientNote,
  SetSelectedClient, StartDeleteClient, StartUpdateClient,
} from '../state/clients/page/client-page.actions';
import * as fromClientsSelectors from '../state/selectors/clients.selectors';
import { getClientEvents } from '../state/selectors/clients.selectors';
import { Observable } from 'rxjs';
import { Client } from '../clients/models/client.interface';
import { ClientEvent } from '../clients/models/client-event';
import { RxdbService } from './rxdb.service';
import {
  FetchClientEvents,
  StartAddClientEvent,
  StartDeleteeClientEvents, StartUpdateClientEvents, UpdateClientEventData,
} from '../state/clients/clientEvents/client-event.actions';
import {ClientsModule} from '../clients/clients.module';




@Injectable({ providedIn: 'root' })
export class ClientStateService {
  constructor(private store: Store<State>, private db: RxdbService) {}

  createClient({ client }: { client: ClientFormInterface }): void {
    this.store.dispatch(new CreateNewClient({ client }));
  }
  updateClient({client}: { client: ClientFormInterface }) {
    this.store.dispatch(new StartUpdateClient({client}));
  }
  getAllClients(): Observable<Array<Client>> {
    return this.store.select(fromClientsSelectors.getAllClients);
  }

  getClient(clientId: string): Observable<Client> {
    return this.store.select(fromClientsSelectors.getClientById(clientId));
  }

  getSelectedClient() {
    return this.store.select(fromClientsSelectors.getSelectedClient);
  }
  showClientDetails({ client }: { client: Client }) {
    this.store.dispatch(new GoToClientDetails({ client }));
  }
  loadAllClients() {
    this.store.dispatch(new LoadAllClients());
  }

  loadClient({ clientId }: { clientId: string }) {
    this.store.dispatch(new LoadClient({ clientId }));
  }

  setSelectedClient({ clientId }: { clientId: string }) {
    this.store.dispatch(new SetSelectedClient({ clientId }));
  }

  addClientEvent({ clientEvent, client }: { clientEvent: ClientEvent; client: Client }) {
    this.store.dispatch(new StartAddClientEvent({ clientEvent, client }));
  }
  fetchClientEvents({ clientId }) {
    this.store.dispatch(new FetchClientEvents({ clientId }));
  }

  getClientEvents() {
    return this.store.select(getClientEvents);
  }

  deleteClientEvent({ clientEventId }) {
    this.store.dispatch(new StartDeleteeClientEvents({ clientId: clientEventId }));
  }

  saveClientNote({ client, note }: { client: Client; note: string }) {
    this.store.dispatch(new SaveClientNote({ client, note }));
  }

  editClient({ client }: { client: Client }) {
    this.store.dispatch(new EditClient({ client }));
  }

    deleteClient(client: Client) {

        this.store.dispatch(new StartDeleteClient({client}));
    }

  updateClientEvent(changes: {newText: string; eventId: any} | ClientEvent) {
        this.store.dispatch(new UpdateClientEventData(changes));
  }
}
