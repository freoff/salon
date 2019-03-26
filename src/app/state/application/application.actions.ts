import { Action } from '@ngrx/store';
import { ToastOptions } from '@ionic/core';
import { NavigationExtras } from '@angular/router';
import { ApplicationSetting } from '../../services/rxdb.service/collections/applicationSettings.collection';

export enum ApplicationActionTypes {
  LoadApplications = '[Application] Load Applications',
  GoTo = '[Application] Go to',
  DisplayToast = '[Application] Display Toast',
  SaveApplicationSetting = '[Settings page] Save application settings',
  LoadApplicationSettings = '[Initialize app] Load application settings',
  LoadApplicationSettingsSuccess = '[Request response] load settings change',
  CreateBackup = '[Application settings] Create backup',
  RestoreBackup = '[Application settings] Restore backup',
}

export class CreateBackup {
  readonly type = ApplicationActionTypes.CreateBackup;
  public constructor() {}
}
export class RestoreBackup {
  readonly type = ApplicationActionTypes.RestoreBackup;
  public constructor(public payload: { json: string }) {}
}

export class LoadApplicationSettings {
  readonly type = ApplicationActionTypes.LoadApplicationSettings;
  public constructor() {}
}
export class LoadApplicationSettingsSuccess {
  readonly type = ApplicationActionTypes.LoadApplicationSettingsSuccess;
  public constructor(public payload: { applicationSettings: ApplicationSetting }) {}
}
export class SaveApplicationSetting {
  readonly type = ApplicationActionTypes.SaveApplicationSetting;
  public constructor(public payload: { applicationSettings: ApplicationSetting }) {}
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

export type ApplicationActions =
  | LoadApplications
  | GoTo
  | LoadApplicationSettings
  | LoadApplicationSettingsSuccess
  | SaveApplicationSetting
  | DisplayToast;
