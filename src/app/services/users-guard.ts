import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';
import { inject } from '@angular/core';

/**
 * Author: Enkh-Amgalan G.
 *
 * usersGuard is a route guard function that checks if the user is authenticated.
 * If authenticated, it allows the route navigation to proceed; otherwise, it redirects to the login page.
 */
export const usersGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isAuthenticated()) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};

/**
 * Author: Enkh-Amgalan G.
 *
 * adminGuard is a route guard function that checks if the user has an admin role.
 * If the user is an admin, it allows the route navigation; otherwise, it redirects to the login page.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isAdmin()) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};
