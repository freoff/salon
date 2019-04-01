import { getAppVersion } from './../state/selectors/appliation.selectors';
import { ApplicationStateService } from './../services/application-state.service';
import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from '../app-named-route';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  defaultRoute = APP_ROUTES.clients.list;
  currentVersion = this.applicationStateService.getApplicationVersion().pipe(map(appVersion => appVersion.versionNumber));
  constructor(private applicationStateService: ApplicationStateService) {}

  ngOnInit() {}
}
