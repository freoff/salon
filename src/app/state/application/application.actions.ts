import { Action } from '@ngrx/store';
import { ToastOptions } from '@ionic/core';
import { NavigationExtras } from '@angular/router';

export enum ApplicationActionTypes {
  LoadApplications = '[Application] Load Applications',
  GoTo = '[Application] Go to',
  DisplayToast = '[Application] Display Toast',
  SaveApplicationSetting = '[Settings page] save settings change',
}

export class SaveApplicationSetting {
  readonly type = ApplicationActionTypes.SaveApplicationSetting;
}


export class DisplayToast implements Action {
  readonly type = ApplicationActionTypes.DisplayToast;
  public constructor(public payload?: { toastOptions: Partial<ToastOptions> }) {}
}

export class LoadApplications implements Action {
  readonly type = ApplicationActionTypes.LoadApplications;
}

export class GoTo implements Action {
  readonly type = ApplicationActionTypes.GoTo;
  public constructor(public payload: { navigationUrl: any; navigationExtra?: NavigationExtras }) {}
}

export type ApplicationActions = LoadApplications;
