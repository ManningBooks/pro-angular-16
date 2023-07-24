import { Injectable, Signal, computed } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class ProductRepository {
    products: Signal<Product[]>;
    categories: Signal<string[]>;

    constructor(private dataSource: StaticDataSource) {
        this.products = dataSource.products;
        this.categories = computed(() => {
            return this.dataSource.products()
                .map(p => p.category ?? "(None)")
                .filter((c, index, array) => 
                    array.indexOf(c) == index).sort();
        })
    }

    getProduct(id: number): Product | undefined {
        return this.dataSource.products().find(p => p.id == id);
    }
}
