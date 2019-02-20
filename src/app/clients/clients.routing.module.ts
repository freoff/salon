import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientDetailsResolver} from './resolvers/client-details.resolver';
import {ClientStateService} from './service/client-state.service';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', loadChildren: './list/list.module#ListPageModule' },
      { path: 'list', loadChildren: './list/list.module#ListPageModule' },
      { path: 'edit', loadChildren: './edit/edit.module#EditPageModule' },
      { path: ':clientId', loadChildren: './detail/detail.module#DetailPageModule', resolve: {r: ClientDetailsResolver}},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [ClientStateService, ClientDetailsResolver]
})
export class ClientsRoutingModule {}
