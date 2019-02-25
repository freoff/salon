import {ClientsCollection} from './clients.collection';
import {RxDatabase} from 'rxdb';

export type SalonDatabase = RxDatabase<SalonDatabaseCollections>;

export interface SalonDatabaseCollections  {
    clients: ClientsCollection;
    users: any;
}
