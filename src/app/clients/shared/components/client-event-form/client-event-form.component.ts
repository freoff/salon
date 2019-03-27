import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { IonInput, PopoverController } from '@ionic/angular';
import { ClientEvent } from '../../../models/client-event';
import { ClientFormInterface } from '../../../types/client-form.interface';
import { ClietnEventFormInterface } from '../../../types/clietn-event-form.interface';

@Component({
  selector: 'app-client-event-form',
  templateUrl: './client-event-form.component.html',
  styleUrls: ['./client-event-form.component.scss'],
})
export class ClientEventFormComponent implements OnInit, AfterViewInit {
  @HostBinding('style.--width') hostWidth = '50px';
  @Input() event: any;
  @Input() currency = 'PLN';
  @Input() isUpdate = false;
  @ViewChild('priceInput') priceInput: IonInput;
  @Input() set clientEvent(ce: ClientEvent) {
    this._clientEvent = ce;
    const formData: ClietnEventFormInterface = {
      eventDate: moment(ce.eventDate).toISOString(),
      eventNotes: ce.eventNotes,
      _id: ce._id,
      price: ce.price.amount / 100,
    };
    this.form.patchValue({ ...formData });
    this.form.setControl('_id', new FormControl(ce._id));
  }
  form: FormGroup;
  private _clientEvent: ClientEvent;

  constructor(private formBuilder: FormBuilder, private popOver: PopoverController, private chdr: ChangeDetectorRef) {
    this.initForm();
  }

  ngOnInit() {}

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
      eventDate: moment(this.form.value.eventDate).valueOf(),
      price: {
        amount: this.form.value.price * 100,
        currency: this.currency,
      },
    };
  }
}
