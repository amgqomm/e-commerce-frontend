/**
 * Author: Enkh-Amgalan G.
 * 
 * This component represents the application header. It handles user authentication state, 
 * displays user-specific options (e.g., admin or regular user), and provides logout functionality. 
 * The header interacts with the AuthService to determine authentication and role status.
 */

import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AutoCompleteModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    RouterOutlet,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // Tracks whether the user is authenticated.
  isAuthenticated: boolean = false;

  // Indicates if the authenticated user has admin privileges.
  isAdmin: boolean = false;

  // Indicates if the authenticated user is a regular user.
  isUser: boolean = false;

  constructor(private readonly authService: AuthService) {}

  /**
   * Lifecycle hook that initializes the component.
   * Sets the authentication and role statuses using AuthService.
   */
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    this.isUser = this.authService.isUser();
  }

  /**
   * Logs the user out and resets authentication and role states.
   * Invokes the logout method from AuthService.
   */
  logout(): void {
    this.authService.logOut();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
  }
}
