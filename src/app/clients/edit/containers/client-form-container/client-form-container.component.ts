import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PhoneTypes } from '../../../models/telephone-types.enum';
import { ClientFormController } from '../../../service/client-form.controller';
import { ClientFormInterface } from '../../../types/client-form.interface';
import { Params } from '@angular/router';
import { FormState } from '../../../../types/form-status.enum';
import {isEmpty} from 'rxjs/operators';

@Component({
  selector: 'app-client-form-container',
  templateUrl: './client-form-container.component.html',
  styleUrls: ['./client-form-container.component.scss'],
})
export class ClientFormContainerComponent implements OnInit {
  @Input()isUpdate: boolean;

  public form: FormGroup;
  public phoneTypes = [PhoneTypes.cell, PhoneTypes.ground];
  constructor(public formController: ClientFormController) {
    this.form = formController.form;
  }
  resetForm() {
    this.form.reset();
  }
  addClient() {
    console.debug('New client ', this.form.value);
  }
  ngOnInit() {}
  get formTelephonesControls() {
    return this.formController.getFormTelephones().controls;
  }
  addPhone() {
    this.formController.getFormTelephones().push(this.formController.createTelephone());
  }

  removePhone(index: number) {
    this.formController.removePhone({ index });
  }
}
