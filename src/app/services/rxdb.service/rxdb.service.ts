import RxDB, { RxDatabase, RxDatabaseBase } from 'rxdb';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SalonDatabase, SalonDatabaseCollections } from './collections';
import { clientCollectionMethods, clientDocMethods, clientSchema } from './collections/clientSchema';
import { ClientDocMethods, ClientCollectionMethods } from './collections/clients.collection';
import { from, Observable } from 'rxjs';

export class RxdbService {
  _dbConnection: SalonDatabase;

  constructor() {}

  getDb$(): Observable<RxDatabaseBase<SalonDatabaseCollections> & SalonDatabaseCollections> {
    return from(this.getDb());
  }

  async getDb(): Promise<SalonDatabase> {
    if (!this._dbConnection) {
      await this.initializeDB();
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
    console.log('Db opened', this._dbConnection);
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
