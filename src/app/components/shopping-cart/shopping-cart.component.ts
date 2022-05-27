import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/models/Article';
import { Commande } from 'src/app/models/Commande.model';
import { Menu } from 'src/app/models/Menu.model';
import { Product } from 'src/app/models/product.model';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  form: FormGroup;
  cmd: Commande;
  selectedType = null;
  alert = {
    type: '',
    message: '',
  };

  constructor(
    public shoppingCartService: ShoppingCartService,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public TokenStorageService: TokenStorageService
  ) {
    this.form = this.formBuilder.group({
      type: ['', [Validators.required]],
    });

    this.shoppingCartService.getCommande().subscribe((cmd) => {
      this.cmd = cmd;
    });
    // console.log(this.cmd);
  }

  ngOnInit(): void {}

  // get Menu products from article
  getProductsFromArticle(article: Article): Product[] {
    let prod = article as Menu;
    if (prod.produits) return prod.produits;
    else return [];
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  addToCart(article: Article) {
    this.shoppingCartService.addToCart(article);
  }

  removeFromCart(article: Article) {
    this.shoppingCartService.removeFromCart(article);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  validateCart(cmd: Commande) {
    cmd.type = this.selectedType!!;
    cmd.client = this.TokenStorageService.getUser()!!;
    console.log(cmd);
    this.shoppingCartService.validateCart(cmd).subscribe(
      (cmd) => {
        // console.log('commande enregistrer');
        this.alert.type = 'success';
        this.alert.message = 'Votre commande N° ' + cmd.numero + ' a été enregistrer';
        this.clearCart();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
