import {Component, EventEmitter, OnChanges, OnInit} from '@angular/core';
import {AuthService} from "../user/service/auth.service";
import {using} from "rxjs";
import {UserService} from "../user/service/user.service";
import {Router} from "@angular/router";
import {CarService} from "../car/service/car.service";
import {CarRentalComponent} from "../car/car-rental/car-rental.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  currentCategory = 'Small';

  constructor(private authService: AuthService, private userService: UserService, private carService: CarService) {
  }

  ngOnInit(): void {
    this.carService.getCurrentCategory().subscribe(category => {
      this.currentCategory = category;
    })
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

  public setCategory(category: string){
    this.currentCategory = category;
    this.carService.setCurrentCategory(category);
  }

}
