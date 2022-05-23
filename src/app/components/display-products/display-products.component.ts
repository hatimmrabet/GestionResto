import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/Menu.model';
import { Product } from 'src/app/models/product.model';
import { MenusService } from 'src/app/services/menus.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss','../public-accueil/public-accueil.component.scss'],
})
export class DisplayProductsComponent implements OnInit {

  menus: Menu[] = [];
  productsByCategory: Record<string, Product[]>;
  active: string;

  constructor(private productService: ProductsService, private menuService: MenusService) {}

  ngOnInit(): void {
    this.menuService.getMenus().subscribe((menus) => {
      this.menus = menus;
      this.active = "Menu";
      // console.log(this.active);
    });

    this.productService.getProductsGroupByCategories().subscribe((res) => {
      this.productsByCategory = res;
      // console.log(this.productsByCategory);
    });
  }
}
