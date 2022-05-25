import { Article } from "./Article";

export class ProductRequest extends Article {

  categorie: string;
  ingredients: string[];

  constructor(data: any)
  {
    super(null, data.name, data.description, data.image, data.price);
    this.categorie = data.categorie;
    this.ingredients = data.ingredients;
  }

}
