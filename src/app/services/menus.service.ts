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

  getMenu(id: string) : Observable<Menu> {
    return this.httpClient.get<Menu>(this.API + '/' + id, {
      headers: this.authGuard.getTokenHeader(),
    });
  }

  createMenu(menu : FormData) : Observable<Menu> {
    return this.httpClient.post<Menu>(this.API, menu, {
      headers: this.authGuard.getTokenHeader(),
    });
  }

  editMenu(id: string, menu : FormData) : Observable<any> {
    return this.httpClient.put(this.API + '/' + id, menu, {
      headers: this.authGuard.getTokenHeader(),
    });
  }

  deleteMenu(id: string) : Observable<any> {
    return this.httpClient.delete(this.API + '/' + id, {
      headers: this.authGuard.getTokenHeader(),
    });
  }

}
