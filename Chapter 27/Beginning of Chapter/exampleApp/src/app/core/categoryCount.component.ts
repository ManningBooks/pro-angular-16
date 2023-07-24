import { Component, Signal, computed } from "@angular/core";
import { Model } from "../model/repository.model";

@Component({
    selector: "paCategoryCount",
    template: `<div class="bg-primary p-2 text-white">
                    There are {{ count() }} categories
               </div>`
})
export class CategoryCountComponent {
    count: Signal<number>;

    constructor(private model: Model) {
        this.count = computed(() => {
            return this.model.Products()
                .map(p => p.category)
            .filter((category, index, array) => 
                array.indexOf(category) == index)
            .length;            
        });
    }
}
