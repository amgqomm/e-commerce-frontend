import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { Order } from '../../../models/order';
@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CheckboxModule, FormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css',
})
export class CheckoutFormComponent {
  order: Order = new Order();
  checked: boolean = false;
  checked1: boolean = false;
  constructor(private cartService: CartService) {}

  orderCart() {
    console.log(this.order);
    this.cartService.orderCart().subscribe((response) => {
      console.log('Cart ordered', response);
    });
  }
}
