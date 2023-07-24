import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule }
  from '@angular/platform-browser/animations';

import { ProductComponent } from './component';
import { PaAttrDirective } from "./attr.directive";
import { PaModel } from "./twoway.directive";

@NgModule({
  declarations: [
    ProductComponent, PaAttrDirective, PaModel
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [ProductComponent]
})
export class AppModule { }
