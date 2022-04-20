import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuardService } from './sevices/auth-guard.service';
import { AuthService } from './sevices/auth.service';
import { RouterModule, Routes } from '@angular/router';
import { OneProductComponent } from './components/menu-list/one-product/one-product.component';
import { ProductsService } from './sevices/products.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
