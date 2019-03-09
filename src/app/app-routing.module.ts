import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  {
    path: 'secure',
    children: [
      {
        path: 'clients',
        loadChildren: './clients/clients.module#ClientsModule',
      },
    ],
  },
  {
    path: 'errors',
    children: [
      {
        path: 'client-not-found',
        loadChildren: './errors/no-client-error/no-client-error.module#NoClientErrorPageModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
