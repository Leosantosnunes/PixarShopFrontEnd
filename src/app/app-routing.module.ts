import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './auth/home/home.component';
import { LibraryComponent } from './pages/library/library.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MovieStoreComponent } from './movie-store/movie-store.component';
import { CheckOutComponent } from './movie-store/check-out/check-out.component';
import { CartDetailComponent } from './movie-store/cart-detail/cart-detail.component';
import { StoreFirstGuard } from './guards/storeFirst.guard';
import { SigninComponent } from './auth/signin/signin.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminRoutingModule } from './admin/admin/admin-routing.module';
import { AdminModule } from './admin/admin/admin.module';


const routes: Routes = [
  {path: 'home', component: HomeComponent}, 
  {path: 'login', component: LoginComponent },
  {path: 'register', component: SigninComponent },
  {path: 'movieStore', component: MovieStoreComponent, data:{title:'Store'}, canActivate:[AuthGuard]},
  {path: 'cart', component: CartDetailComponent, data:{title:'Shopping-Cart'}, canActivate:[AuthGuard]},
  {path: 'checkout', component: CheckOutComponent, data:{title:'CheckOut'}, canActivate:[AuthGuard]},
  {path: 'library', component: LibraryComponent, data:{title:'Library'},canActivate:[AuthGuard]},
  {path: 'about', component: AboutComponent, data:{title:'About'},canActivate:[AuthGuard]},
  {path: 'contact', component: ContactComponent, data:{title:'Contact Page'},canActivate:[AuthGuard]},
  {path: '', redirectTo: '/movieStore', pathMatch: 'full'},  
  //{ path: 'admin', loadChildren: () => import('./admin/admin/admin.module').then(m => m.AdminModule) },
  //{ path: 'admin', loadChildren: () => import('./admin/admin/admin-routing.module').then(m => m.AdminRoutingModule) },
  { path: 'admin',  loadChildren: ()  => AdminModule  },
  {path: '**', redirectTo: '/movieStore'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
