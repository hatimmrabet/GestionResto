import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  /** Tous les produits */
  private products: Product[] = [
    new Product('Burger', 15.99),
    new Product('Frites', 2.99),
    new Product('Pizza', 10.99),
    new Product('chicken', 10),
  ];

  addProduct(prod: Product) {
    this.products.push(prod);
  }

  getProducts() {
    return this.products;
  }

}
