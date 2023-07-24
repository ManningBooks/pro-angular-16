import { Component, Input, Signal, QueryList, ViewChildren, 
    ChangeDetectorRef } from "@angular/core";
import { Model } from "./repository.model";
import { Product } from "./product.model";
import { interval } from "rxjs";

@Component({
    selector: "paProductTable",
    templateUrl: "productTable.component.html"
})
export class ProductTableComponent {

    constructor(private changeRef: ChangeDetectorRef) {}

    @Input({ alias: "model", required: true})
    dataModel!: Model;

    get Products(): Signal<Product[]> {
        return this.dataModel.Products;
    }

    getProduct(key: number): Product | undefined {
        return this.dataModel?.getProduct(key);
    }

    deleteProduct(key: number) {
        this.dataModel.deleteProduct(key);
    }

    taxRate: number = 0;
    categoryFilter: string | undefined;
    itemCount: number = 3;

    // dateObject: Date = new Date(2020, 1, 20);
    // dateString: string = "2020-02-20T00:00:00.000Z";
    // dateNumber: number = 1582156800000;

    selectMap = {
        "Watersports": "stay dry", 
        "Soccer": "score goals",
        "other": "have fun"    
    }

    numberMap = {
       "=1": "one product",
       "=2": "two products",
       "other": "# products"
   }

   numbers = interval(1000);
}