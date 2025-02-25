import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Cart, Order, Product } from '../../app.models';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnChanges, OnInit {
  
  private fb = inject(FormBuilder)
  protected form!: FormGroup

  @Input()
  order!: Order;

  @Input() cartInput!: Product[]

  cart!: FormArray;
  
  // Used to track changes in order
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['cartInput'].firstChange) {
      this.updateCart()
    }
  }

  ngOnInit(): void {
    this.form = this.createForm()
    this.updateCart();
    this.form.get('delivery')?.valueChanges.subscribe(val => {
      if (val == 'self-pickup') {
        this.form.get('address')?.disable();
      } else {
        this.form.get('address')?.enable();
      }
    })
  }

  get totalPrice(): number {
    return this.cart.controls.reduce((total, item) => total + (item.get('quantity')?.value ?? 0) * (item.get('price')?.value ?? 0), 0)
  }

  protected processForm() {
    console.info("Submitted order: ", this.form.value)
  }

  private updateCart(): void {
    // Create the cart FormArray based on cartInput
    this.cart = this.fb.array(this.cartInput.map(product =>
      this.fb.group({
        product: this.fb.control(product.product),
        quantity: this.fb.control(product.quantity),
        price: this.fb.control(product.price)
      }))
    );
    // Set the cart FormArray to the main form
    this.form.setControl('cart', this.cart);
  }

  private createForm() {
    return this.fb.group({
      name: this.fb.control<string>(''),
      address: this.fb.control<string>({value: '', disabled: false}),
      delivery: this.fb.control<string>('door-delivery'),
      cart: this.fb.array([])
    })
    
  }


}
