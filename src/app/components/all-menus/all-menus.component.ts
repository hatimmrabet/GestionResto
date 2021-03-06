import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/Menu.model';
import { MenusService } from 'src/app/services/menus.service';

@Component({
  selector: 'app-all-menus',
  templateUrl: './all-menus.component.html',
  styleUrls: ['./all-menus.component.scss'],
})
export class AllMenusComponent implements OnInit {
  menus: Menu[] = [];
  displayedMenus: Menu[] = [];
  alert = { type: '', message: '' };
  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private menuService: MenusService) {}

  ngOnInit(): void {
    this.menuService.getMenus().subscribe((data) => {
      this.menus = data;
      this.collectionSize = this.menus.length;
      this.refreshMenu();
    });
  }

  refreshMenu() {
    this.displayedMenus = this.menus
      .map((menu, i) => ({ _id: i + 1, ...menu }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  onDeleteMenu(id: string) {
    this.menuService.deleteMenu(id).subscribe(
      (res: any) => {
        this.menus = this.menus.filter((menu) => menu.id !== id);
        this.refreshMenu();
        this.alert = { type: 'success', message: res.response };
      },
      (err: any) => {
        this.alert = { type: 'danger', message: err.error.response };
        console.log(err);
      }
    );
  }
}
