/**
 * Author: Khanjiguur A.
 * 
 * This component handles user registration functionality. It provides methods to manage user inputs and submission for registration. 
 * The component uses ReactiveFormsModule for form handling, AuthService for user registration logic, and Router for navigation.
 */

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formData: any = {
    name: '',
    email: '',
    password: '',
    role: '',
    city: '',
  };

  ngOnInit(): void {}

  errorMessage: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async handleSubmit() {
    // Check if all form fields are filled
    if (
      !this.formData.name ||
      !this.formData.email ||
      !this.formData.password ||
      !this.formData.role ||
      !this.formData.city
    ) {
      this.showError('Please fill in all fields.');
      return;
    }

    // Confirm user wants to register
    const confirmRegistration = confirm(
      'Are you sure you want to register this user?'
    );
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Call AuthService to register the user
      const response = await this.authService.register(this.formData, token);
      if (response.statusCode === 200) {
        this.router.navigate(['/users']);
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
