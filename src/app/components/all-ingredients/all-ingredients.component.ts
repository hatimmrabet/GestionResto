import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/Ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-all-ingredients',
  templateUrl: './all-ingredients.component.html',
  styleUrls: ['./all-ingredients.component.scss'],
})
export class AllIngredientsComponent implements OnInit {
  newIngr: Ingredient = new Ingredient();
  ingredients: Ingredient[] = [];
  alert: { type: string; message: string } = { type: '', message: '' };

  constructor(private ingredientService: IngredientsService) {}

  ngOnInit(): void {
    this.ingredientService
      .getIngredients()
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  createIngredient(ingredient: Ingredient) {
    this.ingredientService.createIngredient(ingredient).subscribe(
      (ingredient: Ingredient) => {
        // console.log(ingredient);
        this.ingredients.push(ingredient);
        this.alert = { type: 'success', message: 'Ingredient created' };
        this.newIngr = new Ingredient();
      },
      (error) => {
        this.alert = { type: 'danger', message: 'Error creating ingredient' };
      }
    );
  }

  editIngredient(ingredient: Ingredient) {
    // console.log(ingredient);
    this.ingredientService.updateIngredient(ingredient).subscribe(() => {
      this.alert = {
        type: 'success',
        message: 'Ingredient modifié avec succès',
      };
    });
  }

  deleteIngredient(ingredient: Ingredient) {
    this.ingredientService.deleteIngredient(ingredient).subscribe(
      (res) => {
        this.ingredients = this.ingredients.filter((ing) => ing !== ingredient);
        this.alert = { type: 'success', message: res.response };
      },
      (error) => {
        this.alert = { type: 'danger', message: error.error.response };
        // console.log(error);
      }
    );
  }
}
