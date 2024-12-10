import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartDetails } from '../models/cart-details';
import { Order } from '../models/order';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:8080/api/cart';
  constructor(private http: HttpClient) {}

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/add?productId=${productId}&quantity=${quantity}`
    );
  }

  orderCart(): Observable<any> {
    return this.http.post(`${this.baseUrl}/order`, {});
  }
  getActiveCart(): Observable<any> {
    return this.http.get<CartDetails[]>(`${this.baseUrl}/active`);
  }
  deleteCartItem(id: any) {
    return this.http.delete<CartDetails[]>(`${this.baseUrl}/active/${id}`);
  }
}
