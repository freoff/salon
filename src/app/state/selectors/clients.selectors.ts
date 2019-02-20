import { getClients, getClientsPageState } from '../reducers';
import * as fromClients from '../clients/client/reducers/client.reducer';
import { createSelector } from '@ngrx/store';
import { selectedClientId } from '../clients/page/client-page.reducer';



export const getAllClientsMap = createSelector(
  getClients,
  fromClients.clientsEntitisAsMap,
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
export const getClientById = (clientId: string) => createSelector(getAllClients, clients => clients[clientId]);
