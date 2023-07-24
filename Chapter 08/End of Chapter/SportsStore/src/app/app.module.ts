import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } 
    from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from "./store/store.module";
import { StoreComponent } from "./store/store.component";
import { CheckoutComponent } from "./store/checkout.component";
import { CartDetailComponent } from "./store/cartDetail.component";
import { RouterModule } from "@angular/router";
import { StoreFirstGuard } from "./storeFirst.guard";
import { BrowserAnimationsModule } 
    from '@angular/platform-browser/animations';
import { PlatformService } from './platform.service';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StoreModule,
    RouterModule.forRoot([
    {
        path: "store", component: StoreComponent,
        canActivate: [StoreFirstGuard]
    },
    {
        path: "cart", component: CartDetailComponent,
        canActivate: [StoreFirstGuard]
    },
    {
        path: "checkout", component: CheckoutComponent,
        canActivate: [StoreFirstGuard]
    },
    {
        path: "admin",
        loadChildren: () => import("./admin/admin.module")
            .then(m => m.AdminModule),
        canActivate: [StoreFirstGuard]
    },
    { path: "**", redirectTo: "/store" }
], {
    initialNavigation: 'enabledBlocking'
}),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })],
  providers: [StoreFirstGuard, provideClientHydration(), PlatformService],
  bootstrap: [AppComponent]
})
export class AppModule { }
