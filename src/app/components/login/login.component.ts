import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user/service/user.service";
import {AuthService} from "../user/service/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {AuthenticationErrorDialogComponent} from "./authentication-error-dialog/authentication-error-dialog.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userAuthService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe((value: any) => {
      console.log(value.accessToken + " " + value.role + " " + value.email);
      this.userAuthService.setToken(value.accessToken);
      this.userAuthService.setRole(value.role);
      this.userAuthService.setEmail(value.email);
      this.router.navigate(['/home']);
      this.getUsers(value.accessToken);
    },
      error => {
      if (error.status === 401){
        this.dialog.open(AuthenticationErrorDialogComponent);
      }
      });
  }

  getUsers(token: string) {
    this.userService.getUsers(token).subscribe((value: any) => {
      console.log(value);
    })
  }

}
