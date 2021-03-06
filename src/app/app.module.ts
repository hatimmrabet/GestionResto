import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ProductsService } from './services/products.service';
import { PublicHeaderComponent } from './components/public-header/public-header.component';
import { PublicAccueilComponent } from './components/public-accueil/public-accueil.component';
import { PublicFooterComponent } from './components/public-footer/public-footer.component';
import { PublicAccueilCarouselComponent } from './components/public-accueil/carousel/carousel.component';
import { PublicAccueilMenuComponent } from './components/public-accueil/menu/menu.component';
import { PublicAccueilGalleryComponent } from './components/public-accueil/gallery/gallery.component';
import { PublicAccueilContactComponent } from './components/public-accueil/contact/contact.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AuthComponent } from './components/auth/auth.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivateSidebarComponent } from './components/private-sidebar/private-sidebar.component';
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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { AllMenusComponent } from './components/all-menus/all-menus.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { CreateMenuComponent } from './components/create-menu/create-menu.component';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { DetailsMenuComponent } from './components/details-menu/details-menu.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditMenuComponent } from './components/edit-menu/edit-menu.component';
import { AllIngredientsComponent } from './components/all-ingredients/all-ingredients.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PublicHeaderComponent,
    PublicAccueilComponent,
    PublicFooterComponent,
    PublicAccueilCarouselComponent,
    PublicAccueilMenuComponent,
    PublicAccueilGalleryComponent,
    PublicAccueilContactComponent,
    ProfilComponent,
    PrivateSidebarComponent,
    AllUsersComponent,
    CreateUserComponent,
    CreateProductComponent,
    AllProductsComponent,
    AllMenusComponent,
    CreateMenuComponent,
    DisplayProductsComponent,
    ShoppingCartComponent,
    DetailsMenuComponent,
    DetailsProductComponent,
    AllOrdersComponent,
    MyOrdersComponent,
    EditUserComponent,
    EditProductComponent,
    EditMenuComponent,
    AllIngredientsComponent,
    AllCategoriesComponent,
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
    MatNativeDateModule, MatTableModule, MatPaginatorModule, MatAutocompleteModule, MatChipsModule, MatListModule, MatTabsModule,
  ],
  providers: [AuthService, ProductsService, UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
