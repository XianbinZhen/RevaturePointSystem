import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Employee } from 'src/app/shared/models/employee';
import { Prize } from 'src/app/shared/models/prize';
import { User } from 'src/app/shared/models/user';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { AppLoaderService } from 'src/app/shared/shared-component/app-loader/app-loader.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  defaultIMG?: string = '../../../assets/img/background.jpg';
  uploadIMG: any;
  signupForm!: FormGroup;
  progressBarValue: number = 0;
  file?: File;
  downloadURL: string = '';

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar,
    private route: ActivatedRoute, private router: Router,
    private userAuthService: UserAuthService,
    private fireStorage: AngularFireStorage,
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
    this.loader.open();

    if (!this.signupForm?.invalid && this.signupForm.value.password == this.signupForm.value.confirmPassword) {
      if (this.file) {
        const filePath = `/REVPOINTSYS/${Math.random()}${this.file.name}`;
        const fileRef = this.fireStorage.ref(filePath);
        const task: AngularFireUploadTask = this.fireStorage.upload(
          filePath,
          this.file
        );
        task.percentageChanges().subscribe((res) => {
          this.progressBarValue = res!;
        });
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(
                (res) => {
                  this.downloadURL = res;
                  this.registerEmployee();
                  this.loader.close();
                },
                (error) => {
                  this.snackbar.open(error?.error?.error, 'error', {
                    duration: 3000,
                  });
                }
              );
            })
          )
          .subscribe();
      } else {
        this.registerEmployee();
        this.loader.close();
      }
    } else {
      this.snackbar.open("Input field is invalid", "close", {
        duration: 3000
      });
      this.loader.close();
    }
  }

  
  registerEmployee() {
    //TODO navigate to route base on role
    const username: string = this.signupForm.value.username;
    const password: string = this.signupForm.value.password;
    const lname: string = this.signupForm.value.lastName;
    const fname: string = this.signupForm.value.firstName;
    const employeeId: number = 0;
    const currentRevaPoints: number = 0;
    const allTimeRevaPoints: number = 0;
    const batchId: number = 0;
    const role: string = "associate";
    const imgURL: string = this.downloadURL;
    const prizes: Prize[] = [];
    let newEmployee: Employee = {username,password,lname,fname, employeeId, currentRevaPoints, allTimeRevaPoints, batchId, role, imgURL, prizes};

    this.userAuthService.register(newEmployee).subscribe( res => {
      this.snackbar.open("User created", "close", {
        duration: 3000
      });
      this.userAuthService.login({username, password}).subscribe( res => {
        let user: User = res;
        this.loader.close();
        this.userAuthService.setUserAndToken(user);
        this.userAuthService.loadUser();
        if(user.role == "trainer")
          this.router.navigate(["trainer"]);
        else if (user.role == "associate") {
          this.router.navigate(["associate"]);
        };
      }, error => {
        console.log(error);
        this.snackbar.open(error?.error?.error, "error", {
          duration: 3000
        });
        this.loader.close();
      });
    }, error => {
      console.log("error", error);
      this.snackbar.open(error?.error?.error, "error", {
        duration: 3000
      });
      this.loader.close();
    });
  }


  clearFields(): void {
    this.signupForm.reset();
    this.uploadIMG = null;
    this.file = undefined;
  }
  
  uploadFile(e:any){
    this.file = e.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.readAsDataURL(this.file!);
    myReader.onload = _event => {
      this.uploadIMG = myReader.result;
    }
  }

}
