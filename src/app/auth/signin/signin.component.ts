import { Component } from '@angular/core';
import { AuthService } from 'src/app/model/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  public user : User = new User(); 
  public errorMessage ?: string;



  constructor(private router: Router, private auth:AuthService){}

  ngOnInit(): void {
    this.user = new User();    
  }

  registerUserForm(form: NgForm): void
  {
    if(form.valid)
    {
      this.auth.registerUser(this.user).subscribe(data =>{
        if(data.success){          
          this.router.navigateByUrl('/login');          
          console.log(data.user);
        }
      });      
    }
    else
    {
      this.errorMessage = "Form Data Invalid"
    }
  } 

}
