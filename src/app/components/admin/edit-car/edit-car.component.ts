import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../../car/service/car.service";
import {AuthService} from "../../user/service/auth.service";
import {CarFuelType} from "../../car/enums/carFuelType";
import {CarGearboxType} from "../../car/enums/carGearboxType";
import {CarDriveType} from "../../car/enums/carDriveType";

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit{

  public editCarForm: FormGroup;
  fuelTypes = Object.values(CarFuelType);
  gearboxTypes = Object.values(CarGearboxType);
  driveTypes = Object.values(CarDriveType);

  constructor(private formBuilder: FormBuilder, private carService: CarService, private authService: AuthService) {
  }
  ngOnInit(): void {
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
      driveType: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    this.carService.editCar(this.editCarForm.value).subscribe(value => {
      console.log(value);
    });
  }

}
