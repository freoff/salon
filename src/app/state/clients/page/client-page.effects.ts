import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  ClientPageActionTypes,
  CreateNewClient,
  CreateNewClientSuccess,
  GoToClientDetails,
  LoadAllClients,
  LoadClient,
} from './client-page.actions';
import { catchError, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ClientRepository, ClientRepositoryInterface } from '../../../repository/client-repository';
import { LoadClients, UpsertClient } from '../client/actions/client.actions';
import { GoTo } from '../../application/application.actions';
import { APP_ROUTES } from '../../../app-named-route';
import { of } from 'rxjs';
import {Client} from '../../../clients/models/client.interface';

@Injectable()
export class ClientPageEffects {
  @Effect()
  createClient$ = this.actions$.pipe(
    tap((action) => console.log('_____EFFECT', action.type)),
    ofType<CreateNewClient>(ClientPageActionTypes.CreateNewClient),
    tap((action) => console.log('creat client ', action.payload.client)),
    switchMap((action) =>
      this.clientRepository
        .saveClient({ client: { ...action.payload.client.client } })
        .pipe(mergeMap((client) => [new CreateNewClientSuccess({ client }), new UpsertClient({ client })])),
    ),
  );
  @Effect()
  loadClients$ = this.actions$.pipe(
    ofType<LoadAllClients>(ClientPageActionTypes.LoadAllClients),
    switchMap((action) =>
      this.clientRepository.getAll().pipe(
        filter((client) => !!client),
        tap((clients) => console.log('all clients', clients)),
        mergeMap((clients) => [new LoadClients({ clients: clients as Client[] })]),
      ),
    ),
  );
  @Effect()
  goToClientDetails$ = this.actions$.pipe(
    ofType<GoToClientDetails>(ClientPageActionTypes.GoToClientDetails),
    mergeMap((action) => [new GoTo({ navigationUrl: APP_ROUTES.clients.details(action.payload.client.id) })]),
  );

  @Effect()
  loadClient$ = this.actions$.pipe(
    ofType<LoadClient>(ClientPageActionTypes.LoadClient),
    switchMap((action) =>
      this.clientRepository.getClient({ clientId: action.payload.clientId }).pipe(
        mergeMap((client) => [new UpsertClient({ client })]),
        catchError((error) => of(new GoTo({ navigationUrl: APP_ROUTES.errors.clientNotFound }))),
      ),
    ),
  );
  @Effect()
  createClientSuccess$ = this.actions$.pipe(
    ofType<CreateNewClientSuccess>(ClientPageActionTypes.CreateNewClientSuccess),
    map((action) => new GoToClientDetails({ client: action.payload.client })),
  );
  constructor(private actions$: Actions, @Inject(ClientRepository) private clientRepository: ClientRepositoryInterface) {}
}
