import { NgModule } from "@angular/core";
import { StaticDataSource } from "./static.datasource";
import { Model } from "./repository.model";
import { HttpClientModule } from "@angular/common/http";
import { RestDataSource } from "./rest.datasource";
import { ModelResolver } from "./model.resolver";

@NgModule({
    imports: [HttpClientModule],
    providers: [Model, RestDataSource, ModelResolver]
})
export class ModelModule { }