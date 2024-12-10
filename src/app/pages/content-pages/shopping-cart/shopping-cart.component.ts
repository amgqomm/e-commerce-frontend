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
    this.cartService.getActiveCart().subscribe((cartData: any) => {
      this.cartItems = cartData.cartDetails;
      this.updateActiveCartProducts();
    });
    this.productService.getProducts().subscribe((productData) => {
      this.products = productData;
      this.updateActiveCartProducts();
    });
  }

  updateActiveCartProducts(): void {
    if (this.products.length && this.cartItems.length) {
      this.activeCartProducts = this.products.filter((product) =>
        this.cartItems.some((item) => item.productId === product.id)
      );
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => {
      const product = this.products.find((p) => p.id === item.productId);
      const quantity = item?.quantity ?? 1;
      return acc + (product?.price ?? 0) * quantity;
    }, 0);
  }

  orderCart() {
    this.router.navigate(['/checkout-form']);
    this.cartService.orderCart().subscribe(() => {
      console.log('Cart ordered');
    });
  }

  getCartDetails(productId: any): CartDetails {
    const cartDetail = this.cartItems.find(
      (item) => item.productId === productId
    );
    return cartDetail || new CartDetails();
  }
}
