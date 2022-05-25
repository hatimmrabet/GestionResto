import { Article } from "./Article";
import { Product } from "./product.model";

export class Menu extends Article {
  produits: Product[];

  constructor(id: string, name: string, description: string, image: string, price: number, produits: Product[]) {
    super(id, name, description, image, price);
    this.produits = produits;
  }
}
