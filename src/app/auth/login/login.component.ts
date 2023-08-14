import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/model/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public user : User = new User(); 
  public errorMessage ?: string;



  constructor(private router: Router, private auth:AuthService){}

  ngOnInit(): void {
    this.user = new User();    
  }

  authenticate(form: NgForm): void
  {
    if(form.valid)
    {
      this.auth.authenticate(this.user).subscribe(data =>{
        if(data.success){
          this.auth.storeUserData(data.token,data.user);
          if(this.user.username == 'adminTest')
          { 
            this.router.navigateByUrl('/admin');
          }
          else
          {
            this.router.navigateByUrl('/movieStore');
          }
          console.log(data.user);
        }
      });      
    }
    else
    {
      this.errorMessage = "Form Data Invalid"
    }
  } 
  
};
