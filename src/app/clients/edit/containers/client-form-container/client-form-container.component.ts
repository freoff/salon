import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PhoneTypes } from '../../../models/phone-types.enum';
import { ClientFormController } from '../../../../services/client-form.controller';
import { ClientFormInterface } from '../../../types/client-form.interface';
import { ClientStateService } from '../../../../services/client-state.service';
import { IonItem } from '@ionic/angular';

@Component({
  selector: 'app-client-form-container',
  templateUrl: './client-form-container.component.html',
  styleUrls: ['./client-form-container.component.scss'],
})
export class ClientFormContainerComponent implements OnInit, OnDestroy {
  @Input() isUpdate: boolean;
  @ViewChildren('ion-item') ionItems: QueryList<IonItem>;
  public form: FormGroup;
  public phoneTypes = [PhoneTypes.cell, PhoneTypes.ground];
  constructor(public formController: ClientFormController, private clientState: ClientStateService) {
    this.form = formController.form;
  }
  resetForm() {
    this.formController.reset();
  }
  addClient() {
    if (this.formController.isValid()) {
      this.clientState.createClient({ client: this.formController.getValue() as ClientFormInterface });
    } else {
      this.showAllClientFormError();
    }
  }

  updateClient(event) {
    if (this.formController.isValid()) {
      this.clientState.updateClient({ client: this.formController.getValue() as ClientFormInterface });
    } else {
      this.showAllClientFormError();
    }
  }

  private showAllClientFormError() {
    {
      this.formController.touchAllControls();
      // because Ionic not respect touched status in ion-input on ion-item
      document.querySelectorAll('ion-item').forEach((ii) => {
        console.log(ii);
        ii.classList.remove('ion-untouched');
        ii.classList.add('ion-touched');
      });
    }
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
    this.formController.reset();
  }
}
