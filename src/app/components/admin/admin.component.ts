import {Component, OnInit} from '@angular/core';
import {Car} from "../car/model/car";
import {HttpErrorResponse} from "@angular/common/http";
import {CarService} from "../car/service/car.service";
import {Router} from "@angular/router";
import {ProxyEditCarService} from "./edit-car/proxy-edit-car.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public cars: Car[];
  columnsToDisplay = ['id', 'name', 'model', 'priceShortTerm', 'priceLongTerm', 'action'];

  constructor(private carService: CarService, private router: Router, private proxyEditCar: ProxyEditCarService) {
  }

  ngOnInit(): void {
    this.getAllCars();
  }

  public getAllCars(): void {
    this.carService.getAllCars().subscribe({
        next: (response: Car[]) => {
          this.cars = response;
          this.cars.forEach(car => {
            if (car.priceLongTerm == null)
              car.priceLongTerm = 0;
            if (car.priceShortTerm == null)
              car.priceShortTerm = 0;
          })
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  public deleteCar(carId: number): void {
    this.carService.deleteCar(carId).subscribe(
      (response: void) => {
        this.getAllCars();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public editCar(carId: number) {
    this.proxyEditCar.setCar(this.cars.find(car => car.id === carId));
    this.router.navigate(['/edit']).then(r => {});
  }
}
