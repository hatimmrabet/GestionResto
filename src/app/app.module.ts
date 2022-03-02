import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuListComponent } from './menu-list/menu-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuardService } from './sevices/auth-guard.service';
import { AuthService } from './sevices/auth.service';
import { ProductsService } from './products.service';
import { RouterModule, Routes } from '@angular/router';
import { OneProductComponent } from './menu-list/one-product/one-product.component';

const appRoutes : Routes = [
  { path: "auth/login", component: LoginComponent},
  { path: "auth/signup", component: SignupComponent},
  { path: "products", component: MenuListComponent},
  { path: "products/:id", component: OneProductComponent},
  { path: "**", redirectTo : "products"},

]

@NgModule({
  declarations: [
    AppComponent,
    MenuListComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    OneProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuardService,
    AuthService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
