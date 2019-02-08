import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditPage } from './edit.page';
import { ClientFormContainerComponent } from './containers/client-form-container/client-form-container.component';
import {ClientFormComponent} from './components/client-form/client-form.component';
import { ClientFormFooterComponent } from './components/client-form-footer/client-form-footer.component';

const routes: Routes = [
  {
    path: '',
    component: EditPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [EditPage, ClientFormContainerComponent, ClientFormComponent, ClientFormFooterComponent],
})
export class EditPageModule {}
