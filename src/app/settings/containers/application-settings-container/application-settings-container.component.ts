import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../../../services/application-state.service';
import { ApplicationSettingsFormController } from '../../application-setting-form.controller';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';

@Component({
  selector: 'app-application-settings-container',
  templateUrl: './application-settings-container.component.html',
  styleUrls: ['./application-settings-container.component.css'],
})
export class ApplicationSettingsContainerComponent implements OnInit {
  form = this.formController.getForm();
  stopSubscription = new Subject();
  applicationLanguage$ = this.state.getApplicationLanguage();
  applicationCurrency$ = this.state.getApplicationCurrency();

  constructor(private state: ApplicationStateService, private formController: ApplicationSettingsFormController) {
    this.updateFormOnSettingsChange();
  }

  ngOnInit() {
    this.formController.onChangeLanguage().pipe(
      takeUntil(this.stopSubscription),
      distinctUntilChanged(),
      tap(this.state.saveSettings.bind(this)),
    );
  }

  saveSettings($event: any) {
    this.state.saveSettings(this.formController.getSettings());
  }

  private updateFormOnSettingsChange() {
    combineLatest(this.applicationLanguage$, this.applicationCurrency$).subscribe(([lang, currency]) =>
      this.formController.update(lang, currency),
    );
  }
  backupDb() {
    this.state.backupDB();
  }

  restore(jsonBackup: string) {
    this.state.restoreDB(jsonBackup);
  }
}
