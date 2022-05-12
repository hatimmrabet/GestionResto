import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpValidator } from 'src/app/validators/signup.validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {

  signupForm: FormGroup;
  hide = true;
  selected = null;
  alertSignup: { type: string, message: string };

  constructor(private formBuilder: FormBuilder, private authService : AuthService) {}

  ngOnInit(): void {
    this.alertSignup = { type: '', message: '' };
    this.initSignupForm();
  }

  initSignupForm() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required]],
      phoneNumber: ['',[Validators.required, Validators.pattern('^0[0-9]{9}$')]], // phone number should have 10 digits
      role: ['',[Validators.required]],
      birthDate: ['', [Validators.required, SignUpValidator.validDate]], // birthdat should be in the past
    });
  }

  get signupControl() {
    return this.signupForm.controls;
  }

  onSubmitSignupForm() {
    const user = new User(this.signupForm.value);
    this.authService.signUpUser(user).then(
      (response: any) => {
        this.alertSignup = { type: 'success', message: response.message };
        console.log(response)
      },
      (error) => {
        this.alertSignup = { type: 'danger', message: error.error.error };
        console.log(error);
      }
    );
  }
}
