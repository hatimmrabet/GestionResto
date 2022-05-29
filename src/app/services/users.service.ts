import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser.model';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private httpClient: HttpClient,
    private authGuardService: AuthGuardService
  ) {}

  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>('http://localhost:8080/users', {
      headers: this.authGuardService.getTokenHeader(),
    });
  }

  editUser(user: IUser): Observable<string> {
    return this.httpClient.put<string>(
      'http://localhost:8080/users/' + user.id,
      user,
      { headers: this.authGuardService.getTokenHeader() }
    );
  }

  deleteUser(id: string) {
    return this.httpClient.delete(
      'http://localhost:8080/users/' + id,
      { headers: this.authGuardService.getTokenHeader() }
    );
  }
}
