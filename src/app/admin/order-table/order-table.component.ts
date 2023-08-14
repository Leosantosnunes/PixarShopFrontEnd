import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { OrderRepository } from 'src/app/model/order.repository';

@Component({
  templateUrl: './order-table.component.html',
})
export class OrderTableComponent
{  

  constructor(private repository: OrderRepository,
              private router: Router) { }


  getOrders(): Order[]
  {
    return this.repository.getOrders();
  }  

  delete(id: number): void
  {
    if (confirm('Are you sure?'))
    {
      this.repository.deleteOrder(id);
    }
    else
    {
      this.router.navigateByUrl('/admin/orders');
    }
  }

}

