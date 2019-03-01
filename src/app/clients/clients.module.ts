import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClientDetailsResolver } from './resolvers/client-details.resolver';
import { ClientStateService } from '../services/state/client-state.service';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import { ClientEventsComponent } from './shared/components/client-events/client-events.component';

@NgModule({
  declarations: [],
  imports: [IonicModule, ReactiveFormsModule, ClientsRoutingModule, SharedModule, TranslateModule.forChild()],
  exports: [],
  providers: [],
})
export class ClientsModule {}
