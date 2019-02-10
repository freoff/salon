import { Action } from '@ngrx/store';
import {ClientFormInterface} from '../../../clients/types/client-form.interface';
import {Client} from '../../../clients/models/client.interface';

export enum ClientPageActionTypes {
  LoadAllClients = '[AppInitializer] Load all Client ClientPages',
  CreateNewClient = '[Client Form] crate new client',
  CreateNewClientSuccess = '[Client Api] create new client success',
  CreateNewClientFail= '[Client Api] create new client success',

}

export class CreateNewClient implements Action {
  readonly type = ClientPageActionTypes.CreateNewClient;
  public constructor(public payload: {client: ClientFormInterface}) {}
}

export class CreateNewClientSuccess implements Action {
  readonly type = ClientPageActionTypes.CreateNewClientSuccess;
  public constructor(public payload: {client: Client}) {}
}

export class LoadAllClients implements Action {
  readonly type = ClientPageActionTypes.LoadAllClients;
  constructor() {}
}


export type ClientPageActions = LoadAllClients | CreateNewClient | CreateNewClientSuccess;
