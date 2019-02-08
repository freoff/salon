import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ClientsRoutingModule} from './clients.routing.module';
import {ClientFormController} from './service/client-form.controller';
import {ReactiveFormsModule} from '@angular/forms';
import { ClientFormComponent } from './edit/components/client-form/client-form.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        ClientsRoutingModule
    ],
    exports: [],

})
export class ClientsModule {
}
