import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AllMenusComponent } from './components/all-menus/all-menus.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { AuthComponent } from './components/auth/auth.component';
import { CreateMenuComponent } from './components/create-menu/create-menu.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { DetailsMenuComponent } from './components/details-menu/details-menu.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OneProductComponent } from './components/one-product/one-product.component';
import { ProfilComponent } from './components/profil/profil.component';
import { PublicAccueilComponent } from './components/public-accueil/public-accueil.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ERole } from './models/ERole.model';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'products', component: OneProductComponent },
  { path: 'index', component: PublicAccueilComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'profil',
    canActivate: [AuthGuardService],
    component: ProfilComponent,
  },
  {
    path: 'all-users',
    canActivate: [AuthGuardService],
    data: { roles: [ERole.ADMIN, ERole.WORKER] },
    component: AllUsersComponent,
  },
  {
    path: 'all-products',
    canActivate: [AuthGuardService],
    data: { roles: [ERole.ADMIN, ERole.WORKER] },
    component: AllProductsComponent,
  },
  {
    path: 'all-menus',
    canActivate: [AuthGuardService],
    data: { roles: [ERole.ADMIN, ERole.WORKER] },
    component: AllMenusComponent,
  },
  {
    path: 'all-orders',
    canActivate: [AuthGuardService],
    data: { roles: [ERole.ADMIN, ERole.WORKER] },
    component: AllOrdersComponent,
  },
  {
    path: 'my-orders',
    canActivate: [AuthGuardService],
    component: MyOrdersComponent
  },
  {
    path: 'display-products',
    component: DisplayProductsComponent,
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
  {
    path: 'create-user',
    canActivate: [AuthGuardService],
    data: { roles: [ERole.ADMIN] },
    component: CreateUserComponent,
  },
  {
    path: 'create-product',
    canActivate: [AuthGuardService],
    data: { roles: [ERole.ADMIN, ERole.WORKER] },
    component: CreateProductComponent,
  },
  {
    path: 'create-menu',
    canActivate: [AuthGuardService],
    data: { roles: [ERole.ADMIN, ERole.WORKER] },
    component: CreateMenuComponent,
  },
  {
    path: 'edit-user/:id',
    canActivate: [AuthGuardService],
    data: { roles: [ERole.ADMIN] },
    component: EditUserComponent,
  },
  {
    path: 'edit-product/:id',
    canActivate: [AuthGuardService],
    data: { roles: [ERole.ADMIN, ERole.WORKER] },
    component: EditProductComponent,
  },
  {
    path: 'details-menu/:id',
    component: DetailsMenuComponent,
  },
  {
    path: 'details-product/:id',
    component: DetailsProductComponent,
  },
  { path: '**', redirectTo: 'index' },
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
