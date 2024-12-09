import { Component, OnInit, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
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
  loadProductData(id: number): void {
    this.productService.getDataById(id).subscribe((response) => {
      this.product = response;
      this.images = this.product.imageUrls;
      this.selectedImage = this.images[0];
    });
  }
  ngOnInit() {
    this.selectedImage = this.images[0];
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.loadProductData(this.id);
    });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  increment() {
    this.counter++;
  }

  decrement() {
    if (this.counter > 1) this.counter--;
  }

  addToCart(productId: number) {
    console.log(productId);
    this.cartService.addToCart(productId, this.counter).subscribe(() => {
      console.log('Product added to cart');
      this.router.navigate(['/shopping-cart']);
    });
  }
}
