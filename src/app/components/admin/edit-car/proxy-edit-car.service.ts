import { Injectable } from '@angular/core';
import {Car} from "../../car/model/car";

@Injectable({
  providedIn: 'root'
})
export class ProxyEditCarService {

  private car: Car;
  constructor() { }

  public setCar(car: Car){
    this.car = car;
  }

  public getCar(): Car{
    return this.car;
  }
}
