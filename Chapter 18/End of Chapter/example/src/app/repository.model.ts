import { Product } from "./product.model";
import { SimpleDataSource } from "./datasource.model";
import { Signal, WritableSignal, signal } from "@angular/core";
import { Injectable } from "@angular/core";

@Injectable()
export class Model {
    //private dataSource: SimpleDataSource;
    private products: WritableSignal<Product[]>;
    private locator = (p: Product, id: number | any) => p.id == id;

    constructor(private dataSource: SimpleDataSource) {
        //this.dataSource = new SimpleDataSource();
        this.products = signal(new Array<Product>());
        this.products.mutate(prods => 
            this.dataSource.getData().forEach(p => prods.push(p)));
    }

    get Products(): Signal<Product[]> {
        return this.products.asReadonly();
    }

    getProduct(id: number): Product | undefined {
        return this.products().find(p => this.locator(p, id));
    }

    saveProduct(product: Product) {
        if (product.id == 0 || product.id == null) {
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
