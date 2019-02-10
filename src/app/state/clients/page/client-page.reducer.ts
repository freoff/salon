import { ClientPageActions, ClientPageActionTypes } from './client-page.actions';

export interface State {
  creatingClient: boolean;
}

export const initialState: State = {
  creatingClient: false,
};

export function reducer(state = initialState, action: ClientPageActions): State {
  switch (action.type) {
    case ClientPageActionTypes.CreateNewClient:
      return { ...state, creatingClient: true };
    case ClientPageActionTypes.CreateNewClientSuccess:
      return { ...state, creatingClient: false };
    default:
      return state;
  }
}
