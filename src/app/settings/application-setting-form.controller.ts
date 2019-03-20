import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsPageModule } from './settings.module';
import { Observable } from 'rxjs';

@Injectable()
export class ApplicationSettingsFormController {
  _form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.init();
  }

  init() {
    this._form = this.fb.group({
      language: ['pl'],
      currency: ['PLN'],
    });
  }

  isValid() {
    return this._form.valid;
  }

  onChangeLanguage(): Observable<string> {
    return this._form.get('language').valueChanges;
  }

  getForm() {
    return this.form;
  }

  get form() {
    return this._form;
  }
}

export interface ApplicationSettingsFormInterface {
  language: string;
  currency: string;
}
