/**
 * Author: Khanjiguur A.
 * 
 * This component is responsible for managing user profiles. It retrieves the user's profile information, 
 * provides navigation for profile updates, and handles error display for user-related actions. 
 * It relies on AuthService for fetching profile data and Router for navigation.
 */

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  profileInfo: any;
  errorMessage: string = '';

  /**
   * Initializes the component by fetching the user's profile information.
   * Displays an error if the token is missing or the fetch fails.
   */
  async ngOnInit() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No Token Found');
      }

      // Fetches the user's profile information using the AuthService.
      this.profileInfo = await this.authService.getYourProfile(token);
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  /**
   * Navigates to the profile update page for the specified user ID.
   * @param id - The ID of the user whose profile needs to be updated.
   */
  updateProfile(id: string) {
    this.router.navigate(['/update', id]);
  }

  /**
   * Displays an error message for a specified duration.
   * @param mess - The error message to be displayed.
   */
  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
