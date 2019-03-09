import { ClientsCollection } from './clients.collection';
import { RxDatabase } from 'rxdb';
import { ClientEventsCollection } from './client-event.collection';

export type SalonDatabase = RxDatabase<SalonDatabaseCollections>;

export interface SalonDatabaseCollections {
  clients: ClientsCollection;
  client_events: ClientEventsCollection;
  users: any;
}
