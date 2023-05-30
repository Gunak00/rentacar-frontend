import {Component, OnInit} from '@angular/core';
import {User} from "./model/user";
import {AuthService} from "./service/auth.service";
import {UserService} from "./service/user.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {verifyHostBindings} from "@angular/compiler";
import {catchError, of} from "rxjs";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {ConfirmRegisterDialogComponent} from "../register/confirm-register-dialog/confirm-register-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmEditCarDialogComponent
} from "../admin/edit-car/confirm-edit-car-dialog/confirm-edit-car-dialog.component";
import {ConfirmEditUserDialogComponent} from "./confirm-edit-user-dialog/confirm-edit-user-dialog.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  public user: User;
  public editUser: User;
  public editUserForm: FormGroup;
  constructor(private authService: AuthService, private userService: UserService,
              private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.newForm();
  }

  ngOnInit(): void {
    this.userService.getUserByEmail(this.authService.getEmail(), this.authService.getToken()).subscribe(currentUser => {
      this.user = currentUser;
      console.log(currentUser);
      this.editUser = currentUser;
      this.setForm(currentUser);
    })
  }

  private setForm(user: User){
    this.editUserForm = this.formBuilder.group({
      firstName: new FormControl(user.firstName, [Validators.required]),
      lastName: new FormControl(user.lastName, [Validators.required]),
      email: new FormControl(user.email, [Validators.required, Validators.email]),
      newPassword: new FormControl(''),
      drivingLicenseNumber: new FormControl(user.drivingLicenseNumber, [Validators.required]),
      age: new FormControl(user.age, [Validators.required]),
    })
  }

  private newForm(){
    this.editUserForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl(''),
      drivingLicenseNumber: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
    })
  }

  onSubmit() {
    console.log(this.editUserForm.value);

    this.editUser.firstName = this.editUserForm.value.firstName;
    this.editUser.lastName = this.editUserForm.value.lastName;
    this.editUser.email = this.editUserForm.value.email;
    this.editUser.drivingLicenseNumber = this.editUserForm.value.drivingLicenseNumber;
    this.editUser.role = this.user.role;
    if (this.editUserForm.value.newPassword != '')
      this.editUser.password = this.editUserForm.value.newPassword;

    console.log(this.editUser);

    this.userService.updateUser(this.editUser, this.authService.getToken())
      .pipe(
        catchError(err => {
          this.dialog.open(ErrorDialogComponent);
          return of(err);
        }))
      .subscribe(response => {
        console.log(response)
        this.dialog.open(ConfirmEditUserDialogComponent);
      })
  }

}
