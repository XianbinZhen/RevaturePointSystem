import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Employee } from 'src/app/shared/models/employee';
import { User } from 'src/app/shared/models/user';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { TrainerService } from 'src/app/shared/services/trainer.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { AppLoaderService } from 'src/app/shared/shared-component/app-loader/app-loader.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  signupForm!: FormGroup;
  progressBarValue: number = 0;
  file?: File;
  downloadURL: string = '';
  imgThumbnail = '';
  uploadIMG: any;
  employee!: Employee;
  username!: string;

  constructor(
    private loader: AppLoaderService,
    private snackbar: MatSnackBar,
    private trainerService: TrainerService,
    private userAuthService: UserAuthService,
    private fb: FormBuilder,
    private fireStorage: AngularFireStorage,

  ) {}

  ngOnInit(): void {
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', Validators.required);
    const firstName = new FormControl('', Validators.required);
    const lastName = new FormControl('', Validators.required);
    this.signupForm = this.fb.group({
      password,
      confirmPassword,
      firstName,
      lastName,
    });

    this.loader.open();
    this.trainerService
      .getEmployeeById(this.userAuthService.getUser().employeeId!)
      .subscribe(
        (res) => {
          this.username = res.username;
          this.employee = res;
          this.signupForm.setValue({
            firstName: res.fname,
            lastName: res.lname,
            password: res.password,
            confirmPassword: res.password,
          });
          this.imgThumbnail = res.imgURL;
          this.loader.close();
        },
        (error) => {
          this.snackbar.open(error?.error?.error, 'error', {
            duration: 3000,
          });
          this.loader.close();
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
                  this.updateEmployee();
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
        this.updateEmployee();
        this.loader.close();
      }
    } else {
      this.snackbar.open("Input field is invalid", "close", {
        duration: 3000
      });
      this.loader.close();
    }
  }


  updateEmployee() {
    const password: string = this.signupForm.value.password;
    const lname: string = this.signupForm.value.lastName;
    const fname: string = this.signupForm.value.firstName;
    this.downloadURL = this.downloadURL || this.employee.imgURL;
    let newEmployee: Employee = { ...this.employee, password, lname, fname, imgURL: this.downloadURL };
    this.trainerService.updateEmployee(newEmployee).subscribe( res => {
      this.snackbar.open("User updated", "close", {
        duration: 3000
      });
      this.userAuthService.login({username: this.employee.username, password}).subscribe( res => {
        let user: User = res;
        this.loader.close();
        this.userAuthService.setUserAndToken(user);
        this.userAuthService.loadUser();
        // if(user.role == "trainer")
        //   this.router.navigate(["trainer"]);
        // else if (user.role == "associate") {
        //   this.router.navigate(["associate"]);
        // };
        
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


  uploadFile(e:any){
    this.file = e.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.readAsDataURL(this.file!);
    myReader.onload = _event => {
      this.uploadIMG = myReader.result;
    }
  }
}
