/**
 * Author: Khanjiguur A.
 * 
 * This component provides an overview of a specific product. It displays product details, 
 * allows users to view images, adjust the quantity, and add the product to their cart. 
 * The component interacts with ProductService for fetching product data and CartService for managing the cart.
 */

import { Component, OnInit, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product-service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    InputNumberModule,
    FormsModule,
    TabViewModule,
    ButtonModule,
  ],
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css'],
})
export class ProductOverviewComponent implements OnInit {
  id: number | undefined;
  product: any;
  images: string[] = [];
  selectedImage: string | undefined;
  counter: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  /**
   * Fetches product data by ID and initializes the product details and images.
   * @param id - The ID of the product to be loaded.
   */
  loadProductData(id: number): void {
    this.productService.getDataById(id).subscribe((response) => {
      this.product = response;
      this.images = this.product.imageUrls;
      this.selectedImage = this.images[0];
    });
  }

  ngOnInit() {
    // Subscribes to route parameters to get the product ID and loads the product data.
    this.selectedImage = this.images[0];
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.loadProductData(this.id);
    });
  }

  /**
   * Updates the currently selected image.
   * @param image - The image URL to be displayed.
   */
  selectImage(image: string): void {
    this.selectedImage = image;
  }

  increment() {
    this.counter++;
  }

  decrement() {
    if (this.counter > 1) this.counter--;
  }

  /**
   * Adds the product to the cart with the specified quantity.
   * @param productId - The ID of the product to add to the cart.
   */
  addToCart(productId: number) {
    console.log(productId);
    this.cartService.addToCart(productId, this.counter).subscribe(() => {
      console.log('Product added to cart');
      this.router.navigate(['/shopping-cart']);
    });
  }
}
