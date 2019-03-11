import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NoClientErrorPage } from './no-client-error.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: NoClientErrorPage,
  },
];

@NgModule({
  imports: [FormsModule, IonicModule, RouterModule.forChild(routes), SharedModule, TranslateModule.forChild()],
  declarations: [NoClientErrorPage],
})
export class NoClientErrorPageModule {}
