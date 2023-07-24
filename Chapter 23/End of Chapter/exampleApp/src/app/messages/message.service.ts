import { Injectable, signal } from "@angular/core";
import { Message } from "./message.model";

@Injectable()
export class MessageService {
    private writableMessages = signal<Message[]>([]);

    messages = this.writableMessages.asReadonly();

    reportMessage(msg: Message) {
        this.writableMessages.mutate(msgs => msgs.push(msg));
    }
}
