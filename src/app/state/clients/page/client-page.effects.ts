import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  ClientPageActionTypes,
  CreateNewClient,
  CreateNewClientSuccess,
  EditClient,
  GoToClientDetails,
  LoadAllClients,
  LoadClient,
  SaveClientNote,
  StartDeleteClient,
  StartUpdateClient,
} from './client-page.actions';
import { catchError, exhaustMap, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ClientRepository, ClientRepositoryInterface } from '../../../repository/client-repository';
import { LoadClients, UpsertClient } from '../client/actions/client.actions';
import { DisplayToast, GoTo } from '../../application/application.actions';
import { APP_ROUTES } from '../../../app-named-route';
import { of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ClientStateService } from '../../../services/client-state.service';
import { isEmpty } from 'underscore';
import { ClientFormController } from '../../../services/client-form.controller';
import { FormState } from '../../../types/form-status.enum';
import { FormArray } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Injectable()
export class ClientPageEffects {
  @Effect()
  createClient$ = this.actions$.pipe(
    ofType<CreateNewClient>(ClientPageActionTypes.CreateNewClient),
    switchMap((action) =>
      this.clientRepository
        .saveClient({ client: { ...action.payload.client.client } })
        .pipe(mergeMap((client) => [new CreateNewClientSuccess({ client }), new UpsertClient({ client })])),
    ),
  );
  @Effect()
  updateClient$ = this.actions$.pipe(
    ofType<StartUpdateClient>(ClientPageActionTypes.StartUpdateClient),
    switchMap((action) =>
      this.clientRepository.updateClient({ client: { ...action.payload.client.client } }).pipe(
        tap(() => window.history.back()),
        mergeMap(
          (result) =>
            result && [
              new DisplayToast({ toastOptions: { message: 'clients.messages.clientUpdated' } }),
              new UpsertClient({ client: action.payload.client.client }),
            ],
        ),
      ),
    ),
  );
  @Effect()
  loadClients$ = this.actions$.pipe(
    ofType<LoadAllClients>(ClientPageActionTypes.LoadAllClients),
    withLatestFrom(this.clientStateService.getAllClients()),
    filter(([action, allClients]) => isEmpty(allClients)),
    map(([action, allClients]) => action),
    switchMap((action) =>
      this.clientRepository.getAll().pipe(
        filter((client) => !!client),
        mergeMap((clients) => [new LoadClients({ clients: clients })]),
      ),
    ),
  );
  @Effect({dispatch: false})
  goToClientDetails$ = this.actions$.pipe(
    ofType<GoToClientDetails>(ClientPageActionTypes.GoToClientDetails),
    tap((action) => this.navCtrl.navigateForward(APP_ROUTES.clients.details(action.payload.client.id), {})),
    // mergeMap((action) => [new GoTo({ navigationUrl: APP_ROUTES.clients.details(action.payload.client.id) })]),

  );

  @Effect()
  saveClientNote$ = this.actions$.pipe(
    ofType<SaveClientNote>(ClientPageActionTypes.SaveClientNote),
    switchMap((action) =>
      this.clientRepository.saveClientNote({ client: action.paylaod.client, note: action.paylaod.note }),
    ),
    switchMap((result) => [new DisplayToast({ toastOptions: { message: 'clients.messages.messageUpdated' } })]),
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
    tap(() => this.clientFormController.reset()),
    map((action) => new GoToClientDetails({ client: action.payload.client })),
  );
  constructor(
    @Inject(ClientRepository) private clientRepository: ClientRepositoryInterface,
    private actions$: Actions,
    private clientStateService: ClientStateService,
    private clientFormController: ClientFormController,
    private navCtrl: NavController
  ) {}
  @Effect()
  editClient$ = this.actions$.pipe(
    ofType<EditClient>(ClientPageActionTypes.EditClient),
    tap((action) => {
      this.clientFormController.form.patchValue({ client: action.paylaod.client, state: FormState.update });
      this.clientFormController.addPhonesToForm(action.paylaod.client.phones);
    }),
    mergeMap((action) => [new GoTo({ navigationUrl: APP_ROUTES.clients.edit(action.paylaod.client.id) })]),
  );
  @Effect()
  deleteClient$ = this.actions$.pipe(
    ofType<StartDeleteClient>(ClientPageActionTypes.StartDeleteClient),
    exhaustMap((action) =>
      this.clientRepository.deleteClient(action.payload.client.id).pipe(
        tap((result) => console.log(`delted, return ${result}`)),
        mergeMap((result) => [
          new DisplayToast({ toastOptions: { message: 'clients.messages.clientWasDeleted' } }),
          new GoTo({ navigationUrl: APP_ROUTES.clients.list }),
        ]),
      ),
    ),
  );
}
