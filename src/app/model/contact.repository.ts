import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";
import { Contact } from "./contact.model";

@Injectable()
export class ContactRepository
{
    private contactList : Contact[] = [];
    private loaded = false;

    constructor(private dataSource: RestDataSource){}

    loadContactRequests(): void
    {
        this.loaded = true;
        this.dataSource.get("contact").subscribe(contactList => this.contactList = contactList);
    }


    getContactRequests(): Contact[]
    {
       if(!this.loaded){
        this.loadContactRequests();
       }
       return this.contactList;
    }

    saveContact(contact:Contact): Observable<Contact>
    {
        return this.dataSource.post("contact/request",contact);
    }
}
