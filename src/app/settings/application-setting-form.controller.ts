import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApplicationSettingsComponent } from './components/application-settings/application-settings.component';
import {SettingsPageModule} from './settings.module';

@Injectable({ providedIn: SettingsPageModule })
export class ApplicationSettingsController {
  _form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.init();
  }
  init() {
    this._form = this.fb.group({
      language: ['PL'],
      currency: ['PLN'],
    });
  }

  isValid() {
    return this._form.valid;
  }
}
