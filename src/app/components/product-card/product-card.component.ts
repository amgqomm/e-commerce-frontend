/**
 * ProductCardComponent
 * This component is responsible for displaying product details in a card format.
 * It also includes navigation functionality to the product overview page.
 * 
 * Author: Enkh-Amgalan G.
 */

import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [CommonModule, RouterModule],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product = new Product();
  image: any;

  /**
   * Angular lifecycle hook executed on component initialization.
   * Sets the `image` property to the first image URL from the product's list of images, if available.
   */
  ngOnInit(): void {
    this.image = this.product.imageUrls ? this.product.imageUrls[0] : '';
  }

  constructor(private router: Router) {}

  /**
   * Navigates to the product overview page with the product ID in the route.
   */
  navigateToCheckOutForm(): void {
    this.router.navigate(['/product-over-view', this.product.id]);
  }
}
