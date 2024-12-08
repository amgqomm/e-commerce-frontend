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
  ngOnInit(): void {
    this.image = this.product.imageUrls ? this.product.imageUrls[0] : '';
  }
  constructor(private router: Router) {}

  navigateToCheckOutForm(): void {
    this.router.navigate(['/product-over-view', this.product.id]);
  }
}
