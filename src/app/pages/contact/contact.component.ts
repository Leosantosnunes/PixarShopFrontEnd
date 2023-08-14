import { Component } from '@angular/core';
import { Contact } from 'src/app/model/contact.model';
import { ContactRepository } from 'src/app/model/contact.repository';
import { ActivatedRoute } from '@angular/router';
import { BasePageComponent } from '../../partials/base-page/base-page.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends BasePageComponent{

  contactSent = false;
  submitted = false;


  constructor(route:ActivatedRoute, public repository: ContactRepository, public contact: Contact){
    super(route);
  }

  contactRequestSubmit(form:NgForm):void
  {
    this.submitted = true;    
    if(form.valid){
      console.log("test");
      this.repository.saveContact(this.contact).subscribe(contact =>  {
        this.contact.clear();
        this.contactSent = true;        
        this.submitted = false;        
    });
    }
  }

}
