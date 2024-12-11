/**
 * Author: Khanjiguur A.
 * 
 * This component manages the checkout form functionality. It handles user input, displays checkbox options, and interacts with the CartService to process orders.
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart-service';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css',
})
export class CheckoutFormComponent {
  order: Order = new Order();
  checked: boolean = false;
  checked1: boolean = false;

  constructor(private cartService: CartService) {}

  // Processes the order by calling the orderCart method from CartService.
  orderCart() {
    console.log(this.order);
    this.cartService.orderCart().subscribe((response) => {
      console.log('Cart ordered', response);
    });
  }
}
