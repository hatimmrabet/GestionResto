import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/Menu.model';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  API = 'http://localhost:8080/menus';

  constructor(private httpClient: HttpClient, private authGuard: AuthGuardService ) { }

  getMenus() : Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(this.API, {
      headers: this.authGuard.getTokenHeader(),
    });
  }

}
