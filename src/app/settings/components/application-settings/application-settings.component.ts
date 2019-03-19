import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-application-settings',
  templateUrl: './application-settings.component.html',
  styleUrls: ['./application-settings.component.scss'],
})
export class ApplicationSettingsComponent implements OnInit {
  @Input() form: FormGroup;
  constructor() {}

  ngOnInit() {}


}
