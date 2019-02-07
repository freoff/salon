import { Component, OnInit } from '@angular/core';
import {ClientFormController} from '../client-form.controller';
import {FormGroup} from '@angular/forms';
import {ClientFormInterface} from '../types/client-form.interface';
import {TelephoneTypes} from '../models/telephone-types.enum';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  public form: FormGroup;
  public telephoneTypes = [TelephoneTypes.cell, TelephoneTypes.ground]
  constructor(public formController: ClientFormController) {
    this.form = formController.form;
  }
  resetForm() {
    this.form.reset();
  }
  addClient(client: ClientFormInterface ) {
    console.log('New client ', client);
  }
  ngOnInit() {
  }
  get formTelephonesControls() {
    return this.formController.getFormTelephones().controls;
  }
  addTelephone(index: number) {
      console.log(this.formTelephonesControls);
    // console.log('Telephone is valid' ,this.formController.getFormTelephones().at(index).valid);
    this.formController.getFormTelephones().push(this.formController.createTelephone());
  }


}
