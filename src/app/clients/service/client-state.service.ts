import { Injectable } from '@angular/core';
import { ClientsModule } from '../clients.module';
import { State } from '../../state/reducers';
import { Store } from '@ngrx/store';
import { ClientFormInterface } from '../types/client-form.interface';
import {
  CreateNewClient,
  GoToClientDetails,
  LoadAllClients,
  LoadClient,
  SetSelectedClient
} from '../../state/clients/page/client-page.actions';
import * as fromClientsSelectors from '../../state/selectors/clients.selectors';
import { from, Observable, of } from 'rxjs';
import { Client } from '../models/client.interface';
import {ClientsRoutingModule} from '../clients.routing.module';

@Injectable()
export class ClientStateService {
  constructor(private store: Store<State>) {}

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
  loadClient({clientId}: { clientId: string }) {
      this.store.dispatch(new LoadClient({clientId}));
  }

    setSelectedClient({clientId}: {clientId: string}) {
        this.store.dispatch(new SetSelectedClient({clientId}));
    }
}
