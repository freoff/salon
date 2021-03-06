import { Component, OnInit } from '@angular/core';
import { ClientStateService } from '../../../../services/client-state.service';
import { PhoneService } from '../../../../services/phone.service';
import { ClientEvent } from '../../../models/client-event';
import { Client } from '../../../models/client.interface';
import { ApplicationStateService } from '../../../../services/application-state.service';
import { ClientEventFormPopoverCreator } from '../../../shared/ClientEventFormPopoverCreator.class';
import { first, switchMap } from 'rxjs/operators';
import { from } from 'rxjs/internal/observable/from';

@Component({
  selector: 'app-details-container',
  templateUrl: './details-container.component.html',
  styleUrls: ['./details-container.component.scss'],
})
export class DetailsContainerComponent implements OnInit {
  selectedClient$ = this.clientStateService.getSelectedClient();
  clientEvents$ = this.clientStateService.getClientEvents();
  currency$ = this.applicationStateService.getApplicationCurrency();

  constructor(
    private applicationStateService: ApplicationStateService,
    private clientStateService: ClientStateService,
    private phoneService: PhoneService,
    private clientEventPopover: ClientEventFormPopoverCreator,
  ) {}

  ngOnInit() {}

  call({ number }: { number: string }) {
    this.phoneService.call({ number });
  }
  deleteClientEvent(clientEvent: ClientEvent) {
    this.clientStateService.deleteClientEvent({ clientEventId: clientEvent._id });
  }

  saveNote({ client, note }) {
    this.clientStateService.saveClientNote({ client, note });
  }

  editClient(client: Client) {
    this.clientStateService.editClient({ client });
  }

  deleteClient(client: Client) {
    this.clientStateService.deleteClient(client);
  }

  updateClientEvent($event: { newText: string; eventId: any }) {
    this.clientStateService.updateClientEvent($event);
  }

  editClientEvent(clientEvent: ClientEvent) {
    console.log('creta ce form', clientEvent);
    this.currency$
      .pipe(
        switchMap((currency) => from(this.clientEventPopover.createUpdateForm(clientEvent, currency))),
        first(),
      )
      .subscribe((data) => {
        console.log('resolve this data', data);
        this.clientStateService.updateClientEvent(data);
      });
  }
}
