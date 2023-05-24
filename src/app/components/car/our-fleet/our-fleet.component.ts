import {Component, OnInit, SecurityContext} from '@angular/core';
import {CarService} from "../service/car.service";
import {Car} from "../model/car";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {CarFuelType} from "../enums/carFuelType";
import {CarDriveType} from "../enums/carDriveType";
import {CarGearboxType} from "../enums/carGearboxType";

@Component({
  selector: 'app-rent-car',
  templateUrl: './our-fleet.component.html',
  styleUrls: ['./our-fleet.component.css']
})
export class OurFleetComponent implements OnInit {

  // public imageUrl: SafeUrl;
  public car: Car;
  public cars: Car[];

  public defaultImage: string = "../../../assets/images/home-page/small.jpg";


  constructor(private carService: CarService, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllCars();
  }

  private getCarImage(car: Car) {
    const urlCreator = window.URL;
    let imageUrl: SafeUrl;
    this.carService.getImage(car.id, car.imageUrl).subscribe(blob => {
      imageUrl = this.sanitizer.bypassSecurityTrustUrl(
        urlCreator.createObjectURL(blob));
      car.imageSafeUrl = imageUrl;
    })
  }


  public getAllCars(): void {
    this.carService.getAllCars().subscribe({
        next: (response: Car[]) => {
          this.cars = response;
          this.cars.forEach(car => {
            if (car.imageUrl) {
              this.getCarImage(car);
            }else{
              car.imageSafeUrl = this.defaultImage;
            }
          })
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  public goToProperCarRental(category: string){
    this.carService.setCurrentCategory(category);
    this.router.navigate(['carRental']).then();
  }

  public getReadableValueOfFuel(carFuelType: CarFuelType){
    return this.carService.getReadableValueOfFuel(carFuelType);
  }

  public getReadableValueOfDrive(carDriveType: CarDriveType){
    return this.carService.getReadableValueOfDrive(carDriveType);
  }

  public getReadableValueOfCategories(category: string){
    return this.carService.getReadableValueOfCategories(category);
  }

}
