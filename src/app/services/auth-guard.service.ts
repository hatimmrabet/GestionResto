import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  API_URL = 'http://localhost:8080/auth/testJWT';

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  public getTokenHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    });
  }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    let TokenHeader = this.getTokenHeader();
    if (this.auth.isLoggedIn()) {
      return new Promise((resolve, reject) => {
        this.httpClient.get(this.API_URL, { headers: TokenHeader }).subscribe(
          () => {
            resolve(true);
          },
          () => {
            this.router.navigate(['/auth']);
            reject(false);
          }
        );
      });
    } else {
      console.log('pas connecté');
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
