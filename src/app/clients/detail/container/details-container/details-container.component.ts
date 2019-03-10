import {Component, OnInit} from '@angular/core';
import {ClientStateService} from '../../../../services/client-state.service';
import {PhoneService} from '../../../../services/phone.service';
import {ClientEvent} from '../../../models/client-event';
import {Client} from '../../../models/client.interface';

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

    editClient(client: Client) {
        this.clientStateService.editClient({client});
    }

    deleteClient(client: Client) {
        this.clientStateService.deleteClient(client);
    }
}
