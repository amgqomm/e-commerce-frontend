/**
 * Author: Khanjiguur A.
 * 
 * This component is responsible for displaying a list of products. It fetches and displays 
 * top-rated products as well as a complete list of products using the ProductService. 
 * The component utilizes custom product card components for rendering individual products.
 */

import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductCardWithCartComponent } from '../../../components/product-card-with-cart/product-card-with-cart.component';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product-service';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    CommonModule,
    DataViewModule,
    ProductCardWithCartComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  topProducts: Product[] = [];
  allProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Fetches and assigns top-rated products.
    this.productService.getTopRatedProducts().subscribe((data) => {
      this.topProducts = data;
    });
    
    // Fetches and assigns all available products.
    this.productService.getProducts().subscribe((data) => {
      this.allProducts = data;
    });
  }
}
