import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.scss'],
})
export class GetProductsComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'categorie','ingredients','price'];
  dataSource = new MatTableDataSource<Product>(this.products);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.dataSource = new MatTableDataSource<Product>(this.products);

  }

  getAllProducts() {
    this.productsService.getProducts().subscribe((products) => {
      console.log(products);
      this.products = products;
      this.dataSource.data = products;
    });
  }


}
