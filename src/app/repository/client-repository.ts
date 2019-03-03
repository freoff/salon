import { Client } from '../clients/models/client.interface';
import { Injectable, InjectionToken } from '@angular/core';
import { LocalStorageClientRepository } from './local-storage-client-repository.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { EntityIdGeneratorService } from '../services/entity-id-generator.service';
import { Observable } from 'rxjs';
import { RxdbService } from '../services/rxdb.service';
import { RxdbClientRepository } from './rxdb-client.repository';
import { ClientEvent } from '../clients/models/client-event';

export interface ClientRepositoryInterface {
  saveClient({ client }: { client: Client }): Observable<Client>;
  addClientEvent(payload: { client: Client; clientEvent: ClientEvent }): Observable<any>;
  getAll(): Observable<Array<Client>>;
  getClient({ clientId }): Observable<Client>;
}

export const ClientRepository = new InjectionToken<ClientRepositoryInterface>('clientRepository');
