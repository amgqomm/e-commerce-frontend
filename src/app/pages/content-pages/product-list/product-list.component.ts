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
  products: Product[] = [];
  products1: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getTopRatedProducts().subscribe((data) => {
      this.products = data;
    });
    this.productService.getProducts().subscribe((data) => {
      this.products1 = data;
    });
  }
}
