export class ProductRequest {
  name: string;
  description: string;
  image: string;
  price: number;
  categorie: string;
  ingredients: string[];

  constructor(data: any)
  {
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.price = data.price;
    this.categorie = data.categorie;
    this.ingredients = data.ingredients;
  }

}
