import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../../../models/client.interface';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  @Input() client: Client;
  constructor() { }

  ngOnInit() {
  }


}
