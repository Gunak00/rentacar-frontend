import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import * as cluster from "cluster";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl;
  private header = new HttpHeaders();
  constructor(private http: HttpClient, private authService: AuthService) { }

  public login(payload: any){
    return this.http.post(`${this.apiServerUrl}/user/login`, payload);
  }

  public getUsers(token: string): Observable<User[]> {
    this.header = this.header.set('Authorization', 'Bearer ' + token);
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`, {headers: this.header});
  }

  public getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${userId}`);
  }

  public addUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/user/add`, user);
  }

  public updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
  }

  public deleteUser(userId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }

  public isAdmin(role: string): boolean{
    return this.authService.getRole() === "ROLE_ADMIN";
  }

}
