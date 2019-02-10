import { getClients, getClientsPageState } from '../reducers';
import * as fromClients from '../clients/client/reducers/client.reducer';
import { createSelector } from '@ngrx/store';

const clientsSelectors = {
  getAllClientsMap: createSelector(
    getClients,
    fromClients.clientsEntitisAsMap,
  ),
  getAllClients: createSelector(
    getClients,
    fromClients.clients,
  ),
  getClientsIds: createSelector(
    getClients,
    fromClients.clientsIds,
  ),
  getTotalClientsCoutn: createSelector(
    getClients,
    fromClients.totalClients,
  ),
};

export default clientsSelectors;
