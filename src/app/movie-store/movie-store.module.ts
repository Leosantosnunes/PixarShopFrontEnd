import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { MovieStoreComponent } from './movie-store.component';
import { CounterDirective } from './counter.directive';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../partials/partials.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ ModelModule,FormsModule,CommonModule, RouterModule,PartialsModule],
    declarations: [MovieStoreComponent, CounterDirective, CartDetailComponent, CheckOutComponent],
    exports:[MovieStoreComponent,CounterDirective,CartDetailComponent,CheckOutComponent]
})
export class MovieStoreModule{

}