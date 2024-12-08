import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  async handleSubmit() {
    if (!this.email || !this.password) {
      this.showError('Email and Password is required');
      return;
    }

    try {
      const response = await this.authService.login(this.email, this.password);
      if (response.statusCode == 200) {
        console.log('Success');
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['product-over-view/1']);
        window.location.reload;
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
