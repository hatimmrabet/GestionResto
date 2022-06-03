import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ERole } from 'src/app/models/ERole.model';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { SignUpValidator } from 'src/app/validators/signup.validator';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  sub: any;
  id: string;
  form: FormGroup;
  signupForm: FormGroup;
  hide = true;
  selected = null;
  alertSignup: { type: string; message: string };
  ERole = ERole;
  loading = true;
  canChangePassword = false;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id')!!;
    });
    this.alertSignup = { type: '', message: '' };
    this.initSignupForm();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  initSignupForm() {
    this.usersService.getUser(this.id).subscribe((data) => {
      console.log(data);
      this.signupForm = this.formBuilder.group({
        firstName: [data.firstName, [Validators.required]],
        lastName: [data.lastName, [Validators.required]],
        email: [data.email, [Validators.required, Validators.email]],
        address: [data.address, [Validators.required]],
        phoneNumber: [
          data.phoneNumber,
          [Validators.required, Validators.pattern('^0[0-9]{9}$')],
        ], // phone number should have 10 digits
        role: [data.role, [Validators.required]],
        birthDate: [
          new Date(data.birthDate),
          [Validators.required, SignUpValidator.validDate],
        ], // birthdat should be in the past
      });
      this.loading = false;
    });
  }

  get signupControl() {
    return this.signupForm.controls;
  }

  onSubmitSignupForm() {
    const user = new User(this.signupForm.value);
    user.id = this.id;
    this.usersService.editUser(user).subscribe(
      (response: any) => {
        // console.log(response);
        this.alertSignup = {
          type: 'success',
          message: 'User Modified successfully',
        };
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      (error) => {
        // console.log(error);
        this.alertSignup = { type: 'danger', message: error.error.response };
      }
    );
  }

  changePassword() {
    this.canChangePassword = !this.canChangePassword;
    if(this.canChangePassword) {
      this.signupForm.addControl('password', this.formBuilder.control('', [Validators.required, Validators.minLength(6)]));
    } else {
      this.signupForm.removeControl('password');
    }
  }
}
