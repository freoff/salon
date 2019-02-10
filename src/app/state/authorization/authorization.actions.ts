import { Action } from '@ngrx/store';

export enum AuthorizationActionTypes {
  LoadAuthorizations = '[Authorization] Load Authorizations',
  
  
}

export class LoadAuthorizations implements Action {
  readonly type = AuthorizationActionTypes.LoadAuthorizations;
}


export type AuthorizationActions = LoadAuthorizations;
