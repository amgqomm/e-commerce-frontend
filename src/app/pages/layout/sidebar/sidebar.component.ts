import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { log } from 'console';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    TooltipModule,
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

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log('isAuthenticated', this.isAuthenticated);
    this.isAdmin = this.authService.isAdmin();
    this.isUser = this.authService.isUser();
  }
}
