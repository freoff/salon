import {ClientPageActions, ClientPageActionTypes} from './client-page.actions';

export interface ClientPageState {
  creatingClient: boolean;
  selectedClientId: string;
}

export const initialState: ClientPageState = {
  creatingClient: false,
  selectedClientId: null,
};

export function reducer(state = initialState, action: ClientPageActions): ClientPageState {
  switch (action.type) {
    case ClientPageActionTypes.CreateNewClient:
      return { ...state, creatingClient: true };
    case ClientPageActionTypes.CreateNewClientSuccess:
      return { ...state, creatingClient: false };
    case ClientPageActionTypes.GoToClientDetails:
      return {...state, selectedClientId: action.payload.client.id}
    default:
      return state;
  }
}

export const selectedClientId = (state: ClientPageState) => state.selectedClientId;
export const creatingClient = (state: ClientPageState) => state.creatingClient;
