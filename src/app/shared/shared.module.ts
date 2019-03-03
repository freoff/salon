import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Nl2brPipe } from './pipes/nl2br.pipe';

const Modules = [CommonModule,  FlexLayoutModule];

@NgModule({
  declarations: [Nl2brPipe],
  imports: [...Modules],
  exports: [...Modules, Nl2brPipe],
})
export class SharedModule {}
