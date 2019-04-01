import { ApplicationStateService } from './../services/application-state.service';
import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from '../app-named-route';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  allTranslations = Array(4);
  defaultRoute = APP_ROUTES.clients.list;
  currentVersion = this.applicationStateService.getApplicationVersion().pipe(
    filter((appVersion) => !!appVersion),
    map((appVersion) => appVersion.versionNumber),
  );
  constructor(private applicationStateService: ApplicationStateService) {}

  ngOnInit() {}
}
