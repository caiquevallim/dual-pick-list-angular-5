import { NgModule } from '@angular/core';
import {DualPickListPipe} from "./pipe/dual-pick-list.pipe";

@NgModule({
  imports: [

  ],
  declarations: [
    DualPickListPipe
  ],
  exports:[
    DualPickListPipe
  ]
})
export class DualPickListModule { }
