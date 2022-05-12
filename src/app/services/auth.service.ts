import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = 'http://localhost:8080/auth/';

  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  // login user
  signInUser(user: User) {
    let requestBody = { email: user.Email, password: user.Password };
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.API_URL + 'signin', requestBody).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // creation nouveau compte
  signUpUser(user: User) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.API_URL + 'signup', user).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  autoNavigateIfLoggedIn() {
    if (this.isLoggedIn()) this.router.navigate(['/profil']);
  }

  // check si l'utilisateur est connecté
  isLoggedIn() {
    return this.tokenStorage.getToken() != null;
  }

  // logout
  signOut() {
    this.tokenStorage.signOut();
    this.router.navigate(['/auth']);
  }
}
