import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'settings'},
    // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    {path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule'},
    {
        path: 'secure', children: [
            {
                //src/app/clients/clients.module.ts
                path: 'clients', loadChildren: './clients/clients.module#ClientsModule'
            }
        ]
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
