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
      const name = this.loginForm.value.username;
      const password = this.loginForm.value.password;
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
    } else {
      this.snackbar.open("input field is invalid", "close", {
        duration: 3000
      });
    }
  }
}
