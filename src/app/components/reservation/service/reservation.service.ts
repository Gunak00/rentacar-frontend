import { Injectable } from '@angular/core';
import {Car} from "../../car/model/car";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Reservation} from "../model/reservation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private selectedCar: Car;
  private apiServerUrl = environment.apiBaseUrl;
  header = new HttpHeaders({'No-Auth': 'True'});
  constructor(private http: HttpClient) { }

  public sendReservation(reservation: Reservation, token: string): Observable<Reservation>{
    this.header = this.header.set('Authorization', 'Bearer ' + token);
    return this.http.post<Reservation>(`${this.apiServerUrl}/reservation/sendReservation`, reservation, {
      headers: this.header
    });
  }

  getSelectedCar(): Car {
    return this.selectedCar;
  }

  setSelectedCar(value: Car) {
    this.selectedCar = value;
  }


}
