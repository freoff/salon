import { Component, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Phone } from '../../../models/phone.interface';
import { FormGroup } from '@angular/forms';
import { PhoneTypes } from '../../../models/phone-types.enum';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-client-form-phones',
  templateUrl: './client-form-phones.component.html',
  styleUrls: ['./client-form-phones.component.scss'],
})
export class ClientFormPhonesComponent implements OnInit {
  @Input() phones: Phone[];
  @Input() form: FormGroup;
  @Input() phoneTypes: PhoneTypes;
  @Output() addPhone = new EventEmitter();
  @Output() removePhone = new EventEmitter();
  @ViewChildren('phoneInput') phoneInputs: QueryList<IonInput>;
  totalPhones = this.phones ? this.phones.length : 0;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  onAddPhone() {
    this.addPhone.emit({});
    setTimeout(() => this.phoneInputs.last.setFocus(), 200);
  }
}
