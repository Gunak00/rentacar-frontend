import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {UserComponent} from "./components/user/user.component";
import {AdminComponent} from "./components/admin/admin.component";
import {AuthGuard} from "./components/user/service/auth.guard";
import {ForbiddenComponent} from "./components/forbidden/forbidden.component";
import {AddCarComponent} from "./components/admin/add-car/add-car.component";
import {EditCarComponent} from "./components/admin/edit-car/edit-car.component";
import {RentCarComponent} from "./components/car/rent-car/rent-car.component";


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'rentCar', component: RentCarComponent },
  { path: 'user', component: UserComponent, canActivate:[AuthGuard], data:{role: 'ROLE_USER'} },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{role: 'ROLE_ADMIN'} },
  { path: 'add', component: AddCarComponent, canActivate:[AuthGuard], data:{role: 'ROLE_ADMIN'} },
  { path: 'edit', component: EditCarComponent, canActivate:[AuthGuard], data:{role: 'ROLE_ADMIN'} },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
