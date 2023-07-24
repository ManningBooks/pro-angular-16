import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { PlatformService } from "../platform.service";

@Injectable()
export class ConnectionService {
    private connectedSignal: WritableSignal<boolean>;
   
    constructor(ps: PlatformService) {
        this.connectedSignal = signal(ps.isServer 
            ? true : window.navigator.onLine);

        if (!ps.isServer) {
            window.addEventListener("online", e => 
                this.connectedSignal.set(window.navigator.onLine));
            window.addEventListener("offline", e => 
                this.connectedSignal.set(window.navigator.onLine));            
        }
    }

    get connected() : Signal<boolean> {
        return this.connectedSignal.asReadonly();
    }
}
