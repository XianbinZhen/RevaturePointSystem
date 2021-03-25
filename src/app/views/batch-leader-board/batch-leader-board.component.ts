import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/shared/models/employee';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { TrainerService } from 'src/app/shared/services/trainer.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { AppLoaderService } from 'src/app/shared/shared-component/app-loader/app-loader.service';

@Component({
  selector: 'app-batch-leader-board',
  templateUrl: './batch-leader-board.component.html',
  styleUrls: ['./batch-leader-board.component.scss'],
})
export class BatchLeaderBoardComponent implements OnInit {
  displayedColumns: string[] = [
    'imgURL',
    'batchId',
    'allTimeRevaPoints',
    'currentRevaPoints',
    'fname',
    'lname',
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Employee>;

  constructor(
    private loader: AppLoaderService,
    private snackbar: MatSnackBar,
    private employeeService: EmployeeService,
    private trainerService: TrainerService,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.loader.open();
    this.trainerService
      .getEmployeeById(this.userAuthService.getUser().employeeId!)
      .subscribe(
        (res) => {
          this.employeeService.getAllAssociatesByBatch(res.batchId).subscribe(
            (res) => {
              this.dataSource = new MatTableDataSource<Employee>(res);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
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
