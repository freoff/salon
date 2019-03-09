import { NgModule } from '@angular/core';
import { ClientsRoutingModule } from './clients.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [IonicModule, ReactiveFormsModule, ClientsRoutingModule, SharedModule, TranslateModule.forChild()],
  exports: [],
  providers: [],
})
export class ClientsModule {}
