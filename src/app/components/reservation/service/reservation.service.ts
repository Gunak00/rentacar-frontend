import { Injectable } from '@angular/core';
import {Car} from "../../car/model/car";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private selectedCar: Car;
  constructor() { }

  getSelectedCar(): Car {
    return this.selectedCar;
  }

  setSelectedCar(value: Car) {
    this.selectedCar = value;
  }
}
