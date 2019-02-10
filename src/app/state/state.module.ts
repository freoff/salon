import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {CustomSerializer} from './custom-router-serializer';
import {ClientPageEffects} from './clients/page/client-page.effects';

const APPLICATION_EFFECTS = [
    ClientPageEffects
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([...APPLICATION_EFFECTS]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({serializer: CustomSerializer}),
  ],
})
export class StateModule {}
