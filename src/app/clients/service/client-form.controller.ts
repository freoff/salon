import { Injectable } from '@angular/core';
import { ClientsModule } from '../clients.module';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormState } from '../../types/form-status.enum';
import { Phone } from '../models/phone.interface';
import {PhoneTypes} from '../models/phone-types.enum';

@Injectable({ providedIn: ClientsModule })
export class ClientFormController {
  private _form: FormGroup;

  get form() {
    return this._form;
  }
  constructor(private fb: FormBuilder) {
    

    this.initializeForm();
  }
  getFormPhones(): FormArray {
    return this._form && (this.form.get(['client', 'phones']) as FormArray);
  }
  isUpdateForm = () => FormState.isUpdate(this._form.get(['formState', 'formStatus']).value);

  private initializeForm() {
    this._form = this.fb.group({
      client: this.fb.group({

        fname          : ['', [Validators.required, Validators.minLength(3)]],
        lname          : ['', [Validators.required, Validators.minLength(3)]],
        phones     : this.fb.array([this.createPhone()]),
        email          : ['', [Validators.email]],
        clientNotes    : [''],
        sex            : ['female'],
      }),
      state: [FormState.createNew],
    });
  }
  public createPhone(
    phone: Phone = {
      id: '',
      name: PhoneTypes.cell,
      number: '',
      order: 1,
      primary: true,
    },
  ) {
    const { id, name, number, order, primary } = phone;
    return this.fb.group({
      id         : [id, []],
      name       : [name, []],
      number     : [number, [Validators.required]],
      primary    : [primary, []],
      order      : [order, []],
    });
  }

  removePhone({ index }) {
    this.getFormPhones().removeAt(index);
  }

  setFormState(state: FormState) {
    this.form.get('state').patchValue(state);
  }
}
