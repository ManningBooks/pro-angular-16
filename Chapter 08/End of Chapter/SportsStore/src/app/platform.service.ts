import { isPlatformServer } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable()
export class PlatformService {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    get isServer() { return isPlatformServer(this.platformId);}
}
