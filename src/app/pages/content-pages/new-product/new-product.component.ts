/**
 * Author: Khanjiguur A.
 * 
 * This component provides functionality for creating a new product. It includes a form for entering product details, 
 * options to add and upload product images, and methods to manage the product's data and its UI interactions.
 */

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { Product } from '../../../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  categories: { label: string; value: string }[] = [
    { label: 'Category 1', value: 'Category 1' },
    { label: 'Category 2', value: 'Category 2' },
    { label: 'Category 3', value: 'Category 3' },
  ];

  colors: { label: string; value: string }[] = [
    { label: 'Cyan', value: 'Cyan' },
    { label: 'Indigo', value: 'Indigo' },
    { label: 'Purple', value: 'Purple' },
    { label: 'Bluegrey', value: 'Bluegrey' },
  ];

  product: Product = new Product();

  addImageUrls: string[] = [];

  cntr: number = 0;

  displayStyle: string = 'block';
  displayStylee: string = 'none';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.product.price = 0;
  }

  // Handles form submission to create a new product.
  onSubmit() {
    this.productService.createProduct(this.product).subscribe((response) => {
      console.log('Product created:', response);
    });
    this.onDiscard();
  }

  // Adds an input field for a new image URL.
  addInput() {
    this.addImageUrls.push(this.product.imageUrls[this.cntr]);
    if (this.cntr < 3) {
      this.cntr++;
      this.product.imageUrls.push('');
      console.log(this.product.imageUrls[this.cntr] + 'r zurag');
    } else {
      this.displayStylee = 'none';
      console.log(this.product.imageUrls);
    }
  }

  // Handles the upload of product images.
  uploadImage() {
    console.log(this.product.imageUrls);
    this.cntr = 0;
    this.product.imageUrls = [''];
    this.displayStyle = 'none';
    this.displayStylee = 'block';
    console.log(this.product.stock);
  }

  onStockChange() {
    console.log(this.product.stock);
  }

  // Resets the product form and all associated fields.
  onDiscard() {
    this.product.name = '';
    this.product.category = '';
    this.product.price = 0;
    this.product.rating = 0;
    this.product.description = '';
    this.product.imageUrls = [];
    this.product.stock = false;
    this.product.sku = '';
    this.product.code = '';
    this.addImageUrls = [];
    console.log('Discarded');
  }
}
