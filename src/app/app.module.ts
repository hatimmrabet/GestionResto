import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthService } from './services/auth.service';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { OneProductComponent } from './components/one-product/one-product.component';
import { ProductsService } from './services/products.service';
import { PublicHeaderComponent } from './components/public-header/public-header.component';
import { PublicAccueilComponent } from './components/public-accueil/public-accueil.component';
import { PublicFooterComponent } from './components/public-footer/public-footer.component';
import { PublicAccueilCarouselComponent } from './components/public-accueil/carousel/carousel.component';
import { PublicAccueilMenuComponent } from './components/public-accueil/menu/menu.component';
import { PublicAccueilPresentationComponent } from './components/public-accueil/presentation/presentation.component';
import { PublicAccueilGalleryComponent } from './components/public-accueil/gallery/gallery.component';
import { PublicAccueilContactComponent } from './components/public-accueil/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'auth/signup',
    component: SignupComponent,
  },
  { path: 'products', component: OneProductComponent },
  { path: 'index', component: PublicAccueilComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'profil',
    canActivate: [AuthGuardService],
    component: ProfilComponent,
  },
  { path: '**', redirectTo: 'index' },
];

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
    PublicAccueilContactComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, routerOptions),
  ],
  providers: [AuthService, ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
