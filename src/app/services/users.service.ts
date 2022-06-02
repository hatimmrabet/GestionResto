import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser.model';
import { User } from '../models/user.model';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  API = 'http://localhost:8080/users';

  constructor(
    private httpClient: HttpClient,
    private authGuardService: AuthGuardService
  ) {}

  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.API, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(this.API + '/' + id, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }

  editUser(user: User) {
    return this.httpClient.put(this.API + '/' + user.id, user, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }

  deleteUser(id: string) {
    return this.httpClient.delete<any>(this.API + '/' + id, {
      headers: this.authGuardService.getTokenHeader(),
    });
  }
}
