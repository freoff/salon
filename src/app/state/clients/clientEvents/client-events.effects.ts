import { Actions, Effect, ofType } from '@ngrx/effects';
import { ClientEventsRepository } from '../../../repository/rxdb-client-event.repository';
import {
  ClientEventActionTypes,
  DeleteClientEvent,
  FetchClientEvents,
  StartAddClientEvent,
  StartDeleteeClientEvents,
  UpdateClientEventData,
  UpsertClientEvents,
} from './client-event.actions';
import { catchError, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { DisplayToast } from '../../application/application.actions';
import { Injectable } from '@angular/core';
import { Client } from '../../../clients/models/client.interface';
import { PopoverController } from '@ionic/angular';

@Injectable()
export class ClientEventsEffects {
  constructor(
    private actions$: Actions,
    private clientEventsRepository: ClientEventsRepository,
    private popoverController: PopoverController,
  ) {}

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
          return of(new DisplayToast({ toastOptions: { message: 'clients.messages.cantLoadEvents' + err } }));
        }),
      ),
    ),
  );
  @Effect()
  addNewClientEvet$ = this.actions$.pipe(
    ofType<StartAddClientEvent>(ClientEventActionTypes.StartAddClientEvent),
    switchMap((action) =>
      this.clientEventsRepository.createClientEvent(action.payload.client as Client, action.payload.clientEvent).pipe(
        mergeMap((clientEvent) => [
          new DisplayToast({ toastOptions: { message: 'clients.messages.wasAdded', color: 'success' } }),
          // new UpsertClientEvent({ clientEvent }),
        ]),
        catchError((newClientEvent) =>
          of(new DisplayToast({ toastOptions: { message: 'clients.messages.wasAddedFail' } })),
        ),
      ),
    ),
  );
  @Effect()
  deleteClientEvet$ = this.actions$.pipe(
    ofType<StartDeleteeClientEvents>(ClientEventActionTypes.StartDeleteeClientEvents),
    switchMap((action) =>
      this.clientEventsRepository.deleteClientEvent({ clientEventId: action.payload.clientId }).pipe(
        switchMap((deleted) => [
          new DisplayToast({
            toastOptions: { message: `clients.messages.${deleted ? 'wasDeleted' : 'wasntDeleted'}` },
          }),
          deleted && new DeleteClientEvent({ id: action.payload.clientId }),
        ]),
      ),
    ),
  );
  @Effect()
  updateClientEventData$ = this.actions$.pipe(
    ofType<UpdateClientEventData>(ClientEventActionTypes.UpdateClientEventData),
    switchMap((action) =>
      this.clientEventsRepository
        .updateClientEvent(action.payload)
        .pipe(switchMap(() => [new DisplayToast({ toastOptions: { message: 'clients.messages.updateSuccess' } })])),
    ),
  );
}
