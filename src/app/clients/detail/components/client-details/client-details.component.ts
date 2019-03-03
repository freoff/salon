import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from '../../../models/client.interface';
import { ClientEvent } from '../../../models/client-event';
import { ClientStateService } from '../../../../services/state/client-state.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent implements OnInit {
  @Input() client: Client;
  @Output() call = new EventEmitter<{ number: string }>();
  constructor(private clientStateService: ClientStateService) {}

  ngOnInit() {}

  getIcon(client: Client) {
    return client.sex === 'female' ? '/assets/icon/016-girl.svg' : '/assets/icon/017-man.svg';
  }
  onCall(number: string) {
    this.call.emit({ number });
  }

  addClientEvent(data: ClientEvent) {
    console.log('data', data);
    this.clientStateService.addClientEvent({client: this.client, clientEvent: data});
  }
}
