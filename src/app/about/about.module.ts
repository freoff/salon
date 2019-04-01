import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AboutPage } from './about.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AboutPage,
  },
];

@NgModule({
  imports: [SharedModule, FormsModule, IonicModule, RouterModule.forChild(routes), TranslateModule],
  declarations: [AboutPage],
})
export class AboutPageModule {}
