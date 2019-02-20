import { Component, OnInit } from '@angular/core';
import {namedRoute} from '../../layouts/side-menu/named.route';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public clientListUrl = namedRoute.clients.list;
  constructor() { }
    
  ngOnInit() {
  }

}
