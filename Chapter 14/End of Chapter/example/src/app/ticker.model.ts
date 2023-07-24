import { Observable, interval } from "rxjs";

export class Ticker {

    value: Observable<number> = interval(500);
}
