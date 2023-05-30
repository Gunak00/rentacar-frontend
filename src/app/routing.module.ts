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
import {OurFleetComponent} from "./components/car/our-fleet/our-fleet.component";
import {CarRentalComponent} from "./components/car/car-rental/car-rental.component";
import {ReservationComponent} from "./components/reservation/reservation.component";


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'ourFleet', component: OurFleetComponent },
  { path: 'carRental', component: CarRentalComponent },
  { path: 'user', component: UserComponent, canActivate:[AuthGuard], data:{role: ['ROLE_USER', 'ROLE_ADMIN']} },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{role: ['ROLE_ADMIN']} },
  { path: 'add', component: AddCarComponent, canActivate:[AuthGuard], data:{role: ['ROLE_ADMIN']} },
  { path: 'edit', component: EditCarComponent, canActivate:[AuthGuard], data:{role: ['ROLE_ADMIN']} },
  { path: 'reservation', component: ReservationComponent, canActivate:[AuthGuard], data:{role: ['ROLE_USER', 'ROLE_ADMIN']} },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
