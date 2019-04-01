import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../state/reducers';
import { LoadAllClients } from '../state/clients/page/client-page.actions';
import { ToastOptions } from '@ionic/core';
import {
  CreateBackup,
  DisplayToast,
  GetAppVersionData,
  LoadApplicationSettings,
  RestoreBackup,
  SaveApplicationSetting,
} from '../state/application/application.actions';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationSettingsFormInterface } from '../settings/application-setting-form.controller';
import {
  getAplicationCurrency,
  getApplicationLanaguage,
  getAppVersion,
  isApplicationReady,
} from '../state/selectors/appliation.selectors';
import { filter } from 'rxjs/operators';
import { first } from 'rxjs/internal/operators/first';

@Injectable({
  providedIn: 'root',
})
export class ApplicationStateService {
  constructor(private store: Store<State>, private translateService: TranslateService) {}
  initializeAppData() {
    this.store.dispatch(new LoadAllClients());
    this.store.dispatch(new LoadApplicationSettings());
    this.store.dispatch(new GetAppVersionData());
  }
  showToast(toastOptions?: Partial<ToastOptions>) {
    this.translateMessage({ message: toastOptions.message }).then(() =>
      this.store.dispatch(new DisplayToast({ toastOptions })),
    );
  }
  private translateMessage({ message }) {
    return (
      this.translateService
        .get(message)
        // .pipe(map((translations) => translations))
        .toPromise()
    );
  }

  saveSettings(applicationSettings: ApplicationSettingsFormInterface) {
    this.store.dispatch(new SaveApplicationSetting({ applicationSettings }));
  }
  applicationReady() {
    return this.store.select(isApplicationReady).pipe(
      filter((ready) => ready),
      first(),
    );
  }

  getApplicationLanguage() {
    return this.store.select(getApplicationLanaguage);
  }
  getApplicationCurrency() {
    return this.store.select(getAplicationCurrency);
  }

  backupDB() {
    this.store.dispatch(new CreateBackup());
  }

  restoreDB(jsonBackup: string) {
    this.store.dispatch(new RestoreBackup({ json: jsonBackup }));
  }

  getApplicationVersion() {
    return this.store.select(getAppVersion);
  }
}
