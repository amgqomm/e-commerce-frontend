/**
 * UpdateUserComponent
 * A component for updating user details.
 * 
 * Author: Enkh-Amgalan G.
 */

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateuserComponent implements OnInit {
  /**
   * Constructor for dependency injection.
   * @param authService Provides methods for user authentication and data retrieval.
   * @param router Handles navigation between routes.
   * @param route Accesses route parameters for dynamic routing.
   */
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  userId: any;
  userData: any = {};
  errorMessage: string = '';

  /**
   * Lifecycle hook called on component initialization.
   * Fetches user details by ID.
   */
  ngOnInit(): void {
    this.getUserById();
  }

  /**
   * Fetches user details based on the user ID from the route.
   */
  async getUserById() {
    this.userId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');

    // Validate if user ID and token are available
    if (!this.userId || !token) {
      this.showError('User ID or TOken is Required');
      return;
    }

    try {
      let userDataResponse = await this.authService.getUsersById(
        this.userId,
        token
      );
      const { name, email, role, city } = userDataResponse.ourUsers;
      this.userData = { name, email, role, city };
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  /**
   * Updates user details by calling the AuthService.
   */
  async updateUser() {
    const confitm = confirm('Are you sure you wanna update this user');
    if (!confirm) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      // Update user details via the AuthService
      const res = await this.authService.updateUSer(
        this.userId,
        this.userData,
        token
      );
      console.log(res);

      if (res.statusCode === 200) {
        this.router.navigate(['/users']);
      } else {
        this.showError(res.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  /**
   * Displays an error message for a limited duration.
   * @param mess The error message to display.
   */
  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
