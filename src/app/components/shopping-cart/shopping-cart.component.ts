import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { Commande } from 'src/app/models/Commande.model';
import { Menu } from 'src/app/models/Menu.model';
import { Product } from 'src/app/models/product.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cmd : Commande;

  constructor(public shoppingCartService: ShoppingCartService) {
    this.shoppingCartService.getCommande().subscribe(
      (cmd) => {
        this.cmd = cmd;

      }
    );
  }

  ngOnInit(): void {
  }

  // get Menu products from article
  getProductsFromArticle(article: Article) : Product[]
  {
    let prod = article as Menu
    if(prod.produits)
      return prod.produits;
    else
      return []
  }

  clearCart() {
    this.shoppingCartService.clearCart()
  }

}
