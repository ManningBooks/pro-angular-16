import { Component } from "@angular/core";
import { Model } from "./repository.model";

@Component({
    selector: "app",
    templateUrl: "template.html"
})
export class ProductComponent {
    private model: Model = new Model();

    get count() : number {
      return this.model.getProducts().length;
    }
}
