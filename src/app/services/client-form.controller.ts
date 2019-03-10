import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormState } from '../types/form-status.enum';
import { Phone } from '../clients/models/phone.interface';
import { PhoneTypes } from '../clients/models/phone-types.enum';
import { ClientFormInterface } from '../clients/types/client-form.interface';
import { isEmpty } from 'underscore';

const DEFAULT_CLIENT_FORM: ClientFormInterface = {
  client: {
    clientNotes: '',
    email: '',
    fname: '',
    id: null,
    lname: '',
    sex: 'female',
    phones: [
      {
        id: '',
        name: PhoneTypes.cell,
        number: '',
        order: 1,
        primary: true,
      },
    ],
  },
  state: FormState.createNew,
};

@Injectable({ providedIn: 'root' })
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
        id: [],
        fname: ['', [Validators.required, Validators.minLength(3)]],
        lname: ['', [Validators.required, Validators.minLength(3)]],
        phones: this.fb.array([this.createPhone()]),
        email: ['', [Validators.email]],
        clientNotes: [''],
        sex: ['female'],
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
      id: [id, []],
      name: [name, []],
      number: [number, [Validators.required]],
      primary: [primary, []],
      order: [order, []],
    });
  }

  removePhone({ index }) {
    this.getFormPhones().removeAt(index);
  }

  setFormState(state: FormState) {
    this.form.get('state').patchValue(state);
  }

  reset() {
    this.form.reset();
    this.form.patchValue(DEFAULT_CLIENT_FORM);
    this.addPhonesToForm(DEFAULT_CLIENT_FORM.client.phones);
  }
  getValue() {
    const values: ClientFormInterface = this.form.value;
    this.deleteEmptyPhoneNumberItems(values);
    return values;
  }

  private deleteEmptyPhoneNumberItems(values: ClientFormInterface) {
    values.client.phones = [...values.client.phones.filter((phone) => !isEmpty(phone.number))];
  }

  addPhonesToForm(phones: Phone[]) {
    (this.form.get('client') as FormGroup).setControl('phones', new FormArray([]));
    const formPhonesArray = this.getFormPhones();
    phones.forEach((phone) => formPhonesArray.push(this.createPhone(phone)));
  }
}
