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


  constructor(id: string, name: string, description: string, image: string, price: number, categorie: Categorie, ingredients: Ingredient[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.categorie = categorie;
    this.ingredients = ingredients;
  }


}
