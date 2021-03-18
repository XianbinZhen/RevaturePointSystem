import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { AppLoaderService } from 'src/app/shared/shared-component/app-loader/app-loader.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar,
    private route: ActivatedRoute, private router: Router,
    private userAuthService: UserAuthService,
    private loader: AppLoaderService) {}

  ngOnInit() {

    const username = new FormControl('', Validators.required);
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', Validators.required);
    const firstName = new FormControl('', Validators.required);
    const lastName = new FormControl('', Validators.required);

    this.signupForm = this.fb.group(
      {
        username,
        password,
        confirmPassword,
        firstName,
        lastName
      }
    );
  }

  onSubmit() {
    if (!this.signupForm?.invalid && this.signupForm.value.password == this.signupForm.value.confirmPassword) {
      //TODO navigate to route base on role
      const username: string = this.signupForm.value.username;
      const password: string = this.signupForm.value.password;
      const lname: string = this.signupForm.value.lastName;
      const fname: string = this.signupForm.value.firstname;
      const employeeId: number = 0;
      const currentRevaPoints: number = 0;
      const allTimeRevaPoints: number = 0;
      const batchId: number = 0;
      const role: string = "associate";
      let newEmployee: Employee = {username,password,lname,fname, employeeId, currentRevaPoints, allTimeRevaPoints, batchId, role};
      // let user: User = {name: username, password};
      this.loader.open();
      this.userAuthService.register(newEmployee).subscribe( res => {
        newEmployee = JSON.parse(atob(res.split('.')[1]));
        console.log("newEmployee from res: ", newEmployee);
        this.loader.close()
        if(newEmployee.role == "admin")
          this.router.navigate(["trainer"]);
        else if (newEmployee.role == "associate") {
          this.router.navigate(["associate"]);
        };
      });
    } else {
      this.snackbar.open("input field is invalid", "close", {
        duration: 3000
      });
    }
  }
}
