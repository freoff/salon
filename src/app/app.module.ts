import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StateModule } from './state/state.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SideMenuComponent } from './layouts/side-menu/side-menu.component';
import { ClientRepository } from './repository/client-repository';
import { RxdbClientRepository } from './repository/rxdb-client.repository';
import { RxdbService } from './services/rxdb.service';
import { EntityIdGeneratorService } from './services/entity-id-generator.service';
import {FlexLayoutModule} from '@angular/flex-layout';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, SideMenuComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StateModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RxdbService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    { provide: ClientRepository, useClass: RxdbClientRepository, deps: [RxdbService, EntityIdGeneratorService] },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
