import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Client} from '../../../models/client.interface';
import {ClientStateService} from '../../../service/client-state.service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-lient-list-container',
  templateUrl: './lient-list-container.component.html',
  styleUrls: ['./lient-list-container.component.css']
})
export class LientListContainerComponent implements OnInit {
  filter = new BehaviorSubject('');
  allClients$ = this.clientStateService.getAllClients();
  clients$: Observable<Array<Client>>;
  constructor(private clientStateService: ClientStateService) { }

  ngOnInit() {
    this.prepereClientsStream();
  }
  setFilter(filter) {
    this.filter.next(filter);
  }
  showClient({ client }: { client: Client }) {
    this.clientStateService.showClientDetails({client});
  }
  private prepereClientsStream() {
    this.clients$ = combineLatest(
        this.filter.pipe(
            distinctUntilChanged(),
            debounceTime(500),
        ),
        this.allClients$,
    ).pipe(map(([filter, clients]) => this.filterClients(filter.toLowerCase(), clients)));
  }

  private filterClients(filter: string, clients: Array<Client>) {
    if (!filter || filter.length < 0) {
      return clients;
    } else {
      return clients.filter(
          (client) =>
              client.lname.toLocaleLowerCase().includes(filter) || client.fname.toLocaleLowerCase().includes(filter),
      );
    }
  }

}
