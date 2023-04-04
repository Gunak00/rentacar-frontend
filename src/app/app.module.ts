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
import {ListCarsComponent} from "./components/admin/list-cars/list-cars.component";

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
    ListCarsComponent
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
    MatGridListModule
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
