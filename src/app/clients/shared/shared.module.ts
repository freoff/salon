import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientEventsComponent } from './components/client-events/client-events.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ClientEventFormComponent } from './components/client-event-form/client-event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ClientEventsComponent, ClientEventFormComponent],
  exports: [ClientEventsComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    FlexModule,
  ],
  entryComponents: [ClientEventFormComponent]
})
export class SharedModule { }
