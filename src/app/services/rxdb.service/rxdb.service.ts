import RxDB, { RxDatabaseBase } from 'rxdb';
import { environment } from '../../../environments/environment';
import { SalonDatabase, SalonDatabaseCollections } from './collections';
import { clientCollectionMethods, clientDocMethods, clientSchema } from './collections/clientSchema';
import { Observable, ReplaySubject } from 'rxjs';
import { clientEventSchema } from './collections/clientEventSchema';
import { applicationSettingsMethods, applicationSettingsSchema } from './collections/application-settings.schema';

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
    }
  }
  removeDB() {
    return this._dbConnection.remove();
    // return this.getDb()
    //   .then((db) => db.destroy())
    //   .then(() => {
    //     this.activeConnection.next(null);
    //     this.dbCreateInProgress = false;
    //     return this.initializeDB().then(() => this._dbConnection);
    //   });
  }
  private async initializeCollections() {
    await this._dbConnection.collection({
      name: 'clients',
      schema: clientSchema,
      methods: clientDocMethods as any,
      statics: clientCollectionMethods as any,
    });
    await this._dbConnection.collection({
      name: 'client_events',
      schema: clientEventSchema,
    });
    await this._dbConnection.collection({
      name: 'application_settings',
      schema: applicationSettingsSchema,
      methods: applicationSettingsMethods as any,
    });
  }
}
