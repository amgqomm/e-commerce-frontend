/**
 * Author: Enkh-Amgalan G.
 * 
 * CartService handles all operations related to the user's shopping cart.
 * It includes adding items to the cart, placing orders, retrieving the active cart,
 * and deleting items from the cart.
 */

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

  /**
   * Adds a product to the user's shopping cart.
   * @param productId - The ID of the product to add.
   * @param quantity - The quantity of the product to add.
   * @returns An Observable of the HTTP response.
   */
  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/add?productId=${productId}&quantity=${quantity}`
    );
  }

  /**
   * Places an order with the items currently in the user's shopping cart.
   * @returns An Observable of the order creation response.
   */
  orderCart(): Observable<any> {
    return this.http.post(`${this.baseUrl}/order`, {});
  }

  /**
   * Retrieves the active shopping cart details for the current user.
   * @returns An Observable of the cart details.
   */
  getActiveCart(): Observable<any> {
    return this.http.get<CartDetails[]>(`${this.baseUrl}/active`);
  }

  /**
   * Deletes a specific item from the user's active shopping cart.
   * @param id - The ID of the cart item to delete.
   * @returns An Observable of the deletion response.
   */
  deleteCartItem(id: any) {
    return this.http.delete<CartDetails[]>(`${this.baseUrl}/active/${id}`);
  }
}
