import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {ApplicationState} from '../../../state/application/application.reducer';
import {ApplicationStateService} from '../../../services/application-state.service';
import { ApplicationSettingsFormController } from '../../application-setting-form.controller';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-application-settings-container',
  templateUrl: './application-settings-container.component.html',
  styleUrls: ['./application-settings-container.component.css']
})
export class ApplicationSettingsContainerComponent implements OnInit {
  form = this.formController.getForm();
  stopSubscription = new Subject();
  $language;
  $currency;

  constructor(private state: ApplicationStateService, private formController: ApplicationSettingsFormController) { }

  ngOnInit() {
    this.formController.onChangeLanguage().pipe(
      takeUntil(this.stopSubscription),
      distinctUntilChanged(),
      tap(this.state.saveSettings.bind(this))
    );
  }

}
