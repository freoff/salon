import { Component, QueryList, Renderer2, ViewChildren } from '@angular/core';

import { IonItem, IonMenu, MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent } from '@angular/router';
import { ApplicationStateService } from './services/application-state.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent {
  private currentUrl;
  private mainMenu;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuController: MenuController,
    private applicationStateService: ApplicationStateService,
    public translateService: TranslateService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.translateService.setDefaultLang('pl');
      this.mainMenu = await this.menuController.get('mainMenu');
      this.applicationStateService.initializeAppData();
      this.splashScreen.hide();
      // this.router.events.subscribe((event: RouterEvent) => (this.currentUrl = event.url));
    });
  }

  changeRoute($event) {
    console.log($event);
    // this.mainMenu.close();
  }
}
