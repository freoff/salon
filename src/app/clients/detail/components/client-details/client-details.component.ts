import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from '../../../models/client.interface';
import { ClientEvent } from '../../../models/client-event';
import { ClientStateService } from '../../../../services/state/client-state.service';
import { PageChangedEvent } from 'ngx-bootstrap';
import { ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent implements OnInit {
  private CLIENT_EVENTS_PAGE_SIEZE = 10;
  @Input() client: Client;
  _clientEvents: ClientEvent[];
  length;
  @Input() set clientEvents(ce) {
    this._clientEvents = ce;
    this.length = ce.length;
    this.pager.setCollection(ce);
  }
  @Output() call = new EventEmitter<{ number: string }>();
  displayNotesCheckbox = false;
  pager = new Pager(this.CLIENT_EVENTS_PAGE_SIEZE);
  public expandedRow: string;
  constructor(private clientStateService: ClientStateService) {}
  get clientEventToDisplay() {
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
    console.log('change page', $event.page);
    this.pager.goToPage($event.page);
  }
  get showPager() {
    return this.length && this.length > this.CLIENT_EVENTS_PAGE_SIEZE;
  }
}

export class Pager<T> {
  private _data = new ReplaySubject(1);

  get data() {
    return this._data.asObservable();
  }

  constructor(private pageSize = 10, private pageNumber = 1, private collection?: T[]) {}

  next(): void {
    if (this.pageNumber < this.collection.length / this.pageSize) {
      return this.goToPage(this.pageNumber + 1);
    }
  }
  goToPage(pageNumber) {
    this.pageNumber = pageNumber;
    const result = this.collection.slice(this.pageSize * (this.pageNumber - 1), this.pageSize * this.pageNumber);
    this._data.next(result);
  }
  setCollection(collection: T[]) {
    this.collection = [...collection];
    this.goToPage(this.pageNumber);
  }

  previous() {
    if (this.pageSize > 1) {
      return this.goToPage(this.pageNumber - 1);
    }
  }
}
