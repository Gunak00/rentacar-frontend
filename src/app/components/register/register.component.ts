import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user/service/user.service";
import {User} from "../user/model/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      drivingLicenseNumber: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    // Handle form submission here
    this.userService.addUser(this.registerForm.value).subscribe(response =>{
      console.log(response);
    })
  }
}
