import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take,  } from 'rxjs';
import { Commande } from '../models/Commande.model';
import { CommandeItem } from '../models/CommandeItem';
import { Menu } from '../models/Menu.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {

  private itemsSubject = new BehaviorSubject<Commande>(new Commande());
  cmd$ = this.itemsSubject.asObservable();

  constructor() {
    let cmd : Commande = new Commande();
    let cart = localStorage.getItem('cart');
    if (cart === null) {
      cmd = new Commande();
      cmd.price = 0;
      cmd.items = [];
      localStorage.setItem('cart', JSON.stringify(cmd));
    }
    cmd = JSON.parse(localStorage.getItem('cart')!!);
    this.itemsSubject.next(cmd);
  }

  getCommande() {
    return this.cmd$;
  }

  addToCartProduct(product: Product) {
    this.cmd$.pipe(
      take(1),
      map((commande) => {
        // pour les produits en peux verifier si c'est le meme produit
        let i = commande.items.findIndex((item) => item.article === product);
        if( i === -1) {
          commande.items.push(new CommandeItem(product, 1));
        } else {
          commande.items[i].quantity++;
        }
        // console.log(commande.items);
        // à chaque ajout on ajoute le prix
        commande.price += product.price;
        localStorage.setItem('cart', JSON.stringify(commande));
      }),
    ).subscribe();
  }

  addToCartMenu(menu: Menu) {
    this.cmd$.pipe(
      take(1),
      map((commande) => {
        // pour lesmenus il faut verifier si c'est le meme menu et puis les produits qui existe dedans
        let i = commande.items.findIndex(
          (item) =>
            item.article.id === menu.id &&
            (<Menu>item.article).produits === menu.produits
        );
        if (i === -1) {
          commande.items.push(new CommandeItem(menu, 1));
        } else {
          commande.items[i].quantity++;
        }
        // console.log(commande);
        commande.price += menu.price;
        localStorage.setItem('cart', JSON.stringify(commande));
      }),
    ).subscribe();
  }



  clearCart() {
    this.cmd$.pipe(
      take(1),
      map((commande) => {
        commande.items = [];
        commande.price = 0;
        localStorage.setItem('cart', JSON.stringify(commande));
      }),
    ).subscribe();
  }

  getCartPrice() {
    return this.cmd$.pipe(
      take(1),
      map((commande) => {
        return commande.price;
      })
    );
  }

  getCartItemsSize() {
    return this.cmd$.pipe(
      map((commande) => {
        return commande.items.length;
      })
    )
  }



}


