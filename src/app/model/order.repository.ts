import { Injectable } from "@angular/core";
import { Order } from "./order.model";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";
import { User } from "./user.model";


@Injectable()
export class OrderRepository
{
    private orders : Order[] = [];
    private loaded = false;
    private user = String;
    
    

    constructor(private dataSource: RestDataSource){}

    loadOrders(): void
    {
        this.loaded = true;
        this.dataSource.getOrders().subscribe(orders => this.orders = orders);
    }


    getOrders(): Order[]
    {
       if(!this.loaded){
        this.loadOrders();
       }
       return this.orders;
    }

    saveOrder(order:Order): Observable<Order>
    {   
        const userString =  localStorage.getItem('user');
        if (typeof userString === 'string') {
            const userObject = JSON.parse(userString);
            const _id = userObject._id;
            console.log(_id);
            order.userID = _id;
          } else {
            console.error('Invalid user data in localStorage.');
          }
        return this.dataSource.saveOrder(order);
    }

    updateOrder(updatedOrder: Order): void
  {
    this.dataSource.updateOrder(updatedOrder).subscribe(order => {
      this.orders.splice(this.orders.findIndex(o => o._id === order._id), 1, order);
    });
  }

    deleteOrder(id: number): void
    {
      this.dataSource.deleteOrder(id).subscribe(order => {
        this.orders.splice(this.orders.findIndex(o => id === o._id), 1);
      });
    }

}