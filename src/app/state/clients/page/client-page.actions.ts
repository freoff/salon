import { Action } from '@ngrx/store';
import { ClientFormInterface } from '../../../clients/types/client-form.interface';
import { Client } from '../../../clients/models/client.interface';

export enum ClientPageActionTypes {
  LoadAllClients = '[AppInitializer] Load all Client ClientPages',
  CreateNewClient = '[Client Form] crate new client',
  CreateNewClientSuccess = '[Client Api] create new client success',
  CreateNewClientFail = '[Client Api] create new client success',
  GoToClientDetails = '[Client list] Go to client details',
  LoadClient = '[Client details Resolver] Load client with id',
  SetSelectedClient = '[Client details Resolver] Set selected client',
  SaveClientNote = '[Client] Save Client Note',
  EditClient = '[Client] Edit client',
  StartUpdateClient = '[Client] Update client data',
  StartDeleteClient = '[Client] Delete client data',
}

export class EditClient implements Action {
  readonly type = ClientPageActionTypes.EditClient;
  constructor(public paylaod: { client: Client }) {}
}

export class SaveClientNote implements Action {
  readonly type = ClientPageActionTypes.SaveClientNote;
  constructor(public paylaod: { note: string; client: Client }) {}
}

export class SetSelectedClient implements Action {
  readonly type = ClientPageActionTypes.SetSelectedClient;
  public constructor(public payload: { clientId: string }) {}
}
export class LoadClient implements Action {
  readonly type = ClientPageActionTypes.LoadClient;
  public constructor(public payload: { clientId: string }) {}
}
export class GoToClientDetails implements Action {
  readonly type = ClientPageActionTypes.GoToClientDetails;
  public constructor(public payload: { client: Client }) {}
}

export class CreateNewClient implements Action {
  readonly type = ClientPageActionTypes.CreateNewClient;
  public constructor(public payload: { client: ClientFormInterface }) {}
}
export class StartUpdateClient implements Action {
  readonly type = ClientPageActionTypes.StartUpdateClient;
  public constructor(public payload: { client: ClientFormInterface }) {}
}
export class StartDeleteClient implements Action {
  readonly type = ClientPageActionTypes.StartDeleteClient;
  public constructor(public payload: { client: Client }) {}
}

export class CreateNewClientSuccess implements Action {
  readonly type = ClientPageActionTypes.CreateNewClientSuccess;
  public constructor(public payload: { client: Client }) {}
}

export class LoadAllClients implements Action {
  readonly type = ClientPageActionTypes.LoadAllClients;
  constructor() {}
}

export type ClientPageActions =
  | LoadAllClients
  | CreateNewClient
  | CreateNewClientSuccess
  | GoToClientDetails
  | LoadClient
  | EditClient
  | SaveClientNote
  | StartUpdateClient
  | StartDeleteClient
  | SetSelectedClient;
