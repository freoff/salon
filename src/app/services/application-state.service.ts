import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../state/reducers';
import { LoadClients } from '../state/clients/client/actions/client.actions';
import { LoadAllClients } from '../state/clients/page/client-page.actions';
import { ToastOptions } from '@ionic/core';
import { DisplayToast } from '../state/application/application.actions';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApplicationStateService {
  constructor(private store: Store<State>, private translateService: TranslateService) {}
  initializeAppData() {
    console.log('in constructor');
    this.store.dispatch(new LoadAllClients());
  }
  showToast(toastOptions?: Partial<ToastOptions>) {
    this.translateMessage({ message: toastOptions.message }).then(() =>
      this.store.dispatch(new DisplayToast({ toastOptions })),
    );
  }
  private translateMessage({ message }) {
    return this.translateService
      .get(message)
      // .pipe(map((translations) => translations))
      .toPromise();
  }
}
