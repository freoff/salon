import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CallToNumber, PhonesActionsTypes } from './phone.actions';
import { tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { ApplicationStateService } from '../../services/application-state.service';

@Injectable()
export class PhoneEffets {
  constructor(
    private actions$: Actions,
    private callNumber: CallNumber,
    private applicationStateService: ApplicationStateService,
  ) {}

  @Effect({ dispatch: false })
  callNumber$ = this.actions$.pipe(
    ofType<CallToNumber>(PhonesActionsTypes.CallToNumber),
    tap((action) => {
      this.callNumber
        .isCallSupported()
        .catch(() => this.callNumber.callNumber(action.payload.number, true))
        .catch((e) => {
          console.log(e, this);
          this.applicationStateService.showToast({ message: `${e} \n You can not dial from this device right now!` });

        }
        );
    }),
  );
}
