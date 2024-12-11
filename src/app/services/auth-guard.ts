/**
 * Author: Enkh-Amgalan G.
 * 
 * This service acts as a route guard to control access to protected routes
 * based on the user's authentication status. If the user is not authenticated,
 * they are redirected to the login page.
 */

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router, 
    private authService: AuthService
  ) {}

  /**
   * Determines whether the route can be activated based on the user's authentication status.
   * 
   * @param route - The route that is being accessed.
   * @param state - The current router state.
   * @returns `true` if the user is authenticated; otherwise, redirects to the login page.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    }

    // Redirects to the login page and includes the attempted URL as a query parameter.
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
