import { Component, Input, Signal, WritableSignal, computed, signal } 
    from "@angular/core";
import { Model } from "../model/repository.model";

@Component({
    selector: "paProductCount",
    template: `<div class="bg-info text-white p-2">
                    There are {{ count() }} products
               </div>`
})
export class ProductCountComponent {
    count: Signal<number>;
    categorySignal: WritableSignal<string|undefined> = signal(undefined);

    @Input()
    category?: string

    constructor(private model: Model) {
        this.count = computed(() => {
            return this.model.Products()
                .filter(p => this.categorySignal() == undefined 
                    || this.categorySignal() == p.category)
                .length;
        });
    }

    ngOnChanges() {
        this.categorySignal.set(this.category);
    }
}
