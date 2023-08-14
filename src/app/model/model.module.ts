import {NgModule} from '@angular/core';
import { MovieRepository } from './movie.reposity';
import { Cart } from './cart.model';
import { HttpClientModule } from '@angular/common/http';
import { RestDataSource } from './rest.datasource';
import { Order } from './order.model';
import { OrderRepository } from './order.repository';
import { ContactRepository } from './contact.repository';
import { Contact } from './contact.model';
import { User } from './user.model';
import { AuthService } from './auth.service';
import { LibraryRepository } from './library.repository';

@NgModule({
    imports: [HttpClientModule],
    providers: [MovieRepository,Cart,Order,OrderRepository,RestDataSource,ContactRepository,Contact,User,AuthService, LibraryRepository]
})
export class ModelModule{}