/**
 * CartItemsComponent
 * Component for displaying and managing individual cart items.
 * Includes functionality for adjusting item quantity and deleting items.
 * 
 * Author: Enkh-Amgalan G.
 */

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartDetails } from '../../models/cart-details';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent implements OnInit {
  @Input() product: Product = new Product();
  @Input() cart: CartDetails = new CartDetails();
  image: string = '';
  quantity: number = 1;

  constructor(private cartService: CartService) {}

  /**
   * Lifecycle hook called on component initialization.
   * Sets the image URL and quantity for the cart item.
   */
  ngOnInit() {
    this.image = this.product.imageUrls ? this.product.imageUrls[0] : '';
    this.quantity = this.cart.quantity ? this.cart.quantity : 1;
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) this.quantity--;
  }

  /**
   * Deletes the cart item by calling the cart service.
   * Logs a success or error message based on the outcome.
   */
  onDelete(): void {
    this.cartService.deleteCartItem(this.product.id).subscribe(
      () => {
        console.log('Component deleted successfully.');
      },
      (error) => {
        console.error('Error deleting component:', error);
      }
    );
  }
}
