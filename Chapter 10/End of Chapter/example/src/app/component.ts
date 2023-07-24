import { Component, computed, effect, signal } from "@angular/core";
import { Model } from "./repository.model";
import { Ticker } from "./ticker.model";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "app",
    templateUrl: "template.html"
})
export class ProductComponent {
    private model: Model = new Model();
    private messages = ["Total", "Price"];
    private index = signal<number>(0);
    private ticker = new Ticker();
    tickerValue = toSignal(this.ticker.value, { initialValue: 0 });

    // constructor() {
    //     this.ticker.value.subscribe(newValue => 
    //         this.tickerValue = newValue);
    // }

    count = computed<number>(() => this.model.Products().length);

    countEffect = effect(() => 
        console.log(`count value computed: ${this.count()}`));
    
    get total(): string {
        let result = this.model.Products()
            .reduce((total, p) => total + (p.price ?? 0), 0).toFixed(2);
        console.log(`total value read: ${result}`);            
        return result;
    }

    message = computed<string>(() => 
        `${this.messages[this.index()]} $${this.total} ` 
            + ` Ticker: ${this.tickerValue()}`);

    messageEffect = effect(() => 
        console.log(`message value computed: ${this.message()},`));

    toggleMessage() {
        console.clear();        
        console.log("toggleMessage method invoked");
        this.index.update(currentVal => (currentVal + 1) % 2);
    }

    removeProduct() {
        console.clear();
        console.log("removeProduct method invoked");
        this.model.deleteProduct(this.model.Products()[0].id ?? 0);
    }
}
