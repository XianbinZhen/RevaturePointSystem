import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/shared/models/employee';
import { TrainerService } from 'src/app/shared/services/trainer.service';
import { AppLoaderService } from 'src/app/shared/shared-component/app-loader/app-loader.service';

@Component({
  selector: 'app-assign-batch',
  templateUrl: './assign-batch.component.html',
  styleUrls: ['./assign-batch.component.scss'],
})
export class AssignBatchComponent implements OnInit {
  batchId: number = 1;
  changeValue = false;

  actionType: string = 'Assign';

  constructor(
    private trainerService: TrainerService,
    private loader: AppLoaderService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  action(e: any) {
    this.loader.open();
    this.trainerService.getEmployeeById(e).subscribe(
      (res) => {
        let employee: Employee = res;
        employee.batchId = this.batchId;
        this.trainerService.updateEmployee(employee).subscribe(
          (res) => {
            this.changeValue = !this.changeValue;
            this.snackbar.open("Employee updated", 'OK', {
              duration: 3000,
            });
            this.loader.close();
          },
          (error) => {
            this.snackbar.open(error?.error?.error, 'error', {
              duration: 3000,
            });
            this.loader.close();
          }
        );
      },
      (error) => {
        this.snackbar.open(error?.error?.error, 'error', {
          duration: 3000,
        });
        this.loader.close();
      }
    );
  }
}
