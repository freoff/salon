import { RxdbService } from '../services/rxdb.service';
import { EntityIdGeneratorService } from '../services/entity-id-generator.service';
import { Client } from '../clients/models/client.interface';
import { ClientEvent } from '../clients/models/client-event';
import { from, Observable } from 'rxjs';
import { RxDatabaseBase, RxDocumentBase } from 'rxdb';
import { SalonDatabaseCollections } from '../services/rxdb.service/collections';
import { map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ClientEventsRepository {
  private db$: Observable<RxDatabaseBase<SalonDatabaseCollections> & SalonDatabaseCollections>;

  constructor(private rxdb: RxdbService, private idGenerator: EntityIdGeneratorService) {
    this.db$ = rxdb.getDb$();
  }

  getEventForClient(client: Client | string): Observable<Array<ClientEvent>> {
    const clientId = typeof client === 'string' ? client : client.id;
    return this.db$.pipe(
      switchMap((db) => db.client_events.find({ client: { $eq: clientId } }).$),
      map((clientEventsDocs) => clientEventsDocs.map((ce) => ce.toJSON())),
    );
  }

  createClientEvent(client: Client, event: ClientEvent): Observable<RxDocumentBase<ClientEvent, {}> & ClientEvent & {}> {
    return from(this.rxdb.getDb().then((db) => db.client_events.insert(event)));
  }



}
