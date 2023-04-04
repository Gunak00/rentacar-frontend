import { Component } from '@angular/core';
import {AuthService} from "../user/service/auth.service";
import {using} from "rxjs";
import {UserService} from "../user/service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private userService: UserService) {
  }

  public isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  public logout(){
    return this.authService.clear();
  }

  public isAdmin(): boolean{
    return this.userService.isAdmin("ROLE_ADMIN");
  }

}
