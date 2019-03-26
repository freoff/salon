import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditPage } from './edit.page';
import { ClientFormContainerComponent } from './containers/client-form-container/client-form-container.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientFormFooterComponent } from './components/client-form-footer/client-form-footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { ClientFormPhonesComponent } from './components/client-form-phones/client-form-phones.component';

const routes: Routes = [
  {
    path: '',
    component: EditPage,
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule.forChild(),
  ],
  declarations: [EditPage, ClientFormContainerComponent, ClientFormComponent, ClientFormFooterComponent, ClientFormPhonesComponent],
})


export class EditPageModule {}
