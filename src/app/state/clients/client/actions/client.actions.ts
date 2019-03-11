import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Client } from '../../../../clients/models/client.interface';

export enum ClientActionTypes {
  LoadClients = '[Client] Load Clients',
  AddClient = '[Client] Add Client',
  UpsertClient = '[Client] Upsert Client',
  AddClients = '[Client] Add Clients',
  UpsertClients = '[Client] Upsert Clients',
  UpdateClient = '[Client] Update Client',
  UpdateClients = '[Client] Update Clients',
  DeleteClient = '[Client] Delete Client',
  DeleteClients = '[Client] Delete Clients',
  ClearClients = '[Client] Clear Clients',
}

export class LoadClients implements Action {
  readonly type = ClientActionTypes.LoadClients;

  constructor(public payload: { clients: Client[] }) {}
}

export class AddClient implements Action {
  readonly type = ClientActionTypes.AddClient;

  constructor(public payload: { client: Client }) {}
}

export class UpsertClient implements Action {
  readonly type = ClientActionTypes.UpsertClient;

  constructor(public payload: { client: Client }) {}
}

export class AddClients implements Action {
  readonly type = ClientActionTypes.AddClients;

  constructor(public payload: { clients: Client[] }) {}
}

export class UpsertClients implements Action {
  readonly type = ClientActionTypes.UpsertClients;

  constructor(public payload: { clients: Client[] }) {}
}

export class UpdateClient implements Action {
  readonly type = ClientActionTypes.UpdateClient;

  constructor(public payload: { client: Update<Client> }) {}
}

export class UpdateClients implements Action {
  readonly type = ClientActionTypes.UpdateClients;

  constructor(public payload: { clients: Update<Client>[] }) {}
}

export class DeleteClient implements Action {
  readonly type = ClientActionTypes.DeleteClient;

  constructor(public payload: { id: string }) {}
}

export class DeleteClients implements Action {
  readonly type = ClientActionTypes.DeleteClients;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearClients implements Action {
  readonly type = ClientActionTypes.ClearClients;
}

export type ClientActions =
  | LoadClients
  | AddClient
  | UpsertClient
  | AddClients
  | UpsertClients
  | UpdateClient
  | UpdateClients
  | DeleteClient
  | DeleteClients
  | ClearClients;
