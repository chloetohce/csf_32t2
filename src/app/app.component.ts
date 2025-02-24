import { Component } from '@angular/core';
import { Cart, Order, Product } from './app.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'csf_32t2';

  order!: Order;

  cart: Cart = {
    name: '',
    address: '',
    cart: [],
    total: 0,
  };

  protected whenOrder(order: Order) {
    const temp = order;
    console.info(order);
    this.order = order;
    const product: Product = {
      ...order,
    };

    let currProduct = this.cart.cart.find((val) => val.product == order.product)

    if (currProduct) {
      currProduct.quantity += order.change;
    } else {
      this.cart.cart.push(product);
    }
    console.log(this.cart)
  }
}
