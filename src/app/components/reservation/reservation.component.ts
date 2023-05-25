import {Component, OnInit} from '@angular/core';
import {Car} from "../car/model/car";
import {ReservationService} from "./service/reservation.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{

  public car: Car;

  constructor(private reservationService: ReservationService) {
    this.car = this.reservationService.getSelectedCar();
    console.log(this.car);
  }

  ngOnInit(): void {
    this.car = this.reservationService.getSelectedCar();
  }

}
