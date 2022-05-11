import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { SignUpValidator } from 'src/app/validators/signup.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  alertLogin: { type: string; message: string } = { type: '', message: '' };
  alertSignup: { type: string; message: string } = { type: '', message: '' };

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
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^0[0-9]{9}$')],
      ], // phone number should have 10 digits
      birthDate: ['', [Validators.required, SignUpValidator.validDate]], // birthdat should be in the past
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
        this.alertLogin = {
          type: 'danger',
          message: 'Email ou mot de passe sont incorrects',
        };
        // console.log('erreur Login componenet');
      }
    );
    this.alertLogin = { type: '', message: '' };
  }

  get loginControl() {
    return this.loginForm.controls;
  }

  get signupControl() {
    return this.signupForm.controls;
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
      (response: any) => {
        this.alertSignup = { type: 'success', message: response.message };
        // console.log(response)
      },
      (error) => {
        this.alertSignup = { type: 'danger', message: error.error.error };
        // console.log(error);
      }
    );
    this.alertSignup = { type: '', message: '' };
  }
}
