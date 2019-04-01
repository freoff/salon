import { Component, OnInit } from '@angular/core';
import { State } from '../../state/reducers';
import { Store } from '@ngrx/store';
import { getTotalClients } from '../../state/selectors/clients.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  totalClients = this.store.select(getTotalClients);
  constructor(private store: Store<State>) {}

  ngOnInit(): void {}
}
