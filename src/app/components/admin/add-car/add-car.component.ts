import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {CarFuelType} from "../../car/enums/carFuelType";
import {CarGearboxType} from "../../car/enums/carGearboxType";
import {CarDriveType} from "../../car/enums/carDriveType";
import {CarService} from "../../car/service/car.service";
import {AuthService} from "../../user/service/auth.service";
import {catchError, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmAddCarDialogComponent} from "./confirm-add-car-dialog/confirm-add-car-dialog.component";
import {ErrorDialogComponent} from "../../error-dialog/error-dialog.component";

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  public addCarForm: FormGroup;
  fuelTypes = Object.values(CarFuelType);
  gearboxTypes = Object.values(CarGearboxType);
  driveTypes = Object.values(CarDriveType);

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private formBuilder: FormBuilder, private carService: CarService,
              private authService: AuthService, private dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.carService.addCar(this.addCarForm.value)
      .pipe(catchError(err => {
        this.dialog.open(ErrorDialogComponent);
        return of(err);
      }))
      .subscribe(value => {
        console.log(value);
        const matDialogRef = this.dialog.open(ConfirmAddCarDialogComponent);
        matDialogRef.afterClosed().subscribe(() =>{
          if (this.addCarForm.valid) {
            //add product
            setTimeout(() =>
              this.formGroupDirective.resetForm(), 0)
          }
        });
      });
  }

  private initForm(){
    this.addCarForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      priceShortTerm: new FormControl('', [Validators.required]),
      priceLongTerm: new FormControl('', [Validators.required]),
      manufactureYear: new FormControl('', [Validators.required]),
      numberOfPeople: new FormControl('', [Validators.required]),
      airCon: new FormControl('', [Validators.required]),
      fuel: new FormControl('', [Validators.required]),
      gearbox: new FormControl('', [Validators.required]),
      numberOfDoor: new FormControl('', [Validators.required]),
      engineSize: new FormControl('', [Validators.required]),
      driveType: new FormControl('', [Validators.required]),
      isAvailable: new FormControl(true)
    }, {emitEvent: false});
  }
}
