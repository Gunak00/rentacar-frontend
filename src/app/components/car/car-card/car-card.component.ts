import {Component, Input} from '@angular/core';
import {CarFuelType} from "../enums/carFuelType";
import {CarDriveType} from "../enums/carDriveType";
import {CarGearboxType} from "../enums/carGearboxType";
import {CarService} from "../service/car.service";
import {Car} from "../model/car";

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent {

  @Input() car: Car;

  constructor(private carService: CarService) {}


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

}
