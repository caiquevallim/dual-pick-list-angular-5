import { NgModule } from '@angular/core';
import {DualPickListPipe} from "./pipe/dual-pick-list.pipe";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {PickListComponent} from "./pick-list.component";
import {DualPickListComponent} from "./dual-pick-list.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        PickListComponent,
        DualPickListPipe,
        DualPickListComponent

    ],
    exports:[
        DualPickListComponent,
        PickListComponent,
        DualPickListPipe
    ]
})
export class DualPickListModule { }
