import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Menu } from 'src/app/models/Menu.model';
import { MenusService } from 'src/app/services/menus.service';

@Component({
  selector: 'app-all-menus',
  templateUrl: './all-menus.component.html',
  styleUrls: ['./all-menus.component.scss'],
})
export class AllMenusComponent implements OnInit {
  menus: Menu[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'produits',
    'price',
    'update',
    'delete',
  ];
  dataSource = new MatTableDataSource<Menu>(this.menus);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private menuService: MenusService) {}

  ngOnInit(): void {
    this.menuService.getMenus().subscribe((data) => {
      this.menus = data;
      this.dataSource = new MatTableDataSource<Menu>(this.menus);
    });
  }
}
