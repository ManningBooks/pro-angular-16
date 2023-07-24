import { Component, Input, Signal, QueryList, ViewChildren, 
    ChangeDetectorRef } from "@angular/core";
import { Model } from "./repository.model";
import { Product } from "./product.model";
//import { PaCellColor } from "./cellColor.directive";

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

    // @ViewChildren(PaCellColor)
    // viewChildren: QueryList<PaCellColor> | undefined;
   
    // ngAfterViewInit() {
    //     this.viewChildren?.changes.subscribe(() => {
    //         this.updateViewChildren();
    //     });
    //     this.updateViewChildren();
    // }

    // private updateViewChildren() {
    //     this.viewChildren?.forEach((child, index) => {
    //         child.setColor(index % 2 ? true : false);
    //     });
    //     this.changeRef.detectChanges();        
    // }

    taxRate: number = 0;
    categoryFilter: string | undefined;
    itemCount: number = 3;
}