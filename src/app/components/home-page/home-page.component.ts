import {Component, OnInit} from '@angular/core';
import {Car} from "../car/model/car";
import {HttpErrorResponse} from "@angular/common/http";
import {CarService} from "../car/service/car.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent{


  constructor() {
  }

  public goToMyElement(){
    const element = document.querySelector("#description");
    if(element){
      element.scrollIntoView();
    }
  }
}
