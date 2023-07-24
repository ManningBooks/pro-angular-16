import { Routes, RouterModule} from "@angular/router";
import { NotFoundComponent } from "./core/notFound.component";
import { SimpleComponent } from "./simple.component";

const routes: Routes = [
    { path: "", component: SimpleComponent },
    { path: "**", component: NotFoundComponent }]

export const routing = RouterModule.forRoot(routes, {
    bindToComponentInputs: true
});
