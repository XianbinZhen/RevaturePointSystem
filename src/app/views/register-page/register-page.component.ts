import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar,
    private route: ActivatedRoute, private router: Router,
    private userAuthService: UserAuthService) {}

  ngOnInit() {

    const username = new FormControl('', Validators.required);
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', Validators.required);

    this.signupForm = this.fb.group(
      {
        username,
        password,
        confirmPassword
      }
    );
  }

  onSubmit() {
    if (!this.signupForm?.invalid && this.signupForm.value.password == this.signupForm.value.confirmPassword) {
      console.log(this.signupForm?.value);
      //TODO navigate to route base on role
      const name = this.signupForm.value.username;
      const password = this.signupForm.value.password;
      let user: User = {name, password};
      this.userAuthService.login(user).subscribe( res => {
        user = JSON.parse(atob(res.split('.')[1]));
        console.log(user);
        if(user.role == "admin")
          this.router.navigate(["trainer"]);
        else if (user.role == "associate") {
          this.router.navigate(["associate"]);
        };
      });
      this.router.navigate(["associate"]);
    } else {
      this.snackbar.open("input field is invalid", "close", {
        duration: 3000
      });
    }
  }
}
