import { Component } from "@angular/core";
import { Cart } from "../model/cart.model";
import { ConnectionService } from "../model/connection.service";

@Component({
    templateUrl: "cartDetail.component.html"
})
export class CartDetailComponent {

    constructor(public cart: Cart, 
        private connection: ConnectionService) {}

    get connected() {
        return this.connection.connected;
    }
}
