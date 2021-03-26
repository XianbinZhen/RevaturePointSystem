import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/shared/models/employee';
import { AssociateService } from 'src/app/shared/services/associate.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { AppLoaderService } from 'src/app/shared/shared-component/app-loader/app-loader.service';

@Component({
  selector: 'app-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.scss'],
})
export class LeaderboardPageComponent implements OnInit, OnChanges {
  @Output() actionEvent = new EventEmitter();
  @Input() actionType: string = '';
  @Input() changeValue = false;
  showAction = false;

  displayedColumns: string[] = [
    'imgURL',
    'batchId',
    'allTimeRevaPoints',
    'currentRevaPoints',
    'fname',
    'lname',
    'action',
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Employee>;

  constructor(
    private associateService: AssociateService,
    private loader: AppLoaderService,
    private snackbar: MatSnackBar,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadDate();
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    if (
      changes['changeValue'] &&
      changes['changeValue'].previousValue !== undefined &&
      !changes['changeValue'].isFirstChange()
    ) {
      this.loadDate();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadDate() {
    this.loader.open();
    this.employeeService.getAllAssociates().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource<Employee>(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loader.close();
      },
      (error) => {
        console.log('error', error);
        this.snackbar.open(error?.error?.message || error?.error?.error, 'error', {
          duration: 3000,
        });
        this.loader.close();
      }
    );
  }
}
