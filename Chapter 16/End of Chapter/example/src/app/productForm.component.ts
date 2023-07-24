import { Component, Output, EventEmitter } from "@angular/core";
import { Product } from "./product.model";

@Component({
    selector: "paProductForm",
    templateUrl: "productForm.component.html",
    //styles: ["div { background-color: lightgreen }"]        
    styleUrls: ["productForm.component.css"]    
})
export class ProductFormComponent {
    newProduct: Product = new Product();

    @Output("paNewProduct")
    newProductEvent = new EventEmitter<Product>();

    submitForm(form: any) {
        this.newProductEvent.emit(this.newProduct);
        this.newProduct = new Product();
        form.resetForm();
    }
}
