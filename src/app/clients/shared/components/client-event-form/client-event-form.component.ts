import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PopoverController } from '@ionic/angular';
import { ClientEvent } from '../../../models/client-event';

@Component({
  selector: 'app-client-event-form',
  templateUrl: './client-event-form.component.html',
  styleUrls: ['./client-event-form.component.scss'],
})
export class ClientEventFormComponent implements OnInit {
  @HostBinding('style.--width') hostWidth = '50px';
  @Input() event: any;
  @Input() currency = 'PLN';
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private popOver: PopoverController) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      eventDate: [moment().toISOString()],
      price: [null, [Validators.min(1), Validators.max(10000)]],
      eventNotes: ['', []],
    });
  }
  showPriceError() {
    const { touched, invalid } = this.form.get('price');
    return touched && invalid;
  }
  cancel() {
    this.popOver.dismiss(null, 'backdrop');
  }
  add() {
    this.popOver.dismiss(this.mapFormDataToClientEventObject());
  }
  mapFormDataToClientEventObject(): ClientEvent {
    return {
      ...this.form.value,
      price: {
        amount: this.form.value.price * 100,
        currency: this.currency,
      },
    };
  }
}
