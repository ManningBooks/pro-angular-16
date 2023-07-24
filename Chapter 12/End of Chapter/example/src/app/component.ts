import { Component, computed } from "@angular/core";
import { Model } from "./repository.model";
import { Product } from "./product.model";

@Component({
    selector: "app",
    templateUrl: "template.html"
})
export class ProductComponent {
    private model: Model = new Model();

    targetName: string = "Kayak";
 
    products = computed<Product[]>(() => this.model.Products());

    count = computed<number>(() => this.products().length);

    product(key: number): Product | undefined {
        return this.model.getProduct(key);
    }

    removeProduct() {
        this.model.deleteProduct(this.model.Products()[0].id ?? 0);
    }

    swapProduct() {
        let p = this.products()[0];
        if (p != null && p.id != null) {
            this.model.deleteProduct(p.id);
            this.model.saveProduct( { ...p, id: 0 });
        }
    }

    getKey(index: number, product: Product) {
        return product.name;
    }

    counter: number = 1;    

    get nextProduct(): Product | undefined {
        this.removeProduct();
        return this.products()[0];
    }

    getProductPrice(index: number): number {
        return Math.floor(this.product(index)?.price ?? 0);
    }
}
