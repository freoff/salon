import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-application-settings',
  templateUrl: './application-settings.component.html',
  styleUrls: ['./application-settings.component.scss'],
})
export class ApplicationSettingsComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() saveSettings = new EventEmitter<any>();
  @Output() backupDB = new EventEmitter<void>();
  @Output() restore = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {
    this.form.valueChanges.subscribe(() => this.saveSettings.emit());
  }

  onApplicationSettingFormSubmit() {
    this.saveSettings.emit();
  }

  onSaveSettings() {}

  restoreBackup(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  fileSelected(ev) {
    let jsonString: any;
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      jsonString = fileReader.result;
      console.log(jsonString);
      this.restore.emit(jsonString);
    };
    fileReader.readAsText(ev.target.files[0]);
    console.log('file selected', ev);
  }
}
