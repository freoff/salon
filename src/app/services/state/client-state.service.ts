import { Injectable } from '@angular/core';
import { State } from '../../state/reducers';
import { Store } from '@ngrx/store';
import { ClientFormInterface } from '../../clients/types/client-form.interface';
import {
  CreateNewClient,
  GoToClientDetails,
  LoadAllClients,
  LoadClient,
  SetSelectedClient,
} from '../../state/clients/page/client-page.actions';
import * as fromClientsSelectors from '../../state/selectors/clients.selectors';
import { getClientEvents } from '../../state/selectors/clients.selectors';
import { Observable } from 'rxjs';
import { Client } from '../../clients/models/client.interface';
import { ClientEvent } from '../../clients/models/client-event';
import { RxdbService } from '../rxdb.service';
import { tap } from 'rxjs/operators';
import { FetchClientEvents } from '../../state/clients/clientEvents/client-event.actions';
import * as moment from 'moment';

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

  addClientEvent(param: { clientEvent: ClientEvent; client: Client }) {
    this.db
      .getDb$()
      .pipe(
        tap(() => console.log(param.clientEvent)),
        tap((db) =>
          db.client_events
            .insert({
              ...param.clientEvent,
              client: param.client.id,
              eventDate: moment(param.clientEvent.eventDate).valueOf(),
            })
            .then((d) => console.log(d)),
        ),
      )
      .subscribe();

    // this.store.dispatch(new AddClientEvent({clientEvent, client}));
  }

  fetchClientEvents({ clientId }) {
    this.store.dispatch(new FetchClientEvents({ clientId }));
  }
  getClientEvents() {
    return this.store.select(getClientEvents);
  }
}
