import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ClientPageActionTypes, CreateNewClient, CreateNewClientSuccess, LoadAllClients } from './client-page.actions';
import {filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import { ClientRepository } from '../../../repository/client-repository';
import { LoadClients, UpsertClient } from '../client/actions/client.actions';

@Injectable()
export class ClientPageEffects {
  @Effect()
  createClient$ = this.actions$.pipe(
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
        filter(client => !!client),
        tap((clients) => console.log('all clients', clients)),
        mergeMap((clients) => [new LoadClients({ clients: clients })]),
      ),
    ),
  );
  constructor(private actions$: Actions, private clientRepository: ClientRepository) {}
}
