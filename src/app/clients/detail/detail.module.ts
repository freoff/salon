import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailPage } from './detail.page';
import {TranslateModule} from '@ngx-translate/core';
import { DetailsContainerComponent } from './container/details-container/details-container.component';
import {ClientDetailsComponent} from './components/client-details/client-details.component';

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
  declarations: [DetailPage, DetailsContainerComponent, ClientDetailsComponent]
})
export class DetailPageModule {}
