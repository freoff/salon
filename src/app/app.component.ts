import {Component, QueryList, Renderer2, ViewChildren} from '@angular/core';

import {IonItem, IonMenu, MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private mainMenu;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuController: MenuController,
    private renderer: Renderer2
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.mainMenu =  await this.menuController.get('mainMenu');

    });
  }

    changeRoute($event) {
        console.log($event);
        this.mainMenu.close();
    }
}
