import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../state/reducers';
import { LoadClients } from '../state/clients/client/actions/client.actions';
import { LoadAllClients } from '../state/clients/page/client-page.actions';

@Injectable({
  providedIn: 'root',
})
export class ApplicationStateService {
  constructor(private store: Store<State>) {}
  initializeAppData() {
    console.log('in constructor');
    this.store.dispatch(new LoadAllClients());
  }
}
