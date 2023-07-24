import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//import { AppComponent } from './app.component';
import { BrowserAnimationsModule }
  from '@angular/platform-browser/animations';

import { ProductComponent } from './component';
import { ProductTableComponent } 
    from "./components/productTable.component";
import { ProductFormComponent } from "./components/productForm.component";
// import { PaToggleView } from "./toggleView.component";

import { LOCALE_ID } from "@angular/core";
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

// import { PaDiscountDisplayComponent } from "./discountDisplay.component";
// import { PaDiscountEditorComponent } from "./discountEditor.component";
import { ModelModule } from './model/model.module';
import { CommonModule } from "./common/common.module";
import { ComponentsModule } from './components/components.module';

registerLocaleData(localeFr);

@NgModule({
  declarations: [ProductComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, 
    ModelModule, 
    CommonModule, 
    ComponentsModule
  ],
  //providers: [DiscountService],
  bootstrap: [ProductFormComponent, ProductTableComponent]
})
export class AppModule { }
