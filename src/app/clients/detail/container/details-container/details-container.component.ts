import {Component, OnInit} from '@angular/core';
import {ClientStateService} from '../../../../services/state/client-state.service';
import {PhoneService} from '../../../../services/phone.service';
import {ClientEvent} from '../../../models/client-event';

@Component({
  selector: 'app-details-container',
  templateUrl: './details-container.component.html',
  styleUrls: ['./details-container.component.scss'],
})
export class DetailsContainerComponent implements OnInit {
  selectedClient$ = this.clientStateService.getSelectedClient();
  clientEvents$ = this.clientStateService.getClientEvents();
  constructor(private clientStateService: ClientStateService, private phoneService: PhoneService) {}

  ngOnInit() {}

  call({ number }: { number: string }) {
    this.phoneService.call({ number });
  }
  deleteClientEvent(clientEvent: ClientEvent) {
    this.clientStateService.deleteClientEvent({clientEventId: clientEvent._id});

  }

    saveNote({client, note}) {
        this.clientStateService.saveClientNote({client, note});
    }
}
