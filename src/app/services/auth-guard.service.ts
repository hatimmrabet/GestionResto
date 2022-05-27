import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  API_URL = 'http://localhost:8080/auth/testJWT';

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  public getTokenHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    });
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const currentUser = this.tokenStorage.getUser();
    if (currentUser) {
      // check if route is restricted by role
      if (route.data['roles'] && route.data['roles'].indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
