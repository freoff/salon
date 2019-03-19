import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {ApplicationState} from '../../../state/application/application.reducer';
import {ApplicationStateService} from '../../../services/application-state.service';

@Component({
  selector: 'app-application-settings-container',
  templateUrl: './application-settings-container.component.html',
  styleUrls: ['./application-settings-container.component.css']
})
export class ApplicationSettingsContainerComponent implements OnInit {

  $language;
  $currency;

  constructor(private state: ApplicationStateService) { }

  ngOnInit() {
  }

}
