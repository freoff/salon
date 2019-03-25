import { ApplicationActions, ApplicationActionTypes } from './application.actions';

export interface ApplicationState {
  applicationLanguage: string;
  currency: string;
  applicationSettingsLoaded: boolean;
}

export const initialState: ApplicationState = {
  applicationLanguage: 'pl',
  currency: 'PLN',
  applicationSettingsLoaded: false,
};

export function reducer(state = initialState, action: ApplicationActions): ApplicationState {
  switch (action.type) {
    case ApplicationActionTypes.LoadApplications:
      return state;
    case ApplicationActionTypes.SaveApplicationSetting:
    case ApplicationActionTypes.LoadApplicationSettingsSuccess:
      if (action.payload.applicationSettings) {
        return {
          ...state,
          applicationSettingsLoaded: true,
          applicationLanguage: action.payload.applicationSettings.applicationLanguage,
          currency: action.payload.applicationSettings.currency,
        };
      } else {
        return { ...state };
      }

    default:
      return state;
  }
}

export const getLanguage = (state: ApplicationState) => state.applicationLanguage;
export const getCurrency = (state: ApplicationState) => state.currency;
