import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ApplicationActionTypes, DisplayToast, GoTo } from './application.actions';
import { Router } from '@angular/router';
import { map, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Injectable()
export class ApplicationEffects {
  DEFAULT_TOAST_OPTIONS: Partial<ToastOptions> = {
    duration: 3000,
  };

  @Effect({ dispatch: false })
  loadApplications$ = this.actions$.pipe(
    ofType<GoTo>(ApplicationActionTypes.GoTo),
    tap((action) => from(this.router.navigate(action.payload.navigationUrl, {}))),
  );

  @Effect({ dispatch: false })
  toast$ = this.actions$.pipe(
    ofType<DisplayToast>(ApplicationActionTypes.DisplayToast),
    map((action) => ({ ...this.DEFAULT_TOAST_OPTIONS, ...action.payload.toastOptions })),
    mergeMap((toastOptions) => from(this.toastCtrl.create({ ...toastOptions }))),
    tap((toast) => toast.present()),
  );

  constructor(private actions$: Actions, private router: Router, private toastCtrl: ToastController) {}
}
