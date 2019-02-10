import { Action } from '@ngrx/store';

export enum ApplicationActionTypes {
  LoadApplications = '[Application] Load Applications',
  GoTo = '[Application] Go to'
  
}

export class LoadApplications implements Action {
  readonly type = ApplicationActionTypes.LoadApplications;
}

export class GoTo implements Action   {
  readonly type = ApplicationActionTypes.GoTo;
  public constructor(public payload: {navigationUrl: any}){
  }
}

export type ApplicationActions = LoadApplications;
