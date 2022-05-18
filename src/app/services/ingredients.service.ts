import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/Ingredient.model';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  API = 'http://localhost:8080/ingredients';

  constructor(
    private httpClient: HttpClient,
    private authGuardService: AuthGuardService
  ) {}

  getIngredients() : Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.API, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }

}
