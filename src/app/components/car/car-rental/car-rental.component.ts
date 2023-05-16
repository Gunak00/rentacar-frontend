import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CarService} from "../service/car.service";
import {Car} from "../model/car";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit {

  category = ''
  public car: Car;
  public cars: Car[] = [];
  public filteredCars: Car[] = [];
  public defaultImage: string = "../../../assets/images/home-page/small.jpg";

  constructor(private carService: CarService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getAllCars();

    this.carService.getCurrentCategory().subscribe(category => {
      this.filteredCars = this.cars.filter(car => car.category === category);
    })
  }

  public getAllCars(): void {
    this.carService.getAllCars().subscribe({
        next: (response: Car[]) => {
          this.cars = response;
          this.filteredCars = response.filter(car => car.category === this.carService.getCurrentCategory().value);
          this.cars.forEach(car => {
            if (car.imageUrl) {
              this.getCarImage(car);
            } else {
              car.imageSafeUrl = this.defaultImage;
            }
          });
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
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

}
