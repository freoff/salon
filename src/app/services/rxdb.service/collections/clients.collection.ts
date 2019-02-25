import {Client} from '../../../clients/models/client.interface';
import {RxCollection, RxDocument} from 'rxdb';

export interface ClientDocMethods  {
    getFullName: () => string;
    getClientData: () => Client;
};
export type ClientDocument = RxDocument<Client, ClientDocMethods>;

export interface ClientCollectionMethods  {
    totalClients: () => Promise<number>;
}

export type ClientsCollection = RxCollection<Client, ClientDocMethods, ClientCollectionMethods>;
