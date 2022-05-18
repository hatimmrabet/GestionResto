import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/Categorie.model';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  API = 'http://localhost:8080/categories';

  constructor(
    private httpClient: HttpClient,
    private authGuardService: AuthGuardService
  ) {}

  getCategories() : Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>(this.API, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }

  getCategorie(id: number) : Observable<Categorie> {
    return this.httpClient.get<Categorie>(`${this.API}/${id}`, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }


}
