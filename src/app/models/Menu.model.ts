import { Product } from "./product.model";

export class Menu {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  produits: Product[];

  constructor(id: string, name: string, description: string, image: string, price: number, produits: Product[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.produits = produits;
  }

}
