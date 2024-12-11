/**
 * Author: Enkh-Amgalan G.
 * 
 * AuthService manages user authentication and authorization, including
 * login, registration, profile retrieval, role verification, and logout functionality.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  /**
   * Logs the user in by sending their email and password to the backend.
   * @param email - User's email.
   * @param password - User's password.
   * @returns A Promise resolving to the login response.
   */
  async login(email: string, password: string): Promise<any> {
    const url = `${this.BASE_URL}/auth/login`;
    try {
      const response = this.http
        .post<any>(url, { email, password })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Registers a new user with the provided data and token for authorization.
   * @param userData - Registration data.
   * @param token - Authorization token.
   * @returns A Promise resolving to the registration response.
   */
  async register(userData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/auth/register`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http
        .post<any>(url, userData, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves all users (Admin only).
   * @param token - Authorization token.
   * @returns A Promise resolving to the list of all users.
   */
  async getAllUsers(token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/get-all-users`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the profile information of the logged-in user.
   * @param token - Authorization token.
   * @returns A Promise resolving to the user's profile.
   */
  async getYourProfile(token: string): Promise<any> {
    const url = `${this.BASE_URL}/adminuser/get-profile`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a user's data by ID (Admin only).
   * @param userId - The ID of the user.
   * @param token - Authorization token.
   * @returns A Promise resolving to the user's data.
   */
  async getUsersById(userId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/get-users/${userId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes a user by ID (Admin only).
   * @param userId - The ID of the user to delete.
   * @param token - Authorization token.
   * @returns A Promise resolving to the deletion response.
   */
  async deleteUser(userId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/delete/${userId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http.delete<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates a user's data by ID (Admin only).
   * @param userId - The ID of the user to update.
   * @param userData - New data for the user.
   * @param token - Authorization token.
   * @returns A Promise resolving to the update response.
   */
  async updateUSer(userId: string, userData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/admin/update/${userId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = this.http
        .put<any>(url, userData, { headers })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logs the user out by removing authentication tokens from local storage.
   */
  logOut(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }

  /**
   * Checks if the user is authenticated.
   * @returns `true` if the user has a valid token; otherwise, `false`.
   */
  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  /**
   * Checks if the user is an admin.
   * @returns `true` if the user's role is ADMIN; otherwise, `false`.
   */
  isAdmin(): boolean {
    if (typeof localStorage !== 'undefined') {
      const role = localStorage.getItem('role');
      return role === 'ADMIN';
    }
    return false;
  }

  /**
   * Checks if the user is a standard user.
   * @returns `true` if the user's role is USER; otherwise, `false`.
   */
  isUser(): boolean {
    if (typeof localStorage !== 'undefined') {
      const role = localStorage.getItem('role');
      return role === 'USER';
    }
    return false;
  }
}
