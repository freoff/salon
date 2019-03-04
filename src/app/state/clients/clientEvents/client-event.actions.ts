import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ClientEvent } from '../../../clients/models/client-event';

export enum ClientEventActionTypes {
  FetchClientEvents = '[ClientEvent] Fetch CLient',
  FetchClientEventsSuccess = '[ClientEvent] Fetch CLient Success',
  LoadClientEvents = '[ClientEvent] Load ClientEvents',
  AddClientEvent = '[ClientEvent] Add ClientEvent',
  UpsertClientEvent = '[ClientEvent] Upsert ClientEvent',
  AddClientEvents = '[ClientEvent] Add ClientEvents',
  UpsertClientEvents = '[ClientEvent] Upsert ClientEvents',
  UpdateClientEvent = '[ClientEvent] Update ClientEvent',
  UpdateClientEvents = '[ClientEvent] Update ClientEvents',
  DeleteClientEvent = '[ClientEvent] Delete ClientEvent',
  DeleteClientEvents = '[ClientEvent] Delete ClientEvents',
  ClearClientEvents = '[ClientEvent] Clear ClientEvents',
}

export class FetchClientEvents implements Action {
  readonly type = ClientEventActionTypes.FetchClientEvents;

  constructor(public payload: any) {}
}

export class LoadClientEvents implements Action {
  readonly type = ClientEventActionTypes.LoadClientEvents;

  constructor(public payload: { clientEvents: ClientEvent[] }) {}
}

export class AddClientEvent implements Action {
  readonly type = ClientEventActionTypes.AddClientEvent;

  constructor(public payload: { clientEvent: ClientEvent }) {}
}

export class UpsertClientEvent implements Action {
  readonly type = ClientEventActionTypes.UpsertClientEvent;

  constructor(public payload: { clientEvent: ClientEvent }) {}
}

export class AddClientEvents implements Action {
  readonly type = ClientEventActionTypes.AddClientEvents;

  constructor(public payload: { clientEvents: ClientEvent[] }) {}
}

export class UpsertClientEvents implements Action {
  readonly type = ClientEventActionTypes.UpsertClientEvents;

  constructor(public payload: { clientEvents: ClientEvent[] }) {}
}

export class UpdateClientEvent implements Action {
  readonly type = ClientEventActionTypes.UpdateClientEvent;

  constructor(public payload: { clientEvent: Update<ClientEvent> }) {}
}

export class UpdateClientEvents implements Action {
  readonly type = ClientEventActionTypes.UpdateClientEvents;

  constructor(public payload: { clientEvents: Update<ClientEvent>[] }) {}
}

export class DeleteClientEvent implements Action {
  readonly type = ClientEventActionTypes.DeleteClientEvent;

  constructor(public payload: { id: string }) {}
}

export class DeleteClientEvents implements Action {
  readonly type = ClientEventActionTypes.DeleteClientEvents;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearClientEvents implements Action {
  readonly type = ClientEventActionTypes.ClearClientEvents;
}

export type ClientEventActions =
  | LoadClientEvents
  | AddClientEvent
  | UpsertClientEvent
  | AddClientEvents
  | UpsertClientEvents
  | UpdateClientEvent
  | UpdateClientEvents
  | DeleteClientEvent
  | DeleteClientEvents
  | ClearClientEvents;
