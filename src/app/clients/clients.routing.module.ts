import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', children: [
            { path: '', pathMatch: 'full', loadChildren: './list/list.module#ListPageModule' },
            { path: 'list', loadChildren: './list/list.module#ListPageModule' },
            { path: 'detail', loadChildren: './detail/detail.module#DetailPageModule' },
            { path: 'new', loadChildren: './new/new.module#NewPageModule' },
            { path: 'edit', loadChildren: './edit/edit.module#EditPageModule' }
        ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class ClientsRoutingModule   {
}
