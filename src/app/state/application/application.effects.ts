import { State } from '../reducers';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DirectoryEntry, File, FileEntry } from '@ionic-native/file/ngx';
import {
  ApplicationActionTypes,
  CreateBackup,
  DisplayToast,
  GetAppVersionData,
  GoTo,
  LoadApplicationSettings,
  LoadApplicationSettingsSuccess,
  RestoreBackup,
  SaveApplicationSetting,
  SetAppVersionData,
} from './application.actions';
import { Router } from '@angular/router';
import { catchError, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationSettingsRepository } from '../../repository/applicationSettings.repository';
import { RxdbService } from '../../services/rxdb.service';
import { Store } from '@ngrx/store';

declare type cordova = any;

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
  @Effect({ dispatch: true })
  getAppVersion$ = this.actions$.pipe(
    ofType<GetAppVersionData>(ApplicationActionTypes.GetAppVersionData),
    switchMap((action) =>
      from(
        Promise.all([
          this.appVersion.getAppName(),
          this.appVersion.getPackageName(),
          this.appVersion.getVersionCode(),
          this.appVersion.getVersionNumber(),
        ]),
      ),
    ),
    map(([appName, packageName, versionCode, versionNumber]) => ({
      appName,
      packageName,
      versionCode,
      versionNumber,
    })),
    map((appVersion) => new SetAppVersionData({ appVersion })),
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
      this.loadingController.create().then((loader) => loader.present());
      this.rxdb
        .getDb()
        .then((db) => db.dump())
        .then((data) => {
          this.platform.is('android') ? this.saveDBData(data) : this.saveJson(data);
        })
        .catch(() => this.dismissTopLoader());
    }),
  );
  dismissTopLoader = () => this.loadingController.getTop().then((top) => top.dismiss());
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
  // TODO separete backup file IO to separate service
  saveDBData = (data) => {
    document.addEventListener('deviceready', () => {
      window['resolveLocalFileSystemURL'](cordova['file'].externalRootDirectory, (directory: DirectoryEntry) => {
        directory.getFile('db.json', { create: true, exclusive: false }, (fileEntry: FileEntry) => {
          console.log('get file success', Object.keys(fileEntry));
          this.writeFile(fileEntry, data);
        });
      });
    });
  };
  writeFile = (fileEntry, dataObj, successResolve?) => {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter((fileWriter) => {
      fileWriter.onwriteend = (event) => {
        console.log('Successful file write...');
        // TODO return as observable to effect and dispatch acion from there
        this.store.dispatch(
          new DisplayToast({ toastOptions: { message: 'messages.backupSuccess', color: 'primary' } }),
        );
        this.loadingController.getTop().then((top) => top.dismiss());
      };

      fileWriter.onerror = (e) => {
        console.log('Failed file write: ' + e.toString());
        this.store.dispatch(new DisplayToast({ toastOptions: { message: 'messages.backupFial', color: 'danger' } }));
        this.loadingController.getTop().then((top) => top.dismiss());
      };
      if (!dataObj) {
        dataObj = new Blob(['some file data'], { type: 'text/plain' });
      }

      fileWriter.write(dataObj);
    });
  };

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
    private platform: Platform,
    private file: File,
    private actions$: Actions,
    private router: Router,
    private store: Store<State>,
    private toastCtrl: ToastController,
    private translateService: TranslateService,
    private loadingController: LoadingController,
    private applicationSettingsRepository: ApplicationSettingsRepository,
    private rxdb: RxdbService,
    private appVersion: AppVersion,
  ) {}
}
