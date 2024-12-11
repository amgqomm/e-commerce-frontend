/**
 * Author: Enkh-Amgalan G.
 *
 * ProductService handles all operations related to fetching, creating, and managing products.
 * It provides methods to retrieve the list of products, get top-rated products, get a product by its ID,
 * and create a new product.
 */

import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the list of all products.
   * @returns An Observable containing an array of `Product` objects.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  /**
   * Retrieves a list of top-rated products.
   * @returns An Observable containing an array of `Product` objects.
   */
  getTopRatedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/top-rated`);
  }

  /**
   * Retrieves the details of a specific product by its ID.
   * @param id - The ID of the product.
   * @returns An Observable containing the `Product` details.
   */
  getDataById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Creates a new product.
   * @param product - The `Product` object containing the product details.
   * @returns An Observable containing the newly created `Product`.
   */
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
}
