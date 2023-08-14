import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/model/order.model';
import { OrderRepository } from 'src/app/model/order.repository';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  orderSent = false;
  submitted = false;

  constructor(public repository: OrderRepository, public order:Order){}


submitOrder(form: NgForm): void
{
  this.submitted = true;
  if (form.valid)
  {
    this.repository.saveOrder(this.order).subscribe(order => {
      this.order.clear();
      this.orderSent = true;
      this.submitted = false;
  });
  }
}
}