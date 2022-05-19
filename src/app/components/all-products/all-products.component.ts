import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'categorie','ingredients','price','update','delete'];
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
