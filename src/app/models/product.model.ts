import { Article } from "./Article";
import { Categorie } from "./Categorie.model";
import { Ingredient } from "./Ingredient.model";

export class Product extends Article {
  ingredients: Ingredient[];
  categorie: Categorie;

  constructor(
    id: string,
    name: string,
    description: string,
    image: string,
    price: number,
    categorie: Categorie,
    ingredients: Ingredient[]
  ) {
    super(id, name, description, image, price);
    this.ingredients = ingredients;
    this.categorie = categorie;
  }

}


