import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './components/user/user.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {FormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import { HomePageComponent } from './components/home-page/home-page.component';
import {MatCardModule} from "@angular/material/card";
import {MatRippleModule} from "@angular/material/core";
import {RouterModule} from "@angular/router";
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    HomePageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'login', component: LoginComponent }
    ]),
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
    MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
