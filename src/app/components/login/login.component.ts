import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user/service/user.service";
import {AuthService} from "../user/service/auth.service";
import {Router} from "@angular/router";

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
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe((value: any) => {
      console.log(value.accessToken + " " + value.role);
      this.userAuthService.setToken(value.accessToken);
      this.userAuthService.setRole(value.role);
      this.router.navigate(['/home']);
      this.getUsers(value.accessToken);
    });
  }

  getUsers(token: string) {
    this.userService.getUsers(token).subscribe((value: any) => {
      console.log(value);
    })
  }

}
