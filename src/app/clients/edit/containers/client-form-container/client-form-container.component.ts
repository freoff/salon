import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PhoneTypes } from '../../../models/phone-types.enum';
import { ClientFormController } from '../../../service/client-form.controller';
import { ClientFormInterface } from '../../../types/client-form.interface';
import { Params } from '@angular/router';
import { FormState } from '../../../../types/form-status.enum';
import { isEmpty } from 'rxjs/operators';
import { ClientStateService } from '../../../service/client-state.service';

@Component({
  selector: 'app-client-form-container',
  templateUrl: './client-form-container.component.html',
  styleUrls: ['./client-form-container.component.scss'],
})
export class ClientFormContainerComponent implements OnInit {
  @Input() isUpdate: boolean;

  public form: FormGroup;
  public phoneTypes = [PhoneTypes.cell, PhoneTypes.ground];
  constructor(public formController: ClientFormController, private clientState: ClientStateService) {
    this.form = formController.form;
  }
  resetForm() {
    this.form.reset();
  }
  addClient() {
    this.clientState.createClient({ client: this.form.value as ClientFormInterface });
  }
  ngOnInit() {}
  get formPhonesControls() {
    return this.formController.getFormPhones().controls;
  }
  addPhone() {
    this.formController.getFormPhones().push(this.formController.createPhone());
  }

  removePhone(index: number) {
    this.formController.removePhone({ index });
  }
}
