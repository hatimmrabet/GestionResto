import { Categorie } from "./Categorie.model";
import { Ingredient } from "./Ingredient.model";

export class Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  categorie: Categorie;
  ingredients: Ingredient[];
}
