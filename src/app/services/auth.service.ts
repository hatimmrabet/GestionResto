import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  API_URL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) {}

  signInUser(user: User) {
    let requestBody = { email: user.getEmail(), password: user.getPassword() };
    this.httpClient.post(this.API_URL + 'signin', requestBody ).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log('erreur' + error);
      }
    );
  }
}
