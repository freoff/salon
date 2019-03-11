import { AuthorizationActions, AuthorizationActionTypes } from './authorization.actions';

export interface AuthorizationState {
  isAuthorized: boolean;
  currentUser: any;
}

export const initialState: AuthorizationState = {
  isAuthorized: true,
  currentUser: { name: 'freo', role: 'admin' },
};

export function reducer(state = initialState, action: AuthorizationActions): AuthorizationState {
  switch (action.type) {
    case AuthorizationActionTypes.LoadAuthorizations:
      return state;

    default:
      return state;
  }
}
