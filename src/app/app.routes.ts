import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { AppComponent } from './app.component';
import { ProductListComponent } from './pages/content-pages/product-list/product-list.component';
import { ProductOverviewComponent } from './pages/content-pages/product-overview/product-overview.component';
import { NewProductComponent } from './pages/content-pages/new-product/new-product.component';
import { OrderHistoryComponent } from './pages/content-pages/order-history/order-history.component';
import { ShoppingCartComponent } from './pages/content-pages/shopping-cart/shopping-cart.component';
import { CheckoutFormComponent } from './pages/content-pages/checkout-form/checkout-form.component';
import { usersGuard, adminGuard } from './services/users-guard';
import { UserManagementComponent } from './pages/content-pages/user-management/user-management.component';
import { UserlistComponent } from './components/user-list/user-list.component';
import { UpdateuserComponent } from './components/update-user/update-user.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'product-over-view/:id',
    component: ProductOverviewComponent,
  },
  {
    path: 'new-product',
    component: NewProductComponent,
    canActivate: [usersGuard],
  },

  { path: 'register', component: RegisterComponent },
  {
    path: 'product-list',
    component: ProductListComponent,
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    canActivate: [usersGuard],
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [usersGuard],
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [usersGuard],
  },
  {
    path: 'update/:id',
    component: UpdateuserComponent,
    canActivate: [adminGuard],
  },
  { path: 'users', component: UserlistComponent, canActivate: [adminGuard] },
  {
    path: 'checkout-form',
    component: CheckoutFormComponent,
    canActivate: [usersGuard],
  },
];
