import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrainerService } from 'src/app/shared/services/trainer.service';
import { AppLoaderService } from 'src/app/shared/shared-component/app-loader/app-loader.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-prize-page',
  templateUrl: './add-prize-page.component.html',
  styleUrls: ['./add-prize-page.component.scss'],
})
export class AddPrizePageComponent implements OnInit {
  addPrizeForm!: FormGroup;
  progressBarValue: number = 0;
  file?: File;
  downloadURL: string = '';

  constructor(
    private trainerService: TrainerService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private loader: AppLoaderService,
    private fireStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    const prizeName = new FormControl('', Validators.required);
    const prizeCost = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    this.addPrizeForm = this.formBuilder.group({ prizeName, prizeCost, description });
  }

  addPrize(): void {
    this.loader.open();
    if (!this.addPrizeForm?.invalid) {
      // upload file to firebase and get a downloadURL back when success
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
                  this.addPrizeHttp();
                  this.loader.close();
                },
                (error) => {
                  this.snackbar.open(error.error.error, 'error', {
                    duration: 3000,
                  });
                }
              );
            })
          )
          .subscribe();
      } else {
        this.addPrizeHttp();
        this.loader.close();
      }
    } else {
      this.snackbar.open('Input field is invalid', 'close', {
        duration: 3000,
      });
      this.loader.close();
    }
  }

  clearFields(): void {
    this.addPrizeForm.reset();
  }

  uploadFile(e: any) {
    this.file = e.target.files[0];
  }

  // http request to add prize to DB
  addPrizeHttp(): void {
    const prize = {
      priceId: 1,
      name: this.addPrizeForm.value.prizeName,
      cost: this.addPrizeForm.value.prizeCost,
      description:
        this.addPrizeForm.value.description,
      employeeId: 1,
      imgURL: this.downloadURL
    };
    this.trainerService.addPrize(prize).subscribe(
      (res) => {
        console.log('res', res);
        this.snackbar.open('Prize created', 'OK', {
          duration: 3000,
        });
        this.loader.close();
      },
      (error) => {
        console.log(error);
        this.snackbar.open(error.error.error, 'error', {
          duration: 3000,
        });
        this.loader.close();
      }
    );
  }
}
