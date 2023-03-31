import {Component, OnInit} from '@angular/core';
import {Car} from "./components/car/model/car";
import {CarService} from "./components/car/service/car.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'rentacar-frontend';

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
