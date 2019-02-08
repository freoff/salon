import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {PhoneTypes} from '../../../models/telephone-types.enum';
import {FormState} from '../../../../types/form-status.enum';
import {ClientFormInterface} from '../../../types/client-form.interface';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormComponent implements OnInit {
  @Input() formTelephonesControls: FormArray;
  @Input() form: FormGroup;
  @Input() phoneTypes: PhoneTypes;
  @Input() isUpdate: boolean;
  @Output() addPhone = new EventEmitter();
  @Output() removePhone = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
}
