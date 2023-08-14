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
        //this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
        this.baseUrl = `https://pixarshop.onrender.com/`;
    }

    getMovies(): Observable<Movie[]>
    {

        return this.http.get<Movie[]>(this.baseUrl + 'movieStore');
    }

    addMovie(movie: Movie): Observable<Movie>
  {
    this.loadToken();
    return this.http.post<Movie>(this.baseUrl + 'movieStore/add', movie, this.httpOptions);
  }

    updateMovie(movie: Movie): Observable<Movie>
  {
    this.loadToken();
    return this.http.post<Movie>(`${this.baseUrl}movieStore/edit/${movie._id}`, movie, this.httpOptions);
  }

    deleteMovie(id: number): Observable<Movie>
  {
    this.loadToken();

    console.log(id);

    return this.http.get<Movie>(`${this.baseUrl}movieStore/delete/${id}`, this.httpOptions);
  }

    saveOrder(order: Order): Observable<Order>
    {
        return this.http.post<Order>(this.baseUrl + 'orders/add', order);
    }

    deleteOrder(id: number): Observable<Order>
    {
    this.loadToken();
    return this.http.get<Order>(`${this.baseUrl}orders/delete/${id}`, this.httpOptions);
    }

    updateOrder(order: Order): Observable<Order>
    {
      this.loadToken();
      return this.http.post<Order>(`${this.baseUrl}orders/edit/${order._id}`, order, this.httpOptions);
    }

    registerNewUser(user:User): Observable<any>
    {
        return this.http.post<any>(this.baseUrl + 'register', user);
    }    

    getCurrentUser(id:Number): Observable<User> {                   
        // Send a GET request to retrieve the current user's information
        return this.http.get<User>(`${this.baseUrl}library/${id}`, this.httpOptions);
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

    getOrders(): Observable<Order[]>
    {
        this.loadToken();
        return this.http.get<Order[]>(this.baseUrl + 'orders');
    }

    saveContact(contact: Contact): Observable<Contact>
    {
        return this.http.post<Contact>(this.baseUrl + 'contact/request', contact);
    }

    getContacts(): Observable<Contact[]>
    {
        return this.http.get<Contact[]>(this.baseUrl + 'contact')
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