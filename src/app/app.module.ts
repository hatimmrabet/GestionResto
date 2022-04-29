import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuardService } from './sevices/auth-guard.service';
import { AuthService } from './sevices/auth.service';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { OneProductComponent } from './components/one-product/one-product.component';
import { ProductsService } from './sevices/products.service';
import { PublicHeaderComponent } from './components/public-header/public-header.component';
import { PublicAccueilComponent } from './components/public-accueil/public-accueil.component';
import { PublicFooterComponent } from './components/public-footer/public-footer.component';
import { PublicAccueilCarouselComponent } from './components/public-accueil/carousel/carousel.component';
import { PublicAccueilMenuComponent } from './components/public-accueil/menu/menu.component';
import { PublicAccueilPresentationComponent } from './components/public-accueil/presentation/presentation.component';
import { PublicAccueilGalleryComponent } from './components/public-accueil/gallery/gallery.component';
import { PublicAccueilContactComponent } from './components/public-accueil/contact/contact.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes : Routes = [
  { path: "auth/signup", component: SignupComponent},
  { path: "products/:id", component: OneProductComponent},
  { path: "index", component: PublicAccueilComponent},
  { path: "login", component: LoginComponent},
  { path: "**", redirectTo : "index"},
]

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    OneProductComponent,
    PublicHeaderComponent,
    PublicAccueilComponent,
    PublicFooterComponent,
    PublicAccueilCarouselComponent,
    PublicAccueilMenuComponent,
    PublicAccueilPresentationComponent,
    PublicAccueilGalleryComponent,
    PublicAccueilContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, routerOptions)
  ],
  providers: [
    AuthGuardService,
    AuthService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
