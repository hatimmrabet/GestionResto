import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/IUser.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  userslist:IUser[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe( data => {
      this.userslist = data;
    })
  }

}
