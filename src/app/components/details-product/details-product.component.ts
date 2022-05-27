import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss'],
})
export class DetailsProductComponent implements OnInit {
  sub: any;
  id: string;
  product: Product;
  show = false;
  loading = true;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private prductService: ProductsService,
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id')!!;
    });
    this.prductService.getProduct(this.id).subscribe((data) => {
      this.product = data;
      this.loading = false;
    });
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
    this.show = true;
  }
}
