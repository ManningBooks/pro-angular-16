import { Injectable, Signal, signal } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class Model {
    private products = signal<Product[]>([]);
    private locator = (p: Product, id?: number) => p.id == id;

    constructor(private dataSource: StaticDataSource) {
        this.products.set(this.dataSource.getData());
    }

    get Products(): Signal<Product[]> {
        return this.products.asReadonly();
    }

    getProduct(id: number): Product | undefined {
        return this.products().find(p => this.locator(p, id));
    }

    saveProduct(product: Product) {
        if (product.id == 0 || product.id == undefined) {
            product.id = this.generateID();
            this.products.mutate(prods => prods.push(product));
        } else {
            this.products.mutate(prods => {
                let index = prods.findIndex(p =>
                    this.locator(p, product.id));
                prods.splice(index, 1, product);
            });
        }
    }

    deleteProduct(id: number) {
        this.products.mutate(prods => {
            let index = prods.findIndex(p => this.locator(p, id));
            if (index > -1) {
                prods.splice(index, 1);
            }
        });
    }

    private generateID(): number {
        let candidate = 100;
        while (this.getProduct(candidate) != null) {
            candidate++;
        }
        return candidate;
    }
}
