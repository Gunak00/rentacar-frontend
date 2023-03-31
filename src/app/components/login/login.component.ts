import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user/service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl( '', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe((value: any) => {
      this.getUsers(value.accessToken);
    });
  }

  getUsers(token: string){
    this.userService.getUsers(token).subscribe((value: any) => {
      console.log(value);
    })
  }

}
