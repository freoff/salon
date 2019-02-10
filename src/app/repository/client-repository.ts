import { Client } from '../clients/models/client.interface';
import { Injectable } from '@angular/core';
import { LocalStorageClientRepository } from './local-storage-client-repository.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { EntityIdGeneratorService } from '../services/entity-id-generator.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
  useClass: LocalStorageClientRepository,
  deps: [Storage, EntityIdGeneratorService],
})
export abstract class ClientRepository {
  abstract saveClient({ client }: { client: Client }): Observable<Client>;

  abstract getAll(): Observable<Array<Client>>;
  abstract getClient({ clientId }): Observable<Client>;
}
