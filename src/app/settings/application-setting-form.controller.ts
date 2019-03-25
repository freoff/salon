import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsPageModule } from './settings.module';
import { Observable } from 'rxjs';
import { ApplicationSetting } from '../services/rxdb.service/collections/applicationSettings.collection';

@Injectable()
export class ApplicationSettingsFormController {
  _form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.init();
  }

  init() {
    this._form = this.fb.group({
      applicationLanguage: ['pl'],
      currency: ['PLN'],
    });
  }

  isValid() {
    return this._form.valid;
  }

  onChangeLanguage(): Observable<string> {
    return this._form.get('applicationLanguage').valueChanges;
  }

  getForm() {
    return this.form;
  }

  get form() {
    return this._form;
  }
  getSettings(): ApplicationSetting {
    return {
      currency: this.form.get('currency').value,
      applicationLanguage: this.form.get('applicationLanguage').value,
    };
  }

  update(lang: string, currency: string) {
    this.form.patchValue({ applicationLanguage: lang, currency: currency }, {emitEvent: false});
  }
}

export interface ApplicationSettingsFormInterface {
  applicationLanguage: string;
  currency: string;
}
