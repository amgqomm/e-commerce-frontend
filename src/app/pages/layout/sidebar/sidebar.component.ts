/**
 * Author: Enkh-Amgalan G.
 * 
 * This component represents the application sidebar. It dynamically adjusts its 
 * content based on the user's authentication and role (admin or regular user).
 */

import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { log } from 'console';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private readonly authService: AuthService) {}

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;

  /**
   * Lifecycle hook that initializes the component.
   * Sets the authentication and role statuses using AuthService.
   */
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log('isAuthenticated', this.isAuthenticated);
    this.isAdmin = this.authService.isAdmin();
    this.isUser = this.authService.isUser();
  }
}
