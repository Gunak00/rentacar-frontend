import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user/service/user.service";
import {User} from "../user/model/user";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {ConfirmRegisterDialogComponent} from "./confirm-register-dialog/confirm-register-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      drivingLicenseNumber: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, this.ageValidator]),
    });
  }

  ageValidator(control: FormControl) {
    let age = control.value;
    if (age < 18) {
      return {'age': true};
    }
    return null;
  }

  onSubmit() {
    // Handle form submission here
    this.userService.addUser(this.registerForm.value)
      .pipe(
        catchError(err => {
          this.dialog.open(ErrorDialogComponent);
          return of(err);
        }))
      .subscribe(response => {
        console.log(response)
        const matDialogRef = this.dialog.open(ConfirmRegisterDialogComponent);
        matDialogRef.afterClosed().subscribe(() => {
          this.router.navigateByUrl('/login').then(null);
        })
      })
  }
}
