import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar,
    private route: ActivatedRoute, private router: Router, 
    private userAuthService: UserAuthService) {}

  ngOnInit() {
    if(this.userAuthService.isLoggedIn()) {
      this.userAuthService.loadUser();
      console.log(this.userAuthService.user);
      this.router.navigate([this.userAuthService.user?.role]);
      this.snackbar.open(`Welcome back ${this.userAuthService.user?.role} ${this.userAuthService.user?.fname}`, "OK", {
        duration: 3000
      });
    }
    const username = new FormControl('', Validators.required);
    const password = new FormControl('', Validators.required);
    this.loginForm = this.fb.group(
      {
        username,
        password
      }
    );
  }

  onSubmit() {
    if (!this.loginForm?.invalid) {
      console.log(this.loginForm?.value);
      //navigate to route base on role
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      let user: User = {username, password};
      this.userAuthService.login(user).subscribe( res => {
        user = res;
        // console.log("user", user)
        this.userAuthService.setUserAndToken(user);
        if(user.role == "trainer")
          this.router.navigate(["trainer"]);
        else if (user.role == "associate") {
          this.router.navigate(["associate"]);
        };
      }, error  => {
        console.log("Error", error);
        this.snackbar.open(error, "error", {
          duration: 3000
        });
        }
      );
    } else {
      this.snackbar.open("input field is invalid", "error", {
        duration: 3000
      });
    }
  }
}
