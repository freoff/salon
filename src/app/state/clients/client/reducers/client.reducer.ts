import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ClientActions, ClientActionTypes } from '../actions/client.actions';
import { Client } from '../../../../clients/models/client.interface';

export interface State extends EntityState<Client> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Client> = createEntityAdapter<Client>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(state = initialState, action: ClientActions): State {
  switch (action.type) {
    case ClientActionTypes.AddClient: {
      return adapter.addOne(action.payload.client, state);
    }

    case ClientActionTypes.UpsertClient: {
      return adapter.upsertOne(action.payload.client, state);
    }

    case ClientActionTypes.AddClients: {
      return adapter.addMany(action.payload.clients, state);
    }

    case ClientActionTypes.UpsertClients: {
      return adapter.upsertMany(action.payload.clients, state);
    }

    case ClientActionTypes.UpdateClient: {
      return adapter.updateOne(action.payload.client, state);
    }

    case ClientActionTypes.UpdateClients: {
      return adapter.updateMany(action.payload.clients, state);
    }

    case ClientActionTypes.DeleteClient: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ClientActionTypes.DeleteClients: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ClientActionTypes.LoadClients: {
      return adapter.addAll(action.payload.clients, state);
    }

    case ClientActionTypes.ClearClients: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds: clientsIds,
  selectEntities: clientsEntitisAsMap,
  selectAll: clients,
  selectTotal: totalClients,
} = adapter.getSelectors();
