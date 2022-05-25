import { CommandeItem } from "./CommandeItem";
import { User } from "./user.model";

export class Commande {

  id: string;
  numero: number;
  date: Date;
  etat: string;
  type: string;
  client: User;
  price: number;
  items: CommandeItem[] = [];

  constructor() {}


}
