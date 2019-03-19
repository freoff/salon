import * as fromRoot from '../reducers';
import * as fromApplication from '../application/application.reducer';
import {createSelector} from '@ngrx/store';
import {getApplicationState} from '../reducers';


export const getApplicationLanaguage = createSelector(getApplicationState, fromApplication.getLanguage);
export const getAplicationCurrency = createSelector(getApplicationState, fromApplication.getCurrency);
