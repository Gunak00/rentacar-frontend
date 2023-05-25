import {Component, DoCheck, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CarService} from "../service/car.service";
import {Car} from "../model/car";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {HttpErrorResponse} from "@angular/common/http";
import {carFuelTypeMap} from "../enums/carFuelTypeMap";
import {CarFuelType} from "../enums/carFuelType";
import {CarDriveType} from "../enums/carDriveType";
import {CarGearboxType} from "../enums/carGearboxType";
import {carGearboxTypeMap} from "../enums/carGearboxTypeMap";
import {Router} from "@angular/router";
import {ReservationService} from "../../reservation/service/reservation.service";

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit {

  category = ''
  public car: Car;
  public cars: Car[] = [];
  public filteredCars: Car[] = [];
  public defaultImage: string = "../../../assets/images/home-page/small.jpg";

  constructor(private carService: CarService, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllCars();

    this.carService.getCurrentCategory().subscribe(category => {
      this.filteredCars = this.cars.filter(car => car.category === category);
    })
  }

  public getAllCars(): void {
    this.carService.getAllCars().subscribe({
        next: (response: Car[]) => {
          this.cars = response;
          this.filteredCars = response.filter(car => car.category === this.carService.getCurrentCategory().value);
          this.cars.forEach(car => {
            if (car.imageUrl) {
              this.getCarImage(car);
            } else {
              car.imageSafeUrl = this.defaultImage;
            }
          });
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  private getCarImage(car: Car) {
    const urlCreator = window.URL;
    let imageUrl: SafeUrl;
    this.carService.getImage(car.id, car.imageUrl).subscribe(blob => {
      imageUrl = this.sanitizer.bypassSecurityTrustUrl(
        urlCreator.createObjectURL(blob));
      car.imageSafeUrl = imageUrl;
    })
  }

  public getReadableValueOfFuel(carFuelType: CarFuelType) {
    return this.carService.getReadableValueOfFuel(carFuelType);
  }

  public getReadableValueOfDrive(carDriveType: CarDriveType) {
    return this.carService.getReadableValueOfDrive(carDriveType);
  }

  public getReadableValueOfGearbox(carGearboxType: CarGearboxType) {
    return this.carService.getReadableValueOfGearbox(carGearboxType);
  }

  public getReadableValueOfCategories(category: string) {
    return this.carService.getReadableValueOfCategories(category);
  }

  public goToReservationProcess(carId: number) {
    this.router.navigate(['/reservation'], {queryParams: {id: carId}}).then();
  }

}
