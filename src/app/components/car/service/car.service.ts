import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../model/car";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {
  }

  public getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiServerUrl}/car/all`);
  }
}
