import { getClientEvents as clientEventsState, getClients, getClientsPageState } from '../reducers';
import * as fromClients from '../clients/client/reducers/client.reducer';
import * as fromClientEvents from '../clients/clientEvents/client-event.reducer';
import { createSelector } from '@ngrx/store';
import { selectedClientId } from '../clients/page/client-page.reducer';

export const getAllClientsMap = createSelector(
  getClients,
  fromClients.clientsEntitisAsMap,
);
export const getTotalClients = createSelector(
  getClients,
  fromClients.totalClients,
);
export const getAllEvents = createSelector(
  clientEventsState,
  fromClientEvents.allClientEvents,
);

export const getAllClients = createSelector(
  getClients,
  fromClients.clients,
);
export const getClientsIds = createSelector(
  getClients,
  fromClients.clientsIds,
);
export const getTotalClientsCoutn = createSelector(
  getClients,
  fromClients.totalClients,
);
export const getSelectedClientId = createSelector(
  getClientsPageState,
  selectedClientId,
);
export const getSelectedClient = createSelector(
  getAllClientsMap,
  getSelectedClientId,
  (clients, id) => clients[id],
);
export const getClientById = (clientId: string) =>
  createSelector(
    getAllClientsMap,
    (clients) => clients[clientId],
  );

export const getClientEvents = createSelector(
  getSelectedClientId,
  getAllEvents,
  (clientId, events) => events.filter((event) => event.client === clientId),
);
export const getClientsAreLoaded = createSelector(
  getClients,
  (state) => state.clientsLoaded,
);
