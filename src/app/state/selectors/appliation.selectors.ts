import * as fromRoot from '../reducers';
import { getApplicationState } from '../reducers';
import * as fromApplication from '../application/application.reducer';
import { createSelector } from '@ngrx/store';
import * as fromClients from './clients.selectors';

export const getAppVersion = createSelector(
  getApplicationState,
  fromApplication.getAppVersion,
);

export const getApplicationLanaguage = createSelector(
  getApplicationState,
  fromApplication.getLanguage,
);
export const getAplicationCurrency = createSelector(
  getApplicationState,
  fromApplication.getCurrency,
);
export const getSettingsAreLoaded = createSelector(
  fromRoot.getApplicationState,
  (state) => state.applicationSettingsLoaded,
);

export const isApplicationReady = createSelector(
  getSettingsAreLoaded,
  fromClients.getClientsAreLoaded,
  (settingsLoaded, clientLoaded) => settingsLoaded && clientLoaded,
);
