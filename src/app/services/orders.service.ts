import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from '../models/Commande.model';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  API = 'http://localhost:8080/commandes';

  constructor(private httpClient: HttpClient, private authGuard: AuthGuardService) { }

  getOrders() {
    return this.httpClient.get<Commande[]>(this.API, {
      headers: this.authGuard.getTokenHeader(),
    });
  }

  updateOrderStatus(orderNum: string, status: string) {
    return this.httpClient.put<string>(`${this.API}/${orderNum}/${status}`,
    {
      headers: this.authGuard.getTokenHeader(),
    });
  }



}
