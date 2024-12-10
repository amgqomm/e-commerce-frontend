import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/Authentication/login/login.component';
import { RegisterComponent } from './pages/Authentication/register/register.component';
import { AppComponent } from './app.component';
import { ProductListComponent } from './pages/contentpages/product-list/product-list.component';
import { ProductOverviewComponent } from './pages/contentpages/product-overview/product-overview.component';
import { NewProductComponent } from './pages/contentpages/new-product/new-product.component';
import { OrderHistoryComponent } from './pages/contentpages/order-history/order-history.component';
import { ShoppingCartComponent } from './pages/contentpages/shopping-cart/shopping-cart.component';
import { CheckoutFormComponent } from './pages/contentpages/checkout-form/checkout-form.component';
import { usersGuard, adminGuard } from './services/users.guard';
import { UserManagementComponent } from './pages/contentpages/user-management/user-management.component';
import { UserlistComponent } from './component/user-list/user-list.component';
import { UpdateuserComponent } from './component/update-user/update-user.component';

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
