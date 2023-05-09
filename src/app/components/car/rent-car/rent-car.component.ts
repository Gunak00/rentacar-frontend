import {Component, OnInit, SecurityContext} from '@angular/core';
import {CarService} from "../service/car.service";
import {Car} from "../model/car";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css']
})
export class RentCarComponent implements OnInit {

  // public imageUrl: SafeUrl;
  public car: Car;
  public cars: Car[];
  public defaultImage: string = "../../../assets/images/home-page/small.jpg";


  constructor(private carService: CarService, private sanitizer: DomSanitizer) {

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

}
