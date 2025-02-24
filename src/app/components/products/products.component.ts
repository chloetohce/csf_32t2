import { Component, inject, OnInit, Output } from '@angular/core';
import { Order, Product } from '../../app.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  protected products: Product[] = [];

  private http = inject(HttpClient)
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
  private apiUrl = 'localhost:8080/api/products'

  @Output()
  order = new Subject<Order>()

  ngOnInit(): void {
    // Query REST API with array of products, and get price details. Should prob do this the other way around
    this.products = [
      {
        product:'apple',
        price: 1.4,
        quantity: 1,
        imageSrc: 'fruits/apple.png'
      },
      {
        product:'strawberry',
        quantity: 1,
        price: 2.3,
        imageSrc: 'fruits/strawberry.png'
      }
    ]
    console.log(this.products)
  }

  protected processOrder(item: Product, change: number) {
    const newOrder: Order = {
      ...item,
      change: change
    }
    this.order.next(newOrder)
  }
}
