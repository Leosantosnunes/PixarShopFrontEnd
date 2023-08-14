import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SigninComponent } from "./signin/signin.component";
import { ModelModule } from "../model/model.module";
import { FormsModule } from "@angular/forms";
import { AuthGuard } from "../guards/auth.guard";
import { CommonModule } from "@angular/common";
import { PartialsModule } from "../partials/partials.module";
import { AdminComponent } from "../admin/admin/admin.component";


@NgModule({
    imports: [RouterModule, ModelModule,CommonModule, FormsModule,PartialsModule],
    providers:[AuthGuard],
    declarations: [HomeComponent,LoginComponent,SigninComponent]    
})
export class AuthModule{};

