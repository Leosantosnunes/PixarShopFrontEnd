import { Injectable } from "@angular/core";


@Injectable()
export class Contact 
{    
    public _id ?: number;
    public name ?: string;
    public email ?: string;
    public message ?: string;

    clear(): void
    {
        this._id = undefined;
        this.name = '' ;
        this.email = '';
        this.message = '';        
    }
}