import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Car} from "../car/model/car";
import {CarService} from "../car/service/car.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {CarFuelType} from "../car/enums/carFuelType";
import {CarDriveType} from "../car/enums/carDriveType";
import {CarGearboxType} from "../car/enums/carGearboxType";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{

  private carId: number;

  public numberDaysToLongTermPrice = 10;
  public car: Car;
  public formGroup: FormGroup;
  public numberOfDays: number = 0;
  public price: number = 0;
  public startDate: string;
  public endDate: string;
  public pickUpLocations: string[] = ['Lublin, ul. Kowalska 15', "Lublin, ul. Brzozowa 2", "Lublin, al. Solidarności 75"];
  public returnLocations: string[] = this.pickUpLocations;
  public defaultImage: string = "../../../assets/images/home-page/small.jpg";

  constructor(private carService: CarService, private route: ActivatedRoute, private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer) {
    this.formGroup = this.formBuilder.group({
      pickUpLocation: [''],
      returnLocation: [''],
      dateRangeStart: [''],
      dateRangeEnd: [''],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.carId = +params['id'];
    })

    this.carService.getCar(this.carId).subscribe(car => {
      this.car = car;
      this.getCarImage(this.car);
      console.log(this.car);
    });


    this.formGroup.get('dateRangeStart').valueChanges.subscribe(start => {
      this.startDate = start;
    });

    this.formGroup.get('dateRangeEnd').valueChanges.subscribe(end => {
      this.endDate = end;
      if (this.endDate && this.startDate){
        this.numberOfDays = moment(this.endDate).diff(moment(this.startDate), 'days') + 1;
        this.price = this.calculatePrice(this.numberOfDays);
      }
    })
  }

  public submitForm(){
    console.log(this.formGroup.value);
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

  private getCarImage(car: Car) {
    const urlCreator = window.URL;
    if (car.imageUrl == null){
      car.imageSafeUrl = this.defaultImage;
    }else{
      let imageUrl: SafeUrl;
      this.carService.getImage(car.id, car.imageUrl).subscribe(blob => {
        imageUrl = this.sanitizer.bypassSecurityTrustUrl(
          urlCreator.createObjectURL(blob));
        car.imageSafeUrl = imageUrl;
      })
    }
  }

  private calculatePrice(days: number){
    if (days > this.numberDaysToLongTermPrice)
      return this.car.priceLongTerm;
    return this.car.priceShortTerm;
  }

}
