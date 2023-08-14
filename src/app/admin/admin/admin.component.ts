import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';
import { AdminModule } from './admin.module';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private auth: AuthService,
    private router: Router) {console.log('test')}   

ngOnInit(): void {
    let test = this.auth.authenticated;
      console.log(test);
} 

logout(): void
{
    this.auth.logout();

    this.router.navigateByUrl('/home')
}
}

