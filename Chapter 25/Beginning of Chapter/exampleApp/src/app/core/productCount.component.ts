import { Component, Signal, computed } from "@angular/core";
import { Model } from "../model/repository.model";

@Component({
    selector: "paProductCount",
    template: `<div class="bg-info text-white p-2">
                    There are {{ count() }} products
               </div>`
})
export class ProductCountComponent {
    count: Signal<number>;

    constructor(private model: Model) {
        this.count = computed(() => {
            return this.model.Products().length;
        });
     }
}
