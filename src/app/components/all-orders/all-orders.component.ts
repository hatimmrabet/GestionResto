import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { Commande } from 'src/app/models/Commande.model';
import { EOrderStatus } from 'src/app/models/EOrderStatus.model';
import { Menu } from 'src/app/models/Menu.model';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
})
export class AllOrdersComponent implements OnInit {

  orders: Commande[] = [];
  displayedOrders: Commande[] = [];
  EOrderStatus = EOrderStatus;


  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
      this.collectionSize = this.orders.length;
      this.refreshOrder();
    })
  }

  refreshOrder() {
    this.displayedOrders = this.orders.map((order, i) => ({_id: i+1,...order}))
    .slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  MenuProducts(article: Article)
  {
    if( (article as Menu).produits)
      return (article as Menu).produits;
    return [];
  }

  getStatus(status: string) {
    switch (status) {
      case 'PENDING':
        return 'En attente';
      case 'IN_PROGRESS':
        return 'En cours';
      case 'COMPLETED':
        return 'Terminé';
      case 'DELIVERED':
        return 'Livré';
      case 'CANCELED':
        return 'Annulé';
      default:
        return 'Inconnu';
    }
  }

  changeStatus(order: Commande, status: string) {
    this.orderService.updateOrderStatus(order.numero, status).subscribe(() => {
      this.refreshOrder();
      window.location.reload();
    }
  );
  }
}
