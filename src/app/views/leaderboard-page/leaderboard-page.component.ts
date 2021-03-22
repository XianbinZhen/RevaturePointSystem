import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/shared/models/employee';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { AppLoaderComponent } from 'src/app/shared/shared-component/app-loader/app-loader.component';
import { AppLoaderService } from 'src/app/shared/shared-component/app-loader/app-loader.service';

@Component({
  selector: 'app-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.scss'],
})
export class LeaderboardPageComponent implements OnInit {
  displayedColumns: string[] = [
    'allTimeRevaPoints',
    'currentRevaPoints',
    'fname',
    'lname',
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Employee>;

  constructor(
    private employeeService: EmployeeService,
    private loader: AppLoaderService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loader.open();
    this.employeeService.getAllEmployees().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource<Employee>(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loader.close();
      },
      (error) => {
        console.log("error", error);
        
        this.snackbar.open(error?.error?.error, 'error', {
          duration: 3000,
        });
        this.loader.close();
      }
    );
  }
}
