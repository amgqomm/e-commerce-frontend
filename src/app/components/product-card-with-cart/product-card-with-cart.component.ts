/**
 * ProductCardWithCartComponent
 * Displays a product card with options to select colors, view details, and add the product to the cart.
 * 
 * Author: Enkh-Amgalan G.
 */

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-product-card-with-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card-with-cart.component.html',
  styleUrl: './product-card-with-cart.component.css',
})
export class ProductCardWithCartComponent implements OnInit {
  @Input() product: Product = new Product();
  colors: string[] = ['Cyan', 'Indigo', 'Purple', 'Bluegrey'];
  @Input() selectedColor: string | undefined;
  selectedColorName: string | undefined;
  image: any;

  /**
   * Lifecycle hook called on component initialization.
   * Sets the default selected color and product image.
   */
  ngOnInit(): void {
    this.selectedColorName = this.selectedColor || this.colors[0];
    this.image = this.product.imageUrls ? this.product.imageUrls[0] : '';
  }

  /**
   * Constructor for dependency injection.
   * @param router Handles navigation between routes.
   * @param cartService Provides methods to interact with the cart.
   */
  constructor(private router: Router, private cartService: CartService) {}

  /**
   * Handles color selection when a user clicks on a color option.
   * @param color The color selected by the user.
   */
  onColorClick(color: string) {
    this.selectedColorName = color;
  }

  /**
   * Navigates to the product overview page for the current product.
   */
  navigateToCheckOutForm(): void {
    this.router.navigate(['/product-over-view', this.product.id]);
  }

  /**
   * Adds the product to the cart with a default quantity of 1.
   * @param productId The ID of the product to add to the cart.
   */
  addToCart(productId: any) {
    this.cartService.addToCart(productId, 1).subscribe(() => {
      console.log('Product added to cart');
    });
  }
}
