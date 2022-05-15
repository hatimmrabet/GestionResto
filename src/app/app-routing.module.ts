import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { AuthComponent } from './components/auth/auth.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { GetProductsComponent } from './components/get-products/get-products.component';
import { OneProductComponent } from './components/one-product/one-product.component';
import { ProfilComponent } from './components/profil/profil.component';
import { PublicAccueilComponent } from './components/public-accueil/public-accueil.component';
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
    path: 'create-user',
    canActivate: [AuthGuardService],
    component: CreateUserComponent,
  },
  {
    path: 'all-users',
    canActivate: [AuthGuardService],
    component: AllUsersComponent,
  },
  {
    path: 'all-products',
    // canActivate: [AuthGuardService],
    component: GetProductsComponent,
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
