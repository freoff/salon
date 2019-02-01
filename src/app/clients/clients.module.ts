import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ClientsRoutingModule} from './clients.routing.module';
import {ClientFormController} from './client-form.controller';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ClientsRoutingModule
    ],

})
export class ClientsModule {
}
