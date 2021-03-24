import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee';
import { Prize } from 'src/app/shared/models/prize';
import { TrainerService } from 'src/app/shared/services/trainer.service';
import { AppLoaderService } from 'src/app/shared/shared-component/app-loader/app-loader.service';

@Component({
  selector: 'app-give-revature-point',
  templateUrl: './give-revature-point.component.html',
  styleUrls: ['./give-revature-point.component.scss'],
})
export class GiveRevaturePointComponent implements OnInit {
  amount: number = 100;
  changeValue = false;

  actionType: string = 'Give away';
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
        employee.allTimeRevaPoints += this.amount;
        employee.currentRevaPoints += this.amount;
        this.trainerService.updateEmployee(employee).subscribe(
          (res) => {
            this.changeValue = !this.changeValue;
            this.snackbar.open('Employee updated', 'OK', {
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
