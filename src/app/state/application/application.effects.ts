import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { File,  } from '@ionic-native/file/ngx';
import {
  ApplicationActionTypes,
  CreateBackup,
  DisplayToast,
  GoTo,
  LoadApplicationSettings,
  LoadApplicationSettingsSuccess,
  RestoreBackup,
  SaveApplicationSetting,
} from './application.actions';
import { Router } from '@angular/router';
import { catchError, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationSettingsRepository } from '../../repository/applicationSettings.repository';
import { RxdbService } from '../../services/rxdb.service';

declare var LocalFileSystem: any;

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
  @Effect({ dispatch: false })
  createBackup$ = this.actions$.pipe(
    ofType<CreateBackup>(ApplicationActionTypes.CreateBackup),
    tap(() => {
      this.rxdb
        .getDb()
        .then((db) => db.dump())
        .then((data) => {
          this.saveDBData(data);
        });
    }),
  );
  // @Effect({ dispatch: false })
  // createBackup$ = this.actions$.pipe(
  //   ofType<CreateBackup>(ApplicationActionTypes.CreateBackup),
  //   tap(() => {
  //     this.rxdb
  //       .getDb()
  //       .then((db) => db.dump())
  //       .then((data) => {
  //         console.log(data);
  //         this.saveJson(data);
  //       });
  //   }),
  // );
  private loading: any;
  @Effect()
  restoreBackup$ = this.actions$.pipe(
    ofType<RestoreBackup>(ApplicationActionTypes.RestoreBackup),
    filter((action) => !!action.payload.json),
    switchMap((action) =>
      from(this.rxdb.getDb().then((db) => db.importDump(JSON.parse(action.payload.json)))).pipe(
        map((success) => new DisplayToast({ toastOptions: { message: 'messages.restoreDBSuccess' } })),
        catchError((error) =>
          of(new DisplayToast({ toastOptions: { message: 'messages.restoreDBFail', color: 'danger' } })),
        ),
      ),
    ),
  );

  async saveDBData(data) {
    console.log('create device ready');
    document.addEventListener('deviceready', () => {
      console.log('ready');
      window['requestFileSystem'](LocalFileSystem.PERSISTENT, 0, function(fs) {
        console.log('file system open: ' + fs.name);
        fs.root.getFile('newPersistentFile.txt', { create: true, exclusive: false }, function(fileEntry) {
          console.log('fileEntry is file?' + fileEntry.isFile.toString());
          // fileEntry.name == 'someFile.txt'
          // fileEntry.fullPath == '/someFile.txt'
        });
      });
    });
  }

  saveJson(obj) {
    const str = JSON.stringify(obj);
    const data = this.encode(str);

    const blob = new Blob([data], {
      type: 'application/octet-stream',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', new Date().toLocaleDateString() + 'backup.json');
    link.click();
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(event);
  }
  encode(s) {
    const out = [];
    for (let i = 0; i < s.length; i++) {
      out[i] = s.charCodeAt(i);
    }
    return new Uint8Array(out);
  }
  constructor(
    private file: File,
    private actions$: Actions,
    private router: Router,
    private toastCtrl: ToastController,
    private translateService: TranslateService,
    private loadingController: LoadingController,
    private applicationSettingsRepository: ApplicationSettingsRepository,
    private rxdb: RxdbService,
  ) {}
}
