import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

const Modules = [CommonModule,  FlexLayoutModule];

@NgModule({
  declarations: [],
  imports: [...Modules],
  exports: [...Modules],
})
export class SharedModule {}
