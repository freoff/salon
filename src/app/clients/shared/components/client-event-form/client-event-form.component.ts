import {
  AfterViewInit,
  Component,
  ComponentRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { IonInput, PopoverController } from '@ionic/angular';
import { ClientEvent } from '../../../models/client-event';

@Component({
  selector: 'app-client-event-form',
  templateUrl: './client-event-form.component.html',
  styleUrls: ['./client-event-form.component.scss'],
})
export class ClientEventFormComponent implements OnInit, AfterViewInit {
  @HostBinding('style.--width') hostWidth = '50px';
  @Input() event: any;
  @Input() currency = 'PLN';
  @ViewChild('priceInput') priceInput: IonInput;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private popOver: PopoverController) {}

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.priceInput.setFocus(), 300);
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
