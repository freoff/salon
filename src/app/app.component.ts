import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ApplicationStateService } from './services/application-state.service';
import { TranslateService } from '@ngx-translate/core';
import { RxdbService } from './services/rxdb.service/rxdb.service';
import { APP_ROUTES } from './app-named-route';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent {
  private mainMenu;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuController: MenuController,
    private applicationStateService: ApplicationStateService,
    public translateService: TranslateService,
    private router: Router,
    private dbService: RxdbService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.translateService.setDefaultLang('pl');
      this.mainMenu = await this.menuController.get('mainMenu');
      this.applicationStateService.applicationReady().subscribe((ready) => this.applicationReady());
      this.applicationStateService
        .getApplicationLanguage()
        .pipe(
          filter((lang) => !!lang),
          distinctUntilChanged(),
          tap(console.log),
          tap((lang) => this.translateService.use(lang.toLowerCase())),
        )
        .subscribe();
      this.applicationStateService.initializeAppData();
    });
  }
  private async show() {
    await this.router.navigate(APP_ROUTES.clients.list);
    this.splashScreen.hide();
  }

  applicationReady() {
    console.log('Application ready, clients, settings loaded');
    this.splashScreen.hide();
  }
}
