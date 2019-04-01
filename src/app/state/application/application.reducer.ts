import { ApplicationActions, ApplicationActionTypes } from './application.actions';

export interface AppVersion {
  appName: string;
  packageName: string;
  versionCode: number | string;
  versionNumber: string;
}

export interface ApplicationState {
  applicationLanguage: string;
  currency: string;
  applicationSettingsLoaded: boolean;
  appVersion: AppVersion;
}

export const initialState: ApplicationState = {
  applicationLanguage: 'pl',
  currency: 'PLN',
  applicationSettingsLoaded: false,
  appVersion: null,
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
    case ApplicationActionTypes.SetAppVersionData: {
      return { ...state, appVersion: { ...action.payload.appVersion } };
    }
    default:
      return state;
  }
}

export const getLanguage = (state: ApplicationState) => state.applicationLanguage;
export const getCurrency = (state: ApplicationState) => state.currency;
export const getAppVersion = (state: ApplicationState) => state.appVersion;
