import { Component, computed } from "@angular/core";
import { Model } from "./repository.model";
import { Product } from "./product.model";

@Component({
    selector: "app",
    templateUrl: "template.html"
})
export class ProductComponent {
    private model: Model = new Model();
 
    products = computed<Product[]>(() => this.model.Products());

    count = computed<number>(() => this.products().length);

    classes = computed<string>(() => 
        this.count() == 5 ? "bg-success" : "bg-warning");

    getClasses(key: number) {
        return "p-2 " + (((this.products()[key].price ?? 0) > 50) 
            ? "bg-info" : "bg-warning");
    }        

    getClassMap(key: number): Object {
        let product = this.products()[key];
        return {
            "text-center bg-danger": product.name == "Kayak",
            "bg-info": (product.price ?? 0) < 50
        };
    }

    fontSizeWithUnits: string = "30px";
    fontSizeWithoutUnits: string= "30";

    getStyles(key: number) {
        return {
            fontSize: "30px",
            "margin.px": 100,
            color: (this.products()[key].price ?? 0) > 50 ? "red" : "green"
        };
    }
}
