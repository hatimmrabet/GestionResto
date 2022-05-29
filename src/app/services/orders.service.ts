import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from '../models/Commande.model';
import { AuthGuardService } from './auth-guard.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  API = 'http://localhost:8080/commandes';

  constructor(
    private httpClient: HttpClient,
    private authGuard: AuthGuardService,
    private tokenStorageService: TokenStorageService
  ) {}

  getOrders() {
    return this.httpClient.get<Commande[]>(this.API, {
      headers: this.authGuard.getTokenHeader(),
    });
  }

  updateOrderStatus(orderNum: string, status: string) {
    return this.httpClient.put<string>(`${this.API}/${orderNum}/${status}`, {
      headers: this.authGuard.getTokenHeader(),
    });
  }

  getUserOrders() {
    let user = this.tokenStorageService.getUser();
    return this.httpClient.get<Commande[]>(`${this.API}/client/${user?.id}`, {
      headers: this.authGuard.getTokenHeader(),
    });
  }
}
