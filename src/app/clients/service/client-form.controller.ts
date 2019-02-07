import { Injectable } from '@angular/core';
import { ClientsModule } from '../clients.module';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormState } from '../../types/form-status.enum';
import { Phone } from '../models/telephone.interface';

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
    return this._form && (this.form.get(['client', 'telephones']) as FormArray);
  }
  isUpdateForm = () => FormState.isUpdate(this._form.get(['formState', 'formStatus']).value);

  private initializeForm() {
    this._form = this.fb.group({
      client: this.fb.group({
        fname: ['', [Validators.required, Validators.minLength(3)]],
        lname: ['', [Validators.required, Validators.minLength(3)]],
        telephones: this.fb.array([this.createTelephone()]),
        email: ['', [Validators.email]],
        clientNotes: [''],
      }),
      state: [FormState.createNew],
    });
  }
  public createTelephone(
    telephone: Phone = {
      id: '',
      name: null,
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

  removePhone({ index }) {
    this.getFormTelephones().removeAt(index);
  }

    setFormState(state: FormState) {
        this.form.get('state').patchValue(state)
    }
}
