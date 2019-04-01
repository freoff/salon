import { Component, OnInit } from '@angular/core';
import { NavigationMenuItem, navigationMenuItems } from './side-menu-items';
import { ApplicationStateService } from '../../services/application-state.service';
import { Observable } from 'rxjs';
import { AppVersion } from '../../state/application/application.reducer';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  navigationItems: NavigationMenuItem = navigationMenuItems;
  appVersion$: Observable<AppVersion> = this.applicationStateService.getApplicationVersion()

  constructor(private applicationStateService: ApplicationStateService) {}

  ngOnInit() {}
}
