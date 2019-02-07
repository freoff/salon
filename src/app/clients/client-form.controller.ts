import { Injectable } from '@angular/core';
import { ClientsModule } from './clients.module';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormStatus } from '../types/form-status.enum';
import { Telephone } from './models/telephone.interface';

@Injectable({ providedIn: ClientsModule })
export class ClientFormController {
  private _form: FormGroup;

  get form() {
    return this._form;
  }
  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }
  getFormTelephones(): FormArray {
      return this._form && this.form.get(['client', 'telephones']) as FormArray;
  }
  isUpdateForm = () =>
    FormStatus.isUpdate(this._form.get(['formState', 'formStatus']).value);

  private initializeForm() {
    this._form = this.fb.group({
      client: this.fb.group({
        fname: ['', [Validators.required, Validators.minLength(3)]],
        lname: ['', [Validators.required, Validators.minLength(3)]],
        telephones: this.fb.array([this.createTelephone()]),
        email: ['', [Validators.email]],
        clientNotes: this.fb.array([]),
      }),
      formState: this.fb.group({
        formStatus: FormStatus.createNew,
      }),
    });
  }
  public createTelephone(
    telephone: Telephone = {
      id: '',
      name: 'komorkowy',
      number: '',
      order: 1,
      primary: true,
    },
  ) {
    const { id, name, number, order, primary } = telephone;
    return this.fb.group({
      id: [id, []],
      name: [name, []],
      number: [number, [Validators.required]],
      primary: [primary, []],
      order: [order, []],
    });
  }
}
