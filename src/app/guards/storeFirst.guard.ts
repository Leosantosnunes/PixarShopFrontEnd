import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { MovieStoreComponent } from "../movie-store/movie-store.component";

@Injectable()
export class StoreFirstGuard
{
    private firstNavigation = true;

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {        
        if(this.firstNavigation){
            this.firstNavigation = false;
            console.log(this.firstNavigation);
            if(route.component !== MovieStoreComponent){
                this.router.navigateByUrl('/movieStore');
                return false;
            }
        }
        return true;
    }

}