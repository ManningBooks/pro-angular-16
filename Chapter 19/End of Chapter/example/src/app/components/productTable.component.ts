import { Component, Input, Signal, QueryList, ViewChildren, 
    ChangeDetectorRef } from "@angular/core";
import { Model } from "../model/repository.model";
import { Product } from "../model/product.model";
import { interval } from "rxjs";
//import { DiscountService } from "./discount.service";

@Component({
    selector: "paProductTable",
    templateUrl: "productTable.component.html"
})
export class ProductTableComponent {

    constructor(private dataModel: Model) {}

    // @Input({ alias: "model", required: true})
    // dataModel!: Model;

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
}