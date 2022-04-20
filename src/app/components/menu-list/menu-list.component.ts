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
  }

  getAllProducts()
  {
    return this.productsService.getProducts();
  }

}
