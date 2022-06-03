import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { Article } from '../models/Article';
import { Commande } from '../models/Commande.model';
import { CommandeItem } from '../models/CommandeItem';
import { Menu } from '../models/Menu.model';
import { Product } from '../models/product.model';
import { AuthGuardService } from './auth-guard.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  API = 'http://localhost:8080/commandes';

  private itemsSubject = new BehaviorSubject<Commande>(new Commande());
  cmd$ = this.itemsSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private authGuard: AuthGuardService
  ) {
    let cmd: Commande = new Commande();
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

  addToCart(article: Article) {
    this.cmd$
      .pipe(
        take(1),
        map((commande) => {
          let cmdItem: Article;
          // check if article is product or menu
          if((article as Product).ingredients){
            cmdItem = article as Product;
          }else{
            cmdItem = article as Menu;
          }
          // pour les produits en peux verifier si c'est le meme produit
          let i = commande.items.findIndex((item) =>
            _.isEqual(item.article, cmdItem)
          );
          if (i === -1) {
            commande.items.push(new CommandeItem(cmdItem, 1));
          } else {
            commande.items[i].quantity++;
          }
          // à chaque ajout on ajoute le prix
          commande.price = parseFloat((commande.price + cmdItem.price).toFixed(2));
          // console.log(commande.items);
          localStorage.setItem('cart', JSON.stringify(commande));
        })
      )
      .subscribe();
  }

  clearCart() {
    this.cmd$
      .pipe(
        take(1),
        map((commande) => {
          commande.items = [];
          commande.price = 0;
          localStorage.setItem('cart', JSON.stringify(commande));
        })
      )
      .subscribe();
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
    );
  }

  removeFromCart(article: Article) {
    this.cmd$
      .pipe(
        take(1),
        map((commande) => {
          let i = commande.items.findIndex((item) => _.isEqual(item.article, article));
          // article detecté
          if (i !== -1) {
            if (commande.items[i].quantity > 1) {
              commande.items[i].quantity--;
            } else {
              commande.items.splice(i, 1);
            }
            commande.price = parseFloat((commande.price - article.price).toFixed(2));
            localStorage.setItem('cart', JSON.stringify(commande));
          }
        })
      )
      .subscribe();
  }

  validateCart(cmd: Commande): Observable<Commande> {
    return this.httpClient.post<Commande>(this.API, cmd, {
      headers: this.authGuard.getTokenHeader(),
    });
  }

  articleQuantity(article: Article): Observable<number> {
    return this.cmd$.pipe(
      map((commande) => {
        // console.log(article)
        // check if article is product or menu
        let i : number;
        if ((article as Product).ingredients) {
          i = commande.items.findIndex((item) => _.isEqual(item.article, article) )
        } else {
          i = commande.items.findIndex((item) => _.isEqual(item.article, article) );
        }
        if (i !== -1) {
          return commande.items[i].quantity;
        } else {
          return 0;
        }
      })
    );
  }

}
