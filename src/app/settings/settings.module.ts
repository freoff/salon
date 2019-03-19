import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ApplicationSettingsComponent } from './components/application-settings/application-settings.component';
import { ApplicationSettingsContainerComponent } from './containers/application-settings-container/application-settings-container.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
  },
];

@NgModule({
  imports: [SharedModule, FormsModule, IonicModule, RouterModule.forChild(routes), TranslateModule.forChild()],
  declarations: [SettingsPage, ApplicationSettingsComponent, ApplicationSettingsContainerComponent],
})
export class SettingsPageModule {}
