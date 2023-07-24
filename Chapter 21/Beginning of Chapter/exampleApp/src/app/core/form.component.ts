import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model"
import { Message  } from "../messages/message.model"
import { MessageService } from "../messages/message.service";
import { MODES, SharedState } from "./sharedState.service";
import { toObservable } from "@angular/core/rxjs-interop";

@Component({
    selector: "paForm",
    templateUrl: "form.component.html",
    styleUrls: ["form.component.css"]
})
export class FormComponent {
    product: Product = new Product();
    editing: boolean = false;

    constructor(private model: Model, private stateService: SharedState,
            messageService: MessageService) {

        toObservable(stateService.state).subscribe(state => {
            this.editing = state.mode == MODES.EDIT;
            if (this.editing && state.id) {
                this.product = Product.fromProduct(
                    this.model.getProduct(state.id) ?? new Product()) ;
            } else {
                this.product = new Product;
            }
            messageService.reportMessage(state.id
                ? new Message(`Editing ${this.product.name}`)
                    : new Message("Creating New Product"));
        });
    }

    submitForm(form: NgForm) {
        if (form.valid) {
            this.model.saveProduct(this.product);
            this.product = new Product();
            this.stateService.update(MODES.CREATE);
            form.resetForm();
        }
    }
}
