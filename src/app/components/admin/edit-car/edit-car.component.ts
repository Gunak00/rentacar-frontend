import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../../car/service/car.service";
import {AuthService} from "../../user/service/auth.service";
import {CarFuelType} from "../../car/enums/carFuelType";
import {CarGearboxType} from "../../car/enums/carGearboxType";
import {CarDriveType} from "../../car/enums/carDriveType";
import {Car} from "../../car/model/car";
import {ProxyEditCarService} from "./proxy-edit-car.service";
import {catchError, of} from "rxjs";
import {ErrorDialogComponent} from "../../error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmAddCarDialogComponent} from "../add-car/confirm-add-car-dialog/confirm-add-car-dialog.component";
import {ConfirmEditCarDialogComponent} from "./confirm-edit-car-dialog/confirm-edit-car-dialog.component";

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  public editCarForm: FormGroup;
  public editCar: Car;
  fileName: string;


  booleans: boolean[] = [true, false];
  fuelTypes = Object.values(CarFuelType);
  gearboxTypes = Object.values(CarGearboxType);
  driveTypes = Object.values(CarDriveType);

  constructor(private carService: CarService, private proxyEditCarService: ProxyEditCarService,
              private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.newForm();
    this.editCar = proxyEditCarService.getCar();
    this.fileName = this.editCar.imageUrl;
  }

  ngOnInit(): void {
    this.editCarForm.setValue({
      name: this.editCar.name,
      model: this.editCar.model,
      category: this.editCar.category,
      priceShortTerm: this.editCar.priceShortTerm,
      priceLongTerm: this.editCar.priceLongTerm,
      manufactureYear: this.editCar.manufactureYear,
      numberOfPeople: this.editCar.numberOfPeople,
      airCon: this.editCar.airCon,
      fuel: this.editCar.fuel,
      gearbox: this.editCar.gearbox,
      numberOfDoor: this.editCar.numberOfDoor,
      engineSize: this.editCar.engineSize,
      driveType: this.editCar.driveType,
      isAvailable: this.editCar.isAvailable
    })
    console.log(this.editCar);
  }

  onSubmit() {
    this.editCar.name = this.editCarForm.value.name;
    this.editCar.model = this.editCarForm.value.model;
    this.editCar.category = this.editCarForm.value.category;
    this.editCar.priceShortTerm = this.editCarForm.value.priceShortTerm;
    this.editCar.priceLongTerm = this.editCarForm.value.priceLongTerm;
    this.editCar.manufactureYear = this.editCarForm.value.manufactureYear;
    this.editCar.numberOfPeople = this.editCarForm.value.numberOfPeople;
    this.editCar.airCon = this.editCarForm.value.airCon;
    this.editCar.fuel = this.editCarForm.value.fuel;
    this.editCar.gearbox = this.editCarForm.value.gearbox;
    this.editCar.numberOfDoor = this.editCarForm.value.numberOfDoor;
    this.editCar.engineSize = this.editCarForm.value.engineSize;
    this.editCar.driveType = this.editCarForm.value.driveType;
    this.editCar.isAvailable = this.editCarForm.value.isAvailable;

    this.carService.editCar(this.editCar)
      .pipe(catchError(err => {
        this.dialog.open(ErrorDialogComponent);
        return of(err);
      }))      .subscribe(value => {
      console.log(value);
      const matDialogRef = this.dialog.open(ConfirmEditCarDialogComponent);
    });
  }

  private newForm() {
    this.editCarForm = this.formBuilder.group({
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
      isAvailable: new FormControl('')
    })
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file){
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('carId', this.editCar.id.toString());
      formData.append('file', file);


      const upload$ = this.carService.uploadImage(formData);
      upload$.subscribe();
    }
  }

}
