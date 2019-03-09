import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-client-form-footer',
  templateUrl: './client-form-footer.component.html',
  styleUrls: ['./client-form-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormFooterComponent implements OnInit {
  @Output() resetForm = new EventEmitter();
  @Output() addClient = new EventEmitter();
  @Output() updateClient = new EventEmitter();
  @Input() isUpdate: boolean;
  constructor() {}

  ngOnInit() {}
}
