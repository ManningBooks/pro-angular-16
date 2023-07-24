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

    product(key: number): Product | undefined {
        return this.model.getProduct(key);
    }

    newProduct: Product = new Product();

    addProduct(p: Product) {
        this.model.saveProduct(p);
    }

    submitForm() {
        this.addProduct(this.newProduct);
    }    
}
