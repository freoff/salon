import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ClientEventActions, ClientEventActionTypes } from './client-event.actions';
import { ClientEvent } from '../../../clients/models/client-event';

export interface State extends EntityState<ClientEvent> {
  fetchingClienEvents: boolean;
  // additional entities state properties
}

export const adapter: EntityAdapter<ClientEvent> = createEntityAdapter<ClientEvent>({
  selectId: (clientEvent) => clientEvent._id,
  sortComparer: (c1, c2) => c2.eventDate - c1.eventDate,
});

export const initialState: State = adapter.getInitialState({
  fetchingClienEvents: false,
});

export function reducer(state = initialState, action: ClientEventActions): State {
  switch (action.type) {
    case ClientEventActionTypes.AddClientEvent: {
      return adapter.addOne(action.payload.clientEvent, state);
    }

    case ClientEventActionTypes.UpsertClientEvent: {
      return adapter.upsertOne(action.payload.clientEvent, state);
    }

    case ClientEventActionTypes.AddClientEvents: {
      return adapter.addMany(action.payload.clientEvents, state);
    }

    case ClientEventActionTypes.UpsertClientEvents: {
      return adapter.upsertMany(action.payload.clientEvents, state);
    }

    case ClientEventActionTypes.UpdateClientEvent: {
      return adapter.updateOne(action.payload.clientEvent, state);
    }

    case ClientEventActionTypes.UpdateClientEvents: {
      return adapter.updateMany(action.payload.clientEvents, state);
    }

    case ClientEventActionTypes.DeleteClientEvent: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ClientEventActionTypes.DeleteClientEvents: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ClientEventActionTypes.LoadClientEvents: {
      return adapter.addAll(action.payload.clientEvents, state);
    }

    case ClientEventActionTypes.ClearClientEvents: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const { selectIds, selectEntities, selectAll: allClientEvents, selectTotal } = adapter.getSelectors();
