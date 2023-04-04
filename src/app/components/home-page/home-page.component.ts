import {Component, OnInit} from '@angular/core';
import {Car} from "../car/model/car";
import {HttpErrorResponse} from "@angular/common/http";
import {CarService} from "../car/service/car.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  public cars: Car[];

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.getAllCars();
  }
  public getAllCars(): void {
    this.carService.getAllCars().subscribe({
        next: (response: Car[]) => {
          this.cars = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }
}
