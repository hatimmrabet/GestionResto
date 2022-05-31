import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  alert = { type: '', message: '' };

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    // afficher message d'alerte s'il y en a un
    if (localStorage.getItem('alert')) {
      this.alert = JSON.parse(localStorage.getItem('alert')!!);
      localStorage.removeItem('alert');
    }
    this.productsService.getProducts().subscribe((products) => {
      // console.log(products);
      this.products = products;
      this.collectionSize = this.products.length;
      this.refreshProducts();
    });
  }

  refreshProducts() {
    this.displayedProducts = this.products
      .map((product, i) => ({ _id: i + 1, ...product }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe(
      (res: any) => {
        this.products = this.products.filter((product) => product.id !== id);
        this.refreshProducts();
        this.alert = { type: 'success', message: res.response };
      },
      (err) => {
        console.log(err);
        this.alert = { type: 'danger', message: err.error.response };
      }
    );
  }
}
