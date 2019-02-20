import { Component, OnInit } from '@angular/core';
import {ClientStateService} from '../../../service/client-state.service';

@Component({
  selector: 'app-details-container',
  templateUrl: './details-container.component.html',
  styleUrls: ['./details-container.component.scss']
})
export class DetailsContainerComponent implements OnInit {

  selectedClient$ = this.clientStateService.getSelectedClient();

  constructor(private clientStateService: ClientStateService) { }

  ngOnInit() {
  }

}
