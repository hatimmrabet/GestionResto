import { Article } from "./Article";

export class CommandeItem {

  article: Article
  quantity: number

  constructor(article: Article, quantity: number) {
    this.article = article;
    this.quantity = quantity;
  }

}
