import { Injectable } from '@angular/core';
import { ClientsModule } from '../clients.module';
import { State } from '../../state/reducers';
import { Store } from '@ngrx/store';
import { ClientFormInterface } from '../types/client-form.interface';
import { CreateNewClient } from '../../state/clients/page/client-page.actions';
import clientsSelectors from '../../state/selectors/clients.selectors';
import { Observable } from 'rxjs';
import { Client } from '../models/client.interface';

@Injectable({ providedIn: ClientsModule })
export class ClientStateService {
  constructor(private store: Store<State>) {}

  createClient({ client }: { client: ClientFormInterface }): void {
    this.store.dispatch(new CreateNewClient({ client }));
  }
  getAllClients(): Observable<Array<Client>> {
    return this.store.select(clientsSelectors.getAllClients);
  }
}
