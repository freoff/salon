import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';



import { AuthorizationActionTypes } from './authorization.actions';

@Injectable()
export class AuthorizationEffects {


  @Effect()
  loadAuthorizations$ = this.actions$.pipe(ofType(AuthorizationActionTypes.LoadAuthorizations));


  constructor(private actions$: Actions) {}

}
