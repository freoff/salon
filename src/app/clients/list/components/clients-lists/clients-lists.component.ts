import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from '../../../models/client.interface';

@Component({
  selector: 'app-clients-lists',
  templateUrl: './clients-lists.component.html',
  styleUrls: ['./clients-lists.component.scss'],
})
export class ClientsListsComponent implements OnInit {
  @Input() clientLists: Array<Client>;
  @Output() showClient = new EventEmitter<{ client: Client }>();
  constructor() {}

  ngOnInit() {}

  onShowClient(client: Client) {

    this.showClient.emit({ client });
  }

    getImageForSex(client: Client) {
        return client.sex === 'female' ? '/assets/icon/woman-head-side-silhouette.svg' : '/assets/icon/boy-hair-shape.svg'
    }
}
