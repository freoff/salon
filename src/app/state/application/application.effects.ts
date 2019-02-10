import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';



import {ApplicationActionTypes, GoTo} from './application.actions';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {from} from 'rxjs';

@Injectable()
export class ApplicationEffects {


  @Effect({dispatch: false})
  loadApplications$ = this.actions$.pipe(
      ofType<GoTo>(ApplicationActionTypes.GoTo),
      tap(action => from(this.router.navigate(action.payload.navigationUrl)))
  );


  constructor(private actions$: Actions, private router: Router) {}

}
