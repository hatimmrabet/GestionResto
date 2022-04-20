import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../sevices/products.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  constructor(private productsService : ProductsService) { }

  ngOnInit(): void {
    this.productsService.addProduct(new Product("Burger",15.99));
    this.productsService.addProduct(new Product("cake",9));
    this.productsService.addProduct(new Product("chicken",10));
    this.productsService.addProduct(new Product("frites",20));
  }

  getAllProducts()
  {
    return this.productsService.getProducts();
  }

}
