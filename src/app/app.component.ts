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

  cart: Product[] = [];

  protected whenOrder(order: Order) {
    const temp = order;
    // console.info(order);
    this.order = order;
    const product: Product = {
      ...order,
    };

    let currProduct = this.cart.find((val) => val.product == order.product)

    if (currProduct) {
      currProduct.quantity += order.change;
    } else {
      product.quantity += order.change
      this.cart.push(product);
    }
    this.cart = this.cart.filter((val) => val.quantity > 0)
    console.log(this.cart)
  }
}
