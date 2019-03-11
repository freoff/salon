import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PhoneTypes } from '../../../models/phone-types.enum';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormComponent implements OnInit {
  @Input() phones: FormArray;
  @Input() form: FormGroup;
  @Input() phoneTypes: PhoneTypes;
  @Input() isUpdate: boolean;
  @Output() addPhone = new EventEmitter();
  @Output() removePhone = new EventEmitter<number>();

  constructor() {}

  isFemale() {
    return this.form.get(['sex']).value === 'female';
  }

  ngOnInit() {}

  // src/assets/icon/boy-hair-shape.svg
  getIcon() {
    return this.isFemale() ? '/assets/icon/016-girl.svg' : '/assets/icon/017-man.svg';
  }
}
