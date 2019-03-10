import {Injectable} from '@angular/core';
import {State} from '../../state/reducers';
import {Store} from '@ngrx/store';
import {ClientFormInterface} from '../../clients/types/client-form.interface';
import {
    CreateNewClient,
    GoToClientDetails,
    LoadAllClients,
    LoadClient,
    SaveClientNote,
    SetSelectedClient,
} from '../../state/clients/page/client-page.actions';
import * as fromClientsSelectors from '../../state/selectors/clients.selectors';
import {getClientEvents} from '../../state/selectors/clients.selectors';
import {Observable} from 'rxjs';
import {Client} from '../../clients/models/client.interface';
import {ClientEvent} from '../../clients/models/client-event';
import {RxdbService} from '../rxdb.service';
import {FetchClientEvents, StartAddClientEvent, StartDeleteeClientEvents} from '../../state/clients/clientEvents/client-event.actions';


@Injectable({ providedIn: 'root' })
export class ClientStateService {
  constructor(private store: Store<State>, private db: RxdbService) {}

  createClient({ client }: { client: ClientFormInterface }): void {
    this.store.dispatch(new CreateNewClient({ client }));
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

  deleteClientEvent({clientEventId}) {
    this.store.dispatch(new StartDeleteeClientEvents({clientId: clientEventId}));
  }

  saveClientNote({client, note}: {client: Client, note: string }) {
    this.store.dispatch(new SaveClientNote({client, note}));
  }
}
