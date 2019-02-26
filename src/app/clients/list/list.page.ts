import { Component, OnInit } from '@angular/core';
import { ClientStateService } from '../../services/state/client-state.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { Client } from '../models/client.interface';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { isEmpty } from 'underscore';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
