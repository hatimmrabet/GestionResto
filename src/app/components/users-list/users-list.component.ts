import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ERole } from 'src/app/models/ERole.model';
import { IUser } from 'src/app/models/IUser.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  userslist: IUser[] = [];
  EROLE = ERole;
  alert: { type: string; message: string };

  constructor(
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.alert = { type: '', message: '' };
    this.usersService.getUsers().subscribe((data) => {
      this.userslist = data;
    });
  }

  deleteUser(id: string) {
    this.usersService.deleteUser(id).subscribe(() => {
      this.alert = { type: 'success', message: 'User deleted Successfully' };
      this.userslist = this.userslist.filter((user) => user.id !== id);
    });
  }
}
