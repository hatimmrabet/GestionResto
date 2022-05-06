import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.scss']
})
export class PublicHeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isLoggedIn = false;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  signOut() {
    this.isLoggedIn=false;
    this.authService.signOut();
  }

}
