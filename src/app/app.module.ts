import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
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
import { ProfilComponent } from './components/profil/profil.component';
import { AuthComponent } from './components/auth/auth.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivateSidebarComponent } from './components/private-sidebar/private-sidebar.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
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
    PrivateSidebarComponent,
    UsersListComponent,
    AllUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService, ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
