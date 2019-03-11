import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsResolver } from './resolvers/client-details.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', loadChildren: './list/list.module#ListPageModule' },
      { path: 'list', loadChildren: './list/list.module#ListPageModule' },
      { path: 'edit', loadChildren: './edit/edit.module#EditPageModule' },
      {
        path: ':clientId/edit',
        loadChildren: './edit/edit.module#EditPageModule',
        resolve: { client: ClientDetailsResolver },
      },
      {
        path: ':clientId',
        loadChildren: './detail/detail.module#DetailPageModule',
        resolve: { r: ClientDetailsResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [ClientDetailsResolver],
})
export class ClientsRoutingModule {}
