import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-public-accueil-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../public-accueil.component.scss', './menu.component.scss'],
})
export class PublicAccueilMenuComponent implements OnInit {

  productsByCategory: Record<string, Product[]>;
  active: string;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    // get products by categories
    this.productService.getProductsGroupByCategories().subscribe((res) => {
      this.productsByCategory = res;
      this.active = Object.keys(this.productsByCategory)[0];
      // console.log(this.productsByCategory);
    });
  }
}
