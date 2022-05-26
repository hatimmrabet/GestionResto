import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { Menu } from 'src/app/models/Menu.model';
import { Product } from 'src/app/models/product.model';
import { MenusService } from 'src/app/services/menus.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: [
    './display-products.component.scss',
    '../public-accueil/public-accueil.component.scss',
  ],
})
export class DisplayProductsComponent implements OnInit {
  menus: Menu[] = [];
  productsByCategory: Record<string, Article[]>;
  active: string;

  constructor(
    private productService: ProductsService,
    private menuService: MenusService,
    private shoppingCart: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.menuService.getMenus().subscribe((menus) => {
      this.menus = menus;
      this.active = 'Menu';
      // console.log(this.active);
    });

    this.productService.getProductsGroupByCategories().subscribe((res) => {
      this.productsByCategory = res;
      // console.log(this.productsByCategory);
    });
  }

  addToCart(product: Article) {
    this.shoppingCart.addToCart(product);
  }

  removeFromCart(product: Article) {
    this.shoppingCart.removeFromCart(product);
  }

  articleQuantity(product: Article) {
    return this.shoppingCart.articleQuantity(product);
  }
}
