import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import {RadioButtonModule} from "primeng/radiobutton";
import { InputTextModule } from "primeng/inputtext";
import { TooltipModule } from "primeng/tooltip";
import { DividerModule } from "primeng/divider";
import { FloatLabelModule } from "primeng/floatlabel";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {TableModule} from 'primeng/table';



@NgModule({
    declarations: [],
    exports:[
       CardModule,
       CommonModule,
       ButtonModule,
       RadioButtonModule,
       InputTextModule,
       TooltipModule,
       DividerModule,
       FloatLabelModule,
       FormsModule,
       ReactiveFormsModule,
       ToastModule,
       TableModule
    ],
})

export class PrimeNgModule{}