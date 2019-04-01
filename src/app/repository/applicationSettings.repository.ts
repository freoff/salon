import { ApplicationSetting } from '../services/rxdb.service/collections/applicationSettings.collection';
import { RxdbService } from '../services/rxdb.service';
import { from } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApplicationSettingsRepository {
  constructor(private rxdb: RxdbService) {}

  save(applicationSettings: ApplicationSetting) {
    console.log('saving', applicationSettings);

    const savePromise = this.rxdb.getDb().then((db) =>
      db.application_settings
        .findOne()
        .exec()
        .then((settings) => {
          if (settings) {
            return settings.atomicUpdate((old) => ({ ...old, ...applicationSettings }));
          } else {
            return db.application_settings.insert(applicationSettings);
          }
        }),
    );
    return from(savePromise);
  }

  loadSettings() {
    return this.rxdb.getDb$().pipe(
      switchMap((db) => from(db.application_settings.findOne().exec())),
      map((applicationSettingDoc) => applicationSettingDoc && applicationSettingDoc.getApplicationSettings()),
    );
  }
}
