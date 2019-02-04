import {Component, QueryList, Renderer2, ViewChildren} from '@angular/core';

import {IonItem, IonMenu, MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [
        `
            .footer {
              position: relative;
              bottom: 0;
              left: 0;
              right: 0;
              height: 50px;
            }
        `,
  ]
})
export class AppComponent {
  private currentUrl;
  private mainMenu;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuController: MenuController,
    private renderer: Renderer2,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.mainMenu =  await this.menuController.get('mainMenu');
      this.router.events.subscribe((event: RouterEvent) => this.currentUrl = event.url);
    });
  }

    changeRoute($event) {
        console.log($event);
        // this.mainMenu.close();
    }
}
