import {Component, OnInit} from '@angular/core';
import {Car} from "../car/model/car";
import {CarService} from "../car/service/car.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{

  private carId: number;
  public car: Car;

  constructor(private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.carId = +params['id'];
    })
    this.carService.getCar(this.carId).subscribe(car => {
      this.car = car;
      console.log(this.car);
    });
  }

}
