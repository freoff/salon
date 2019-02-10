import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListPage } from './list.page';
import { ClientsListsComponent } from './components/clients-lists/clients-lists.component';
import { ClientSearchInputComponent } from './components/client-search-input/client-search-input.component';
import { LientListContainerComponent } from './containers/lient-list-container/lient-list-container.component';

const routes: Routes = [
  {
    path: '',
    component: ListPage,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [ListPage, ClientsListsComponent, ClientSearchInputComponent, LientListContainerComponent],
})
export class ListPageModule {}
