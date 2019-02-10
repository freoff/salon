
import { ApplicationActions, ApplicationActionTypes } from './application.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: ApplicationActions): State {
  switch (action.type) {

    case ApplicationActionTypes.LoadApplications:
      return state;

    default:
      return state;
  }
}
