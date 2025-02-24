import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Order } from '../../app.models';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnChanges {
  @Input()
  order!: Order;
  
  // Used to track changes in order
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['order'].firstChange) {
      console.log(changes['order'].currentValue)
    }
  }

}
