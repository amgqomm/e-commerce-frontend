/**
 * Author: Khanjiguur A.
 * 
 * This component displays the shopping cart details, including active cart items, total price, 
 * and functionality to navigate to the checkout form. It interacts with CartService for managing cart data 
 * and ProductService for retrieving product information.
 */

import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartItemsComponent } from '../../../components/cart-items/cart-items.component';
import { Product } from '../../../models/product';
import { CartDetails } from '../../../models/cart-details';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, ButtonModule, CartItemsComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  products: Product[] = [];
  cartItems: CartDetails[] = [];
  activeCartProducts: Product[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetches the active cart details and updates the cart items.
    this.cartService.getActiveCart().subscribe((cartData: any) => {
      this.cartItems = cartData.cartDetails;
      this.updateActiveCartProducts();
    });

    // Fetches all products and updates the active cart products.
    this.productService.getProducts().subscribe((productData) => {
      this.products = productData;
      this.updateActiveCartProducts();
    });
  }

  /**
   * Updates the list of active cart products based on the fetched cart items and products.
   */
  updateActiveCartProducts(): void {
    if (this.products.length && this.cartItems.length) {
      this.activeCartProducts = this.products.filter((product) =>
        this.cartItems.some((item) => item.productId === product.id)
      );
      this.calculateTotalPrice();
    }
  }

  /**
   * Calculates the total price of all cart items.
   */
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => {
      const product = this.products.find((p) => p.id === item.productId);
      const quantity = item?.quantity ?? 1;
      return acc + (product?.price ?? 0) * quantity;
    }, 0);
  }

  /**
   * Navigates to the checkout form and orders the cart.
   */
  orderCart() {
    this.router.navigate(['/checkout-form']);
    this.cartService.orderCart().subscribe(() => {
      console.log('Cart ordered');
    });
  }

  /**
   * Retrieves cart details for a specific product ID.
   * @param productId - The ID of the product to fetch cart details for.
   * @returns The cart details for the specified product or a new CartDetails instance if not found.
   */
  getCartDetails(productId: any): CartDetails {
    const cartDetail = this.cartItems.find(
      (item) => item.productId === productId
    );
    return cartDetail || new CartDetails();
  }
}
