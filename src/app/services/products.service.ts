import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  API = 'http://localhost:8080/produits';

  constructor(private httpClient: HttpClient, private authGuardService: AuthGuardService) { }

  getProducts() : Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.API, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }

  getProduct(id: string) : Observable<Product> {
    return this.httpClient.get<Product>(`${this.API}/${id}`, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }

  createProduct(product: FormData) : Observable<Product> {
    return this.httpClient.post<Product>(this.API, product, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }

  editProduct(id: string, product: FormData) {
    return this.httpClient.put(`${this.API}/${id}`, product, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }

  getProductsGroupByCategories() : Observable<Record<string, Product[]>> {
    return this.httpClient.get<Record<string, Product[]>>(
      this.API + '/group-by-categories',
      {
        headers: this.authGuardService.getTokenHeader(),
      }
    );
  }

}
