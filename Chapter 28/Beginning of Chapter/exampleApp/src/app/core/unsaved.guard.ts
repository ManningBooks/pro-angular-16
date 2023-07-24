import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } 
    from "@angular/router";
import { MessageService } from "../messages/message.service";
import { Message } from "../messages/message.model";
import { FormComponent } from "./form.component";

@Injectable()
export class UnsavedGuard {

    constructor(private messages: MessageService,
                private router: Router) { }

    canDeactivate(component: FormComponent, route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Promise<boolean> | boolean {
        if (component.editing && component.productForm.dirty) {
            return new Promise(resolve => {
                let responses: [string, (r: string) => void][] = [
                    ["Yes", () => resolve(true)],
                    ["No", () => {
                        this.router.navigateByUrl(this.router.url);
                        resolve(false);
                    }]
                ];
                this.messages.reportMessage(
                    new Message("Discard Changes?", true, responses));
            });
        }
        return true;
    }
}
