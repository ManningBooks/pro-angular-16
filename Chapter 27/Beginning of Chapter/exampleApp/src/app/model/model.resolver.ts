import { Injectable, effect } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } 
    from "@angular/router";
import { Model } from "./repository.model"
import { Product } from "./product.model";
import { MessageService } from "../messages/message.service";
import { Message } from "../messages/message.model";

@Injectable()
export class ModelResolver {
    private promise: Promise<Product[]>;

    constructor(private model: Model, private messages: MessageService) { 
        this.promise = new Promise((resolve) => {
            effect(() => {
                if (this.model.Products().length > 0) {
                    resolve(this.model.Products());
                }
            })
        });
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot) {
        this.messages.reportMessage(new Message("Loading data..."));                
        return this.promise;
    }
}
