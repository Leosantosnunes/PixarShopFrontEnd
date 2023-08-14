import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BasePageComponent } from './base-page/base-page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CartSummaryComponent } from '../movie-store/cart-summary/cart-summary.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';



@NgModule({
    imports: [CommonModule, FormsModule, RouterLink],
    declarations: [BasePageComponent,FooterComponent,HeaderComponent,CartSummaryComponent],
    exports:[BasePageComponent,FooterComponent,HeaderComponent]
})
export class PartialsModule{

}