import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Menu } from 'src/app/models/Menu.model';
import { Product } from 'src/app/models/product.model';
import { MenusService } from 'src/app/services/menus.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-details-menu',
  templateUrl: './details-menu.component.html',
  styleUrls: ['./details-menu.component.scss'],
})
export class DetailsMenuComponent implements OnInit, OnDestroy {
  sub: any;
  id: string;
  form: FormGroup;
  menu: Menu;
  productsByCategory: Record<string, Product[]> = {};
  show = false;
  loading = true;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private menuService: MenusService,
    private shoppingCartService: ShoppingCartService,
    private formBuilder: FormBuilder
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      produits: ['', [Validators.required]],
    });
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id')!!;
    });
    this.menuService.getMenu(this.id).subscribe((data) => {
      this.menu = data;
      this.menu.produits.forEach((product) => {
        if (!this.productsByCategory[product.categorie.name]) {
          this.productsByCategory[product.categorie.name] = [];
        }
        this.productsByCategory[product.categorie.name].push(product);
      });
      this.loading = false;
      // console.log(this.productsByCategory);
    });
  }

  canOrder() {
    let products = this.form.value.produits as Product[];
    let categories: string[] = [];
    if (products.length !== Object.keys(this.productsByCategory).length) {
      return false;
    } else {
      for (let i = 0; i < products.length; i++) {
        if (!categories.includes(products[i].categorie.name)) {
          categories.push(products[i].categorie.name);
        } else {
          return false;
        }
      }
    }
    return true;
  }

  addToCart() {
    let newMenu = this.menu;
    newMenu.produits = this.form.value.produits as Product[];
    this.shoppingCartService.addToCart(newMenu);
    this.show = true;
  }
}
