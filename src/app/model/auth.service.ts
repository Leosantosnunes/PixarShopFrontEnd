import { Injectable} from "@angular/core";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";
import { JwtHelperService } from "@auth0/angular-jwt";

import { User } from "./user.model";

@Injectable()
export class AuthService
{   

    constructor(private datasource: RestDataSource){}

    authenticate(user: User): Observable<any>
    {          
        return this.datasource.authenticate(user);        
    }

    storeUserData(token:any,user:User): void
    {        
        this.datasource.storeUserData(token,user);        
    }    

    get authenticated(): Boolean
    {
        return this.datasource.loggedIn();                    
    }

    logout(): Observable<any>
    {
        return this.datasource.logout();
    }

    registerUser(user:User): Observable<any>
    {
        return this.datasource.registerNewUser(user);
    }
}

