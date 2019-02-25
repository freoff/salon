import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DetailPage} from './detail.page';
import {DetailsContainerComponent} from './container/details-container/details-container.component';
import {ClientDetailsComponent} from './components/client-details/client-details.component';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [DetailPage, DetailsContainerComponent, ClientDetailsComponent]
})
export class DetailPageModule {}
