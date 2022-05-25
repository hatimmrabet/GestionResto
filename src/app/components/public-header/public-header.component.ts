import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.scss']
})
export class PublicHeaderComponent implements OnInit {

  constructor(private authService: AuthService, private shoppingCart: ShoppingCartService) { }

  isLoggedIn = false;
  nbItems$ = this.shoppingCart.cmd$;


  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  signOut() {
    this.isLoggedIn=false;
    this.authService.signOut();
  }

  nbItems() {
    return this.nbItems$.pipe(
      map(cmd => cmd.items.reduce((acc, item) => acc + item.quantity , 0))
    );
  }

}
