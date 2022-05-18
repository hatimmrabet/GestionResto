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
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UsersService } from './services/users.service';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { GetProductsComponent } from './components/get-products/get-products.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { TestComponent } from './components/test/test.component';

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
    CreateUserComponent,
    CreateProductComponent,
    GetProductsComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSliderModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MatButtonModule, MatDatepickerModule,
    MatNativeDateModule, MatTableModule, MatPaginatorModule, MatAutocompleteModule, MatChipsModule,
  ],
  providers: [AuthService, ProductsService, UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
