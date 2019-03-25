import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  ApplicationActionTypes,
  DisplayToast,
  GoTo,
  LoadApplicationSettings,
  LoadApplicationSettingsSuccess,
  SaveApplicationSetting,
} from './application.actions';
import { Router } from '@angular/router';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationSettingsRepository } from '../../repository/applicationSettings.repository';

@Injectable()
export class ApplicationEffects {
  DEFAULT_TOAST_OPTIONS: Partial<ToastOptions> = {
    duration: 5000,
  };
  @Effect({ dispatch: false })
  any$ = this.actions$.pipe(tap((action) => console.log(`EFFECT - ${action.type}`)));
  @Effect({ dispatch: false })
  loadApplications$ = this.actions$.pipe(
    ofType<GoTo>(ApplicationActionTypes.GoTo),
    tap((action) => from(this.router.navigate(action.payload.navigationUrl, action.payload.navigationExtra))),
  );

  @Effect({ dispatch: false })
  toast$ = this.actions$.pipe(
    ofType<DisplayToast>(ApplicationActionTypes.DisplayToast),
    map((action) => ({ ...this.DEFAULT_TOAST_OPTIONS, ...action.payload.toastOptions })),
    switchMap((toastOptions) =>
      this.translateService
        .get(toastOptions.message)
        .pipe(map((translatedMessage) => ({ ...toastOptions, message: translatedMessage }))),
    ),
    mergeMap((toastOptions) => from(this.toastCtrl.create({ ...toastOptions }))),
    tap((toast) => toast.present()),
  );
  @Effect()
  saveSettings$ = this.actions$.pipe(
    ofType<SaveApplicationSetting>(ApplicationActionTypes.SaveApplicationSetting),
    switchMap((action) =>
      this.applicationSettingsRepository
        .save(action.payload.applicationSettings)
        .pipe(
          mergeMap((saveResult) => [
            new DisplayToast({ toastOptions: { message: 'applicationSettings.labels.settingsSaved' } }),
          ]),
        ),
    ),
  );
  @Effect()
  loadApplicationSettings$ = this.actions$.pipe(
    ofType<LoadApplicationSettings>(ApplicationActionTypes.LoadApplicationSettings),
    switchMap((action) => this.applicationSettingsRepository.loadSettings()),
    switchMap((applicationSettings) => [
      new LoadApplicationSettingsSuccess({ applicationSettings: applicationSettings }),
    ]),
  );
  constructor(
    private actions$: Actions,
    private router: Router,
    private toastCtrl: ToastController,
    private translateService: TranslateService,
    private applicationSettingsRepository: ApplicationSettingsRepository,
  ) {}
}
