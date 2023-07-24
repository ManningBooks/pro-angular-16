import { Routes, RouterModule, mapToResolve, mapToCanActivate, 
    mapToCanActivateChild, mapToCanDeactivate } from "@angular/router";
import { TableComponent } from "./core/table.component";
import { FormComponent } from "./core/form.component";
import { NotFoundComponent } from "./core/notFound.component";
import { ProductCountComponent } from "./core/productCount.component";
import { CategoryCountComponent } from "./core/categoryCount.component";
import { ModelResolver } from "./model/model.resolver";
import { TermsGuard } from "./terms.guard";
import { UnsavedGuard } from "./core/unsaved.guard";
import { LoadGuard } from "./load.guard";
import { BrowserGuard } from "./browser.guard";

const childRoutes: Routes = [
    {   path: "",
        canActivateChild: mapToCanActivateChild([TermsGuard]),
        children: [{ path: "products", component: ProductCountComponent },
                   { path: "categories", 
                        component: CategoryCountComponent },
                   { path: "", component: ProductCountComponent }],
        resolve: { model: mapToResolve(ModelResolver) }
    }
];

const routes: Routes = [
    {
        path: "ondemand",
        canActivate: mapToCanActivate([BrowserGuard, LoadGuard]),
        loadChildren: () => import("./ondemand/ondemand.module")
                                .then(m => m.OndemandModule)
    },
    {
        path: "form/:mode/:id", component: FormComponent,
        canActivate: mapToCanActivate([BrowserGuard]),
        resolve: { model: mapToResolve(ModelResolver) },
        canDeactivate: mapToCanDeactivate([UnsavedGuard])
    },
    {
        path: "form/:mode", component: FormComponent,
        resolve: { model: ModelResolver },
        canActivate: mapToCanActivate([BrowserGuard, TermsGuard])
    },
    { path: "does", redirectTo: "/form/create", pathMatch: "prefix" },
    { path: "table", component: TableComponent, children: childRoutes },
    { path: "table/:category", component: TableComponent, 
        children: childRoutes },
    { path: "", redirectTo: "/table", pathMatch: "full" },
    { path: "**", component: NotFoundComponent }]

export const routing = RouterModule.forRoot(routes, {
    bindToComponentInputs: true,
    //initialNavigation: 'enabledBlocking'
});
