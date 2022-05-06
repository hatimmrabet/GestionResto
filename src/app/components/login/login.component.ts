import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  alert: { type: string; message: string } = { type: '', message: '' };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.autoNavigateIfLoggedIn();
    this.initLoginForm();
    this.initSignupForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  initSignupForm() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
    });
  }

  onSubmitLoginForm() {
    const formValue = this.loginForm.value;
    console.log(formValue);
    const user = new User(formValue['email'], formValue['password']);

    this.authService.signInUser(user).then(
      (response: any) => {
        this.tokenStorageService.saveToken(response['accessToken']);
        // redirection vers la page d'accueil privee
        this.router.navigate(['profil']);
      },
      (error) => {
        this.alert = {
          type: 'danger',
          message: 'Email ou mot de passe sont incorrects',
        };
        // console.log('erreur Login componenet');
      }
    );
  }

  onSubmitSignupForm() {
    const formValue = this.signupForm.value;
    console.log(formValue);
    const user = new User(
      formValue['email'],
      formValue['password'],
      formValue['firstName'],
      formValue['lastName'],
      formValue['address'],
      formValue['phoneNumber'],
      formValue['birthDate']
    );
    this.authService.signUpUser(user).then(
      (response: any)  => {
        this.alert = { type: 'success', message: response.message };
        // console.log(response)
      },
      (error) => {
        this.alert = { type: 'danger', message: error.error.error };
        // console.log(error);
      }
    );
  }
}
