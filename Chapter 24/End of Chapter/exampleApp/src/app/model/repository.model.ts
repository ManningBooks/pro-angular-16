import { Injectable, Signal, computed, signal } from "@angular/core";
import { Product } from "./product.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class Model {
    private products = signal<Product[]>([]);
    private locator = (p: Product, id?: number) => p.id == id;

    constructor(private dataSource: RestDataSource) {
        this.dataSource.getData()
            .subscribe(data => this.products.set(data));
    }

    get Products(): Signal<Product[]> {
        return this.products;
    }

    getProduct(id: number): Product | undefined {
        return this.products().find(p => this.locator(p, id));
    }

    saveProduct(product: Product) {
        if (product.id == 0 || product.id == undefined) {
            this.dataSource.saveProduct(product)
                .subscribe(p => 
                    this.products.mutate(prods => prods.push(p)));
        } else {
            this.dataSource.updateProduct(product).subscribe(() => {
                this.products.mutate(prods => {
                    let index = prods.findIndex(p =>
                        this.locator(p, product.id));
                    prods.splice(index, 1, product);
                });    
            })
        }
    }

    deleteProduct(id: number) {
        this.dataSource.deleteProduct(id).subscribe(() => {
            this.products.mutate(prods => {
                let index = prods.findIndex(p => this.locator(p, id));
                if (index > -1) {
                    prods.splice(index, 1);
                }
            });
        });
    }

    // private generateID(): number {
    //     let candidate = 100;
    //     while (this.getProduct(candidate) != null) {
    //         candidate++;
    //     }
    //     return candidate;
    // }
}
