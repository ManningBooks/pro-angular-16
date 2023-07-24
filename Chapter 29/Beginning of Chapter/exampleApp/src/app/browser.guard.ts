import { Injectable } from "@angular/core";
import { PlatformService } from "./platform.service";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } 
    from "@angular/router";

@Injectable()
export class BrowserGuard {

    constructor(private router: Router, private ps: PlatformService) {}

    canActivate(route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot) {

        if (this.ps.isServer) {
            this.router.navigateByUrl("/");
            return false;
        }
        return true;
    }
}
