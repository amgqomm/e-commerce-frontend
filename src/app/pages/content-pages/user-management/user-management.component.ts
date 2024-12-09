import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
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

  async ngOnInit() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No Token Found');
      }

      this.profileInfo = await this.authService.getYourProfile(token);
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  updateProfile(id: string) {
    this.router.navigate(['/update', id]);
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
