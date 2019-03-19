import { ApplicationActions, ApplicationActionTypes } from './application.actions';

export interface ApplicationState {
  language: string;
  currency: string;

}

export const initialState: ApplicationState = {
  language: 'pl',
  currency: 'PLN',
};

export function reducer(state = initialState, action: ApplicationActions): ApplicationState {
  switch (action.type) {
    case ApplicationActionTypes.LoadApplications:
      return state;

    default:
      return state;
  }
}

export const getLanguage = (state: ApplicationState) => state.language;
export const getCurrency= (state: ApplicationState) => state.currency;

