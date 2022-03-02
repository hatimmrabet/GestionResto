import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  /** Tous les produits */
  private products: Product[] = [];

  addProduct(prod: Product) {
    this.products.push(prod);
  }

  getProducts() {
    return this.products;
  }

}
