import RxDB, { RxDatabase, RxDatabaseBase } from 'rxdb';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SalonDatabase, SalonDatabaseCollections } from './collections';
import { clientCollectionMethods, clientDocMethods, clientSchema } from './collections/clientSchema';
import { ClientDocMethods, ClientCollectionMethods } from './collections/clients.collection';
import {from, Observable, ReplaySubject, Subject} from 'rxjs';
import {share} from 'rxjs/operators';

export class RxdbService {
  _dbConnection: SalonDatabase;
  activeConnection = new ReplaySubject<SalonDatabase>(1);
  dbCreateInProgress = false;
  constructor() {}

  getDb$(): Observable<RxDatabaseBase<SalonDatabaseCollections> & SalonDatabaseCollections> {
    this.getDb();
    return this.activeConnection.pipe();
  }

  async getDb(): Promise<SalonDatabase> {
    if (!this._dbConnection && !this.dbCreateInProgress) {
      this.dbCreateInProgress = true;
      await this.initializeDB();
      this.activeConnection.next(this._dbConnection);
    }
    return this._dbConnection;
  }

  async initializeDB() {
    RxDB.plugin(require('pouchdb-adapter-idb'));
    this._dbConnection = await RxDB.create<SalonDatabaseCollections>({
      name: environment.db.name,
      password: environment.db.password,
      adapter: 'idb',
    });
    await this.initializeCollections();
    if (!environment.production) {
      window['d'] = this._dbConnection;
      console.log(window['d']);
    }
  }

  private async initializeCollections() {
    await this._dbConnection.collection({
      name: 'clients',
      schema: clientSchema,
      methods: clientDocMethods as any,
      statics: clientCollectionMethods as any,
    });
  }
}
