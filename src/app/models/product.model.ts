import { Ingredient } from "./Ingredient.model";

export class Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  ingredients: Ingredient[];


  constructor(id: string, name: string, description: string, image: string, price: number, ingredients: Ingredient[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.ingredients = ingredients;
  }


}
