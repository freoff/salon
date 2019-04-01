import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Nl2brPipe } from './pipes/nl2br.pipe';
import { MomentModule } from 'ngx-moment';
import { InputAutoFocusableDirective } from './directives/input-auto-focusable.directive';

const Modules = [CommonModule, FlexLayoutModule, MomentModule, ReactiveFormsModule];
@NgModule({
  declarations: [Nl2brPipe, InputAutoFocusableDirective],
  imports: [...Modules],
  exports: [...Modules, Nl2brPipe],
})
export class SharedModule {}
