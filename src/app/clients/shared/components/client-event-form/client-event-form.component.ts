import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-client-event-form',
  templateUrl: './client-event-form.component.html',
  styleUrls: ['./client-event-form.component.scss'],

})
export class ClientEventFormComponent implements OnInit {
  @HostBinding('style.--width') hostWidth = '50px';
  @Input() event: any;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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
    const {touched, invalid } = this.form.get('price');
    return touched && invalid;
  }
}
