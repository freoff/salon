import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromClient from '../clients/client/reducers/client.reducer';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import * as fromApplication from '../application/application.reducer';
import * as fromAuthorization from '../authorization/authorization.reducer';
import * as fromClientPage from '../clients/page/client-page.reducer';
import * as fromClientEvents from '../clients/clientEvents/client-event.reducer';

export interface State {

  client: fromClient.State;
  router: RouterReducerState;
  application: fromApplication.State;
  authorization: fromAuthorization.AuthorizationState;
  clientPage: fromClientPage.ClientPageState;
  clientEvents: fromClientEvents.State;
}

export const reducers: ActionReducerMap<State> = {
  client: fromClient.reducer,
  router: routerReducer,
  application: fromApplication.reducer,
  authorization: fromAuthorization.reducer,
  clientPage: fromClientPage.reducer,
  clientEvents: fromClientEvents.reducer,
};

export const getClients = (state: State) => state.client;
export const getClientsPageState = (state: State) => state.clientPage;

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
