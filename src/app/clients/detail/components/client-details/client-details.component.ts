import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from '../../../models/client.interface';
import { ClientEvent } from '../../../models/client-event';
import { ClientStateService } from '../../../../services/client-state.service';
import { PageChangedEvent } from 'ngx-bootstrap';
import { distinctUntilChanged, filter, take, tap } from 'rxjs/operators';
import { Pager } from '../../../../shared/class/Pager.class';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent implements OnInit {
  private CLIENT_EVENTS_PAGE_SIEZE = 10;
  @Input() client: Client;
  @Input() currency;
  @Output() deleteClientEvent = new EventEmitter<ClientEvent>();
  _clientEvents: ClientEvent[];
  length;
  @Input() set clientEvents(ce) {
    this._clientEvents = ce;
    this.length = ce.length;
    this.pager.setCollection(ce);
  }
  @Output() call = new EventEmitter<{ number: string }>();
  @Output() saveNote = new EventEmitter<string>();
  @Output() editClient = new EventEmitter<Client>();
  @Output() deleteClient = new EventEmitter<Client>();
  displayNotesCheckbox = false;
  pager = new Pager<ClientEvent>(this.CLIENT_EVENTS_PAGE_SIEZE);
  public expandedRow: string;
  constructor(
    private clientStateService: ClientStateService,
    public actionSheetController: ActionSheetController,
    private translationService: TranslateService,
  ) {}
  clientEventToDisplay(): Observable<Array<ClientEvent>> {
    return this.pager.data.pipe(
      distinctUntilChanged(),
      filter((data) => !!data),
    );
  }

  trackEventsBy = (index, item) => item.eventDate;

  ngOnInit() {}

  getIcon(client: Client) {
    return client.sex === 'female' ? '/assets/icon/016-girl.svg' : '/assets/icon/017-man.svg';
  }
  onCall(number: string) {
    this.call.emit({ number });
  }

  addClientEvent(data: ClientEvent) {
    this.clientStateService.addClientEvent({ client: this.client, clientEvent: data });
  }

  setExpanded(_id: string) {
    if (this.expandedRow === _id) {
      this.expandedRow = null;
    } else {
      this.expandedRow = _id;
    }
  }

  toggleNotes() {
    this.displayNotesCheckbox = !this.displayNotesCheckbox;
  }

  changePage($event: PageChangedEvent) {
    this.pager.goToPage($event.page);
  }
  showPager() {
    return this.length && this.length > this.CLIENT_EVENTS_PAGE_SIEZE;
  }
  onDeleteClientEvent(clientEvent: ClientEvent) {
    this.deleteClientEvent.emit(clientEvent);
  }

  onEditClient(client: Client) {
    this.editClient.emit(client);
  }

  deleteClientConfirmation(client: Client) {
    this.translationService
      .get(
        [
          'clients.details.labels.removeClientHeader',
          'clients.details.labels.deleteClient',
          'clients.details.labels.abortDelete',
        ],
        {},
      )
      .pipe(
        take(1),
        tap(console.log),
      )
      .subscribe(
        ({
          'clients.details.labels.removeClientHeader': removeClientHeader,
          'clients.details.labels.deleteClient': deleteClient,
          'clients.details.labels.abortDelete': abortDelete,
        }) => {
          const actionSheet = this.actionSheetController
            .create({
              header: removeClientHeader,
              buttons: [
                { text: abortDelete, icon: 'close' },
                { text: deleteClient, icon: 'trash', handler: () => this.deleteClient.emit(client) },
              ],
            })
            .then((dialog) => dialog.present());
        },
      );
  }
}
