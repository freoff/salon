import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PhoneTypes } from '../../../models/phone-types.enum';
import { ClientFormController } from '../../../../services/client-form.controller';
import { ClientFormInterface } from '../../../types/client-form.interface';
import { ClientStateService } from '../../../../services/client-state.service';

@Component({
  selector: 'app-client-form-container',
  templateUrl: './client-form-container.component.html',
  styleUrls: ['./client-form-container.component.scss'],
})
export class ClientFormContainerComponent implements OnInit, OnDestroy {
  @Input() isUpdate: boolean;

  public form: FormGroup;
  public phoneTypes = [PhoneTypes.cell, PhoneTypes.ground];
  constructor(public formController: ClientFormController, private clientState: ClientStateService) {
    this.form = formController.form;
  }
  resetForm() {
    this.formController.reset();
  }
  addClient() {
    this.clientState.createClient({ client: this.formController.getValue() as ClientFormInterface });
  }
  updateClient() {
    console.log('update ', this.formController.getValue());
    this.clientState.updateClient({ client: this.formController.getValue() as ClientFormInterface });
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

  ngOnDestroy(): void {
    console.log('destroing');
    this.formController.reset();
  }
}
