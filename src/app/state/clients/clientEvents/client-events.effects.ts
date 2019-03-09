import { Actions, Effect, ofType } from '@ngrx/effects';
import { ClientEventsRepository } from '../../../repository/rxdb-client-event.repository';
import { ClientEventActionTypes, FetchClientEvents, UpsertClientEvents } from './client-event.actions';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { DisplayToast } from '../../application/application.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class ClientEventsEffects {
  constructor(private actions$: Actions, private clientEventsRepository: ClientEventsRepository) {}

  unsubscribe = new Subject();

  @Effect()
  clientEventsFetch$ = this.actions$.pipe(
    ofType<FetchClientEvents>(ClientEventActionTypes.FetchClientEvents),
    map((action) => action.payload.clientId),
    switchMap((clientId) =>
      this.clientEventsRepository.getEventForClient(clientId as string).pipe(
        takeUntil(this.unsubscribe),
        map((clientEvents) => new UpsertClientEvents({ clientEvents })),
        catchError((err) => {
          console.error('clientEventsFetch$', err);
          return of(new DisplayToast({ toastOptions: { message: 'clients.error.cantLoadEvents' + err } }));
        }),
      ),
    ),
  );
}
