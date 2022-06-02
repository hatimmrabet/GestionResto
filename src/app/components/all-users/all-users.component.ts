import { Component, OnInit } from '@angular/core';
import { ERole } from 'src/app/models/ERole.model';
import { IUser } from 'src/app/models/IUser.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit {
  userslist: IUser[] = [];
  EROLE = ERole;
  alert: { type: string; message: string };

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.alert = { type: '', message: '' };
    this.usersService.getUsers().subscribe((data) => {
      this.userslist = data;
    });
  }

  deleteUser(id: string) {
    this.usersService.deleteUser(id).subscribe(
      () => {
        this.alert = { type: 'success', message: 'User deleted Successfully' };
        this.userslist = this.userslist.filter((user) => user.id !== id);
      },
      (error) => {
        this.alert = { type: 'danger', message: error.error.response };
      }
    );
  }

}
