import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../model/car";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiServerUrl = environment.apiBaseUrl;
  header = new HttpHeaders({'No-Auth': 'True'});
  constructor(private http: HttpClient) {
  }

  public getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiServerUrl}/car/all`, {
      headers: this.header
    });
  }

  public addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiServerUrl}/car/add`, car);
  }

  public editCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiServerUrl}/car/update`, car);
  }

  public deleteCar(carId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/car/delete/${carId}`);
  }
}
