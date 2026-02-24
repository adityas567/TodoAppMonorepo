import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    SharedComponent
  ],
  imports: [
  ],
  exports: [
    SharedComponent,
    TranslateModule
  ]
})
export class SharedModule { }
