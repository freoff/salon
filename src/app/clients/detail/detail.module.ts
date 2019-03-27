import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DetailPage} from './detail.page';
import {DetailsContainerComponent} from './container/details-container/details-container.component';
import {ClientDetailsComponent} from './components/client-details/client-details.component';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule as ClientSharedModule} from '../shared/shared.module';
import {PaginationModule} from 'ngx-bootstrap';
import {ClientDetailsClientNotesComponent} from './components/client-details-client-notes/client-details-client-notes.component';

const routes: Routes = [
  {
    path: '',
    component: DetailPage, children: [

    ]

  },
];

@NgModule({
  imports: [
    SharedModule,
    ClientSharedModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    PaginationModule,
  ],
  declarations: [DetailPage, DetailsContainerComponent, ClientDetailsComponent, ClientDetailsClientNotesComponent],
})
export class DetailPageModule {}
