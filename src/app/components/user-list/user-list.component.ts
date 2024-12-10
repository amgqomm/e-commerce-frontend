/**
 * UserlistComponent
 * Displays a list of users and provides functionality to update or delete them.
 * 
 * Author: Enkh-Amgalan G.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserlistComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';

  /**
   * Constructor for dependency injection.
   * @param authService AuthService instance for handling user data requests.
   * @param router Router instance for navigation between routes.
   */
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  /**
   * Lifecycle hook called when the component initializes.
   * Fetches the list of users.
   */
  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Fetches all users from the backend and updates the `users` array.
   */
  async loadUsers() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.authService.getAllUsers(token);

      // Check if the response contains valid user data
      if (response && response.statusCode === 200 && response.ourUsersList) {
        this.users = response.ourUsersList;
      } else {
        this.showError('No users found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }


  /**
   * Deletes a user by ID after confirmation and reloads the user list.
   * @param userId ID of the user to be deleted.
   */
  async deleteUser(userId: string) {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.authService.deleteUser(userId, token);
        this.loadUsers();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  /**
   * Navigates to the update page for the specified user.
   * @param userId ID of the user to update.
   */
  navigateToUpdate(userId: string) {
    this.router.navigate(['/update', userId]);
  }

  /**
   * Displays an error message for a limited duration.
   * @param message The error message to display.
   */
  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}