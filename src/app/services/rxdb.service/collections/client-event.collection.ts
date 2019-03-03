import { RxCollection, RxDocument } from 'rxdb';
import { ClientEvent } from '../../../clients/models/client-event';

export type ClientEventDocument = RxDocument<ClientEvent>;

export type ClientEventsCollection = RxCollection<ClientEvent>;
