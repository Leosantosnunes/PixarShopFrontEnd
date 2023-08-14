import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MovieStoreModule } from './movie-store/movie-store.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { JwtModule, JwtHelperService, JwtInterceptor } from '@auth0/angular-jwt';
import { AuthModule } from './auth/auth.module';
import { OrderTableComponent } from './admin/order-table/order-table.component';


export function jwtTokenGetter():string
{
  return localStorage.getItem('id_token')!;
}

@NgModule({
  declarations: [
    AppComponent,
    OrderTableComponent      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    MovieStoreModule,
    AuthModule,    
    PagesModule,  
    JwtModule.forRoot({config:{tokenGetter: jwtTokenGetter}})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
