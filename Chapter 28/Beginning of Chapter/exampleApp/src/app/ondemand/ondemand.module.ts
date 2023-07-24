import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OndemandComponent } from "./ondemand.component";
import { RouterModule } from "@angular/router";

let routing = RouterModule.forChild([
    { path: "", component: OndemandComponent }
]);

@NgModule({
    imports: [CommonModule, routing],
    declarations: [OndemandComponent],
    exports: [OndemandComponent]
})
export class OndemandModule { }
