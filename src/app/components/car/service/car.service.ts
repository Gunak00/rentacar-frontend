import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Car} from "../model/car";
import {environment} from "../../../environments/environment";
import {CarFuelType} from "../enums/carFuelType";
import {carFuelTypeMap} from "../enums/carFuelTypeMap";
import {CarDriveType} from "../enums/carDriveType";
import {carDriveTypeMap} from "../enums/carDriveTypeMap";
import {CarGearboxType} from "../enums/carGearboxType";
import {carGearboxTypeMap} from "../enums/carGearboxTypeMap";
import {carCategoryMap} from "../enums/carCategoryMap";

@Injectable({
  providedIn: 'root'
})
export class CarService {


  private apiServerUrl = environment.apiBaseUrl;
  header = new HttpHeaders({'No-Auth': 'True'});
  private _currentCategory = new BehaviorSubject<string>('Small');

  constructor(private http: HttpClient) {
  }

  public getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiServerUrl}/car/all`, {
      headers: this.header
    });
  }

  public getCar(carId: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiServerUrl}/car/find/${carId}`)
  }

  public addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiServerUrl}/car/add`, car);
  }

  public editCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiServerUrl}/car/update`, car);
  }

  public deleteCar(carId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/car/delete/${carId}`);
  }

  public uploadImage(formData: FormData) {
    return this.http.post(`${this.apiServerUrl}/car/uploadImage`, formData);
  }

  public getImage(carId: number, imageName: string): Observable<Blob> {
    const headers = new HttpHeaders({'Content-Type': 'image/jpeg', 'No-Auth': 'True'});
    const options = {headers: headers, responseType: 'blob' as 'json'};

    return this.http.get(`${this.apiServerUrl}/car/image/${carId}/${imageName}`, options) as Observable<Blob>;
  }

  public setCurrentCategory(category: string) {
    this._currentCategory.next(category);
  }

  public getCurrentCategory(): BehaviorSubject<string> {
    return this._currentCategory;
  }

  public getReadableValueOfFuel(carFuelType: CarFuelType){
    return carFuelTypeMap[carFuelType] || carFuelType;
  }
  public getReadableValueOfDrive(carDriveType: CarDriveType){
    return carDriveTypeMap[carDriveType] || carDriveType;
  }

  public getReadableValueOfGearbox(carGearboxType: CarGearboxType){
    return carGearboxTypeMap[carGearboxType] || carGearboxType;
  }

  public getReadableValueOfCategories(category: string){
    return carCategoryMap[category] || category;
  }

}
