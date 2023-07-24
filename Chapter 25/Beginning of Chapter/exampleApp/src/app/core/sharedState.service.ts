import { Injectable, signal } from "@angular/core";

export enum MODES {
    CREATE, EDIT
}

export class State {
    constructor(public mode: MODES, public id?: number) {}
}

@Injectable()
export class SharedState {
    private stateVal = signal(new State(MODES.CREATE));

    get state() { return this.stateVal.asReadonly() };

    update(mode: MODES, id?: number) {
        this.stateVal.set(new State(mode, id));
    }
}
