import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserComponent} from './components/user/user.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NavbarComponent} from './components/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {LayoutModule} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {HomePageComponent} from './components/home-page/home-page.component';
import {MatCardModule} from "@angular/material/card";
import {MatRippleModule} from "@angular/material/core";
import {LoginComponent} from './components/login/login.component';
import {RoutingModule} from "./routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuard} from "./components/user/service/auth.guard";
import {AuthInterceptor} from "./components/user/service/auth.interceptor";
import { AdminComponent } from './components/admin/admin.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {AddCarComponent} from "./components/admin/add-car/add-car.component";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { EditCarComponent } from './components/admin/edit-car/edit-car.component';
import { OurFleetComponent } from './components/car/our-fleet/our-fleet.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CarRentalComponent } from './components/car/car-rental/car-rental.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import { CarCardComponent } from './components/car/car-card/car-card.component';
import { ConfirmReservationDialogComponent } from './components/reservation/confirm-reservation-dialog/confirm-reservation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ConfirmRegisterDialogComponent } from './components/register/confirm-register-dialog/confirm-register-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ConfirmAddCarDialogComponent } from './components/admin/add-car/confirm-add-car-dialog/confirm-add-car-dialog.component';
import { ConfirmEditCarDialogComponent } from './components/admin/edit-car/confirm-edit-car-dialog/confirm-edit-car-dialog.component';
import { ConfirmEditUserDialogComponent } from './components/user/confirm-edit-user-dialog/confirm-edit-user-dialog.component';
import { EmailDuplicateDialogComponent } from './components/register/email-duplicate-dialog/email-duplicate-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ForbiddenComponent,
    AddCarComponent,
    EditCarComponent,
    OurFleetComponent,
    CarRentalComponent,
    ReservationComponent,
    CarCardComponent,
    ConfirmReservationDialogComponent,
    ConfirmRegisterDialogComponent,
    ErrorDialogComponent,
    ConfirmAddCarDialogComponent,
    ConfirmEditCarDialogComponent,
    ConfirmEditUserDialogComponent,
    EmailDuplicateDialogComponent
  ],
    imports: [
        BrowserModule,
        RoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatButtonModule,
        LayoutModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        FormsModule,
        MatMenuModule,
        MatCardModule,
        MatRippleModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatTableModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        FlexLayoutModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatDialogModule
    ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
