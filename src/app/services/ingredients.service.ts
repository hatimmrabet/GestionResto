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

  getIngredient(id: number) : Observable<Ingredient> {
    return this.httpClient.get<Ingredient>(this.API + '/' + id, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }

  createIngredient(ingredient: Ingredient) : Observable<Ingredient> {
    return this.httpClient.post<Ingredient>(this.API, ingredient, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }

  updateIngredient(ingredient: Ingredient) : Observable<any> {
    return this.httpClient.put(this.API + '/' + ingredient.id, ingredient, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }

  deleteIngredient(ingredient: Ingredient) : Observable<any> {
    return this.httpClient.delete(this.API + '/' + ingredient.id, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }


}
