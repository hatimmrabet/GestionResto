import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  API_URL = 'http://localhost:8080/auth/testJWT';

  constructor(
    private tokenStorage: TokenStorageService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  public getTokenHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.httpClient
      .get(this.API_URL, { headers: this.getTokenHeader() })
      .pipe(
        map(() => {
          const currentUser = this.tokenStorage.getUser();
          if (currentUser) {
            // check if route is restricted by role
            if (
              route.data['roles'] &&
              route.data['roles'].indexOf(currentUser.role) === -1
            ) {
              console.log('access denied');
              // role not authorised so redirect to home page
              this.router.navigate(['/']);
              return false;
            }
            console.log('access granted');
            // authorised, so return true
            return true;
          }
          return false;
        }),
        catchError((err) => {
          this.router.navigate(['/auth']);
          return of(false);
        })
      );
  }
}
