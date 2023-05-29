import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Car} from "../car/model/car";
import {CarService} from "../car/service/car.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {CarFuelType} from "../car/enums/carFuelType";
import {CarDriveType} from "../car/enums/carDriveType";
import {CarGearboxType} from "../car/enums/carGearboxType";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {DatePipe} from "@angular/common";
import {Reservation} from "./model/reservation";
import {ReservationService} from "./service/reservation.service";
import {AuthService} from "../user/service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmReservationDialogComponent} from "./confirm-reservation-dialog/confirm-reservation-dialog.component";


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})


export class ReservationComponent implements OnInit{

  private carId: number;

  readonly NUMBER_DAYS_TO_LONG_TERM_PRICE: number  = 10;
  public isSummary: boolean = false;
  public car: Car;
  public reservation: Reservation = new Reservation(undefined, '', '', '',0, 0, 0, '', '', '', '');
  public formGroup: FormGroup;
  public pickUpLocations: string[] = ['Makowiec, ul. Leśna 11', 'Zalesice 76', 'Lublin, ul. Kowalska 15', "Lublin, ul. Brzozowa 2", "Lublin, al. Solidarności 75"];
  public returnLocations: string[] = this.pickUpLocations;
  public defaultImage: string = "../../../assets/images/home-page/small.jpg";

  constructor(private carService: CarService, private route: ActivatedRoute, private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer, private reservationService: ReservationService,
              private authService: AuthService, public dialog: MatDialog, private router: Router) {
    this.formGroup = this.formBuilder.group({
      pickUpLocation: [''],
      returnLocation: [''],
      dateRangeStart: [''],
      dateRangeEnd: [''],
    });

    this.reservation.recipient = this.authService.getEmail();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.carId = +params['id'];
    })

    this.carService.getCar(this.carId).subscribe(car => {
      this.car = car;
      this.reservation.carId = this.car.id;
      this.reservation.carName = this.car.name;
      this.reservation.carModel = this.car.model;
      this.getCarImage(this.car);
      console.log(this.car);
    });

    this.formGroup.get('pickUpLocation').valueChanges.subscribe(location => {
      this.reservation.pickUpLocation = location;
    });

    this.formGroup.get('returnLocation').valueChanges.subscribe(location => {
      this.reservation.returnLocation = location;
    });

    this.formGroup.get('dateRangeStart').valueChanges.subscribe(start => {
      this.reservation.startDate = start;
    });

    this.formGroup.get('dateRangeEnd').valueChanges.subscribe(end => {
      this.reservation.endDate = end;
      if (this.reservation.endDate && this.reservation.startDate){
        this.reservation.numberOfDays = moment(this.reservation.endDate).diff(moment(this.reservation.startDate), 'days') + 1;
        this.reservation.priceForDay = this.calculatePrice(this.reservation.numberOfDays);
        this.reservation.priceAll = this.reservation.numberOfDays * this.reservation.priceForDay;
        this.isSummary = true;
        let datePipe = new DatePipe('en-US');
        let date = new Date(this.reservation.startDate);
        this.reservation.startDate = datePipe.transform(date, 'dd/MM/yyyy');
        date = new Date(this.reservation.endDate);
        this.reservation.endDate = datePipe.transform(date, 'dd/MM/yyyy');
      }
    })
  }

  public sendReservation(reservation: Reservation){
    console.log(reservation);
    this.reservationService.sendReservation(reservation).subscribe(value => {
      console.log(value);
    });
    this.openDialog();
  }

  private openDialog(){
    const dialogRef = this.dialog.open(ConfirmReservationDialogComponent)

    dialogRef.afterClosed().subscribe(result =>{
      this.router.navigateByUrl('/home').then(null);
    })
  }

  public submitForm(){
    console.log(this.formGroup.value);
    console.log(this.reservation);
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
    if (days > this.NUMBER_DAYS_TO_LONG_TERM_PRICE)
      return this.car.priceLongTerm;
    return this.car.priceShortTerm;
  }

}
