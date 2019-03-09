import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from '../../app-named-route';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public clientListUrl = APP_ROUTES.clients.list;
  constructor() {}

  ngOnInit() {}
}
