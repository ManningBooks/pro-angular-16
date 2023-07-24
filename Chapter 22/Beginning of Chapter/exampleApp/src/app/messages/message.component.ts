import { Component, Signal, computed } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
    selector: "paMessages",
    templateUrl: "message.component.html",
})
export class MessageComponent {
    lastMessage!: Signal<Message>;

    constructor(messageService: MessageService) {
        this.lastMessage = computed(() => {
            return messageService.messages()
                [messageService.messages().length -1];
        })
    }
}
