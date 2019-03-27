import { RxdbService } from '../services/rxdb.service';
import { EntityIdGeneratorService } from '../services/entity-id-generator.service';
import { Client } from '../clients/models/client.interface';
import { ClientEvent } from '../clients/models/client-event';
import {from, Observable, of} from 'rxjs';
import { RxDatabaseBase, RxDocumentBase } from 'rxdb';
import {SalonDatabase, SalonDatabaseCollections} from '../services/rxdb.service/collections';
import { exhaustMap, first, map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class ClientEventsRepository {
  private db$: Observable<RxDatabaseBase<SalonDatabaseCollections> & SalonDatabaseCollections>;

  constructor(private rxdb: RxdbService, private idGenerator: EntityIdGeneratorService) {
    this.db$ = rxdb.getDb$();
  }

  getEventForClient(client: Client | string): Observable<Array<ClientEvent>> {
    const clientId = typeof client === 'string' ? client : client.id;
    return this.db$.pipe(
      switchMap((db) => db.client_events.find({ client: { $eq: clientId } }).sort({ eventDate: 'desc' }).$),
      map((clientEventsDocs) => clientEventsDocs.map((ce) => ce.toJSON())),
    );
  }

  createClientEvent(
    client: Client,
    clientEvent: ClientEvent,
  ): Observable<RxDocumentBase<ClientEvent, {}> & ClientEvent & {}> {
      console.log('in repo');
    return this.rxdb.getDb$().pipe(
      tap(() => console.log(clientEvent)),
      switchMap((db) =>
        from(
          this.insertClientEventToDb(db, clientEvent, client),
        ),
      ),
    );
  }

    private insertClientEventToDb(db: SalonDatabase, clientEvent: ClientEvent, client: Client) {
        console.log('try to insert');
        return db.client_events.insert({
            ...clientEvent,
            client: client.id,
            eventDate: moment(clientEvent.eventDate).valueOf(),
        });
    }

    updateClientEvent(eventId, changes: Partial<ClientEvent>) {
    return this.db$.pipe(
      exhaustMap((db) => db.client_events.findOne(eventId).$.pipe(first())),
      map(async (clientEventDoc) => await clientEventDoc.atomicUpdate(oldData => ({...oldData, ...changes}))),
    );
  }
  deleteClientEvent({clientEventId}): Observable<boolean> {
    return this.db$.pipe(
        exhaustMap(db => from(this.deleteEventFromDb(db, clientEventId))),
    );
  }
  private deleteEventFromDb(db: SalonDatabase, id) {
      return db.client_events.findOne(id).exec().then(event => event.remove());
  }
}
