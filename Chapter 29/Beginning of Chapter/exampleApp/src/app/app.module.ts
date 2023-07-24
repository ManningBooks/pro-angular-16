import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } 
    from '@angular/platform-browser';

//import { AppComponent } from './app.component';

import { ModelModule } from "./model/model.module";
import { CoreModule } from "./core/core.module";
import { TableComponent } from "./core/table.component";
import { FormComponent } from "./core/form.component";
import { MessageModule } from "./messages/message.module";
import { MessageComponent } from "./messages/message.component";
import { AppComponent } from './app.component';
import { routing } from "./app.routing";
import { TermsGuard } from "./terms.guard"
import { LoadGuard } from "./load.guard";
import { PlatformService } from './platform.service';
import { BrowserGuard } from './browser.guard';
import { SimpleComponent } from './simple.component';

@NgModule({
  declarations: [AppComponent, SimpleComponent],
  imports: [BrowserModule, ModelModule, CoreModule, MessageModule, 
                routing],
  providers: [TermsGuard, LoadGuard, provideClientHydration(), 
        PlatformService, BrowserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
