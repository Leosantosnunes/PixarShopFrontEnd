import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { Movie } from "./movie.model";
import { Order } from "./order.model";
import { Contact } from "./contact.model";
import { Cart } from "./cart.model";
import { User } from "./user.model";
import { map } from "rxjs";
import {JwtHelperService} from '@auth0/angular-jwt';

const PROTOCOL = 'http';
const PORT = 3500;



@Injectable()
export class RestDataSource
{
    user ?: User;
    baseUrl: string = '';
    authToken : string = '';

    private httpOptions =
    {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        })
    };

    constructor(private http: HttpClient, private jwtService: JwtHelperService)
    {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
        //this.baseUrl = `https://pixarshop.onrender.com/`;
    }

    get(path: string, id?:number): Observable<any> {
      this.loadToken();

      const fullPath = id ? `${path}/${id}` : path;

      return this.http.get<any>(this.baseUrl + fullPath, this.httpOptions);
    }

    post(path: string, data: any, bool?: boolean): Observable<any> {
      this.loadToken();

      const fullPath = bool ? `${path}/${data._id}` : path;
      return this.http.post<any>(this.baseUrl + fullPath, data, this.httpOptions);
    }

    authenticate(user:User): Observable<any>
    {
        return this.http.post<any>(this.baseUrl + 'login', user,this.httpOptions);
    }

    storeUserData(token:any, user: User): void
    {
        this.user = user;
        localStorage.setItem('id_token', 'Bearer ' + token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    displayUserID(): Number
    {
        return this.user?._id!;
    }

    logout(): Observable<any>
    {
        this.authToken = null!;
        this.user = null!;
        localStorage.clear();

        return this.http.get<any>(this.baseUrl + 'logout', this.httpOptions);
    }

    loggedIn():Boolean
    {
        this.loadToken();
        return !this.jwtService.isTokenExpired(this.authToken);

    }

    private loadToken(): void {
        const token = localStorage.getItem('id_token');
        this.authToken = token || ''; // Assign an empty string if token is null
        this.httpOptions.headers = this.httpOptions.headers.set(
          'Authorization',
          this.authToken
        );
      }
}
