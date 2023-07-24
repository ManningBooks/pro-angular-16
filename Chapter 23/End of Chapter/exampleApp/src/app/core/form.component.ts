import { Component } from "@angular/core";
import { FormArray, FormControl, FormGroup, NgForm, Validators }
    from "@angular/forms";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model"
import { Message  } from "../messages/message.model"
import { MessageService } from "../messages/message.service";
import { MODES, SharedState } from "./sharedState.service";
import { toObservable } from "@angular/core/rxjs-interop";
import { FilteredFormArray } from "./filteredFormArray";
import { LimitValidator } from "../validation/limit";
import { UniqueValidator } from "../validation/unique";
import { ProhibitedValidator } from "../validation/prohibited";

@Component({
    selector: "paForm",
    templateUrl: "form.component.html",
    styleUrls: ["form.component.css"]
})
export class FormComponent {
    product: Product = new Product();
    editing: boolean = false;

    keywordGroup = new FilteredFormArray([
        this.createKeywordFormControl()
    ], {
        validators: UniqueValidator.unique()
    });
  
    productForm: FormGroup = new FormGroup({
        name:  new FormControl("", {
            validators: [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern("^[A-Za-z ]+$")
            ],
            updateOn: "change"
        }),
        category: new FormControl("", { 
            validators: Validators.required,
            asyncValidators: ProhibitedValidator.prohibited() 
        }),
        price: new FormControl("", {
            validators: [
                Validators.required,
                Validators.pattern("^[0-9\.]+$"),
                LimitValidator.Limit(300)                
            ]
        }),
        keywords: this.keywordGroup
    });

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
            this.createKeywordFormControls(this.product.keywords?.length);
            this.productForm.reset(this.product);
            messageService.reportMessage(state.id
                ? new Message(`Editing ${this.product.name}`)
                    : new Message("Creating New Product"));
        });
    }

    submitForm() {
        if (this.productForm.valid) {
            Object.assign(this.product, this.productForm.value);
            this.model.saveProduct(this.product);
            this.product = new Product();
            this.productForm.reset();
        }
    }

    resetForm() {
        this.editing = true;
        this.product = new Product();
        this.productForm.reset();
    }

    createKeywordFormControls(count: number = 0) {
        this.keywordGroup.clear();
        for (let i = 0; i < count + 1; i++) {
            this.keywordGroup.push(this.createKeywordFormControl());
        }
    }

    createKeywordFormControl() {
        return new FormControl("", { 
            validators: Validators.pattern("^[A-Za-z ]+$") 
        });
    }
    
    addKeywordControl() {
        this.keywordGroup.push(this.createKeywordFormControl());
    }

    removeKeywordControl(index: number) {
        this.keywordGroup.removeAt(index);
    }     
}
