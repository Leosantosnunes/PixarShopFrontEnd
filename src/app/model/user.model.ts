import { Injectable } from "@angular/core";
import { Movie } from "./movie.model";


//@Injectable()
export class User
{   
    username ?: String;
    password ?: String;
    displayName ?: String;
    email ?: String;
    _id ?: Number;
    movies ?: Movie[];
    
    

    constructor(){}
      
}