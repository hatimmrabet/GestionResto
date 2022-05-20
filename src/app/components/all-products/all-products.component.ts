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

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
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
}
