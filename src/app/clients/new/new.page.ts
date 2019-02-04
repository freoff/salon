import { Component, OnInit } from '@angular/core';
import {ClientFormController} from '../client-form.controller';
import {FormGroup} from '@angular/forms';
import {ClientFormInterface} from '../types/client-form.interface';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  public form: FormGroup;

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

}
