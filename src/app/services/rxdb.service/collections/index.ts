import { ClientsCollection } from './clients.collection';
import { RxDatabase } from 'rxdb';
import { ClientEventsCollection } from './client-event.collection';
import {ApplicationSettingsCollection} from './applicationSettings.collection';

export type SalonDatabase = RxDatabase<SalonDatabaseCollections>;

export interface SalonDatabaseCollections {
  clients: ClientsCollection;
  client_events: ClientEventsCollection;
  application_settings: ApplicationSettingsCollection;
  users: any;
}
