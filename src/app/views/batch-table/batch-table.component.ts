import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { Employee } from 'src/app/shared/models/employee';
import { AssociateService } from 'src/app/shared/services/associate.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { SelectBatchIdService } from 'src/app/shared/services/select-batch-id.service';
import { AppLoaderService } from 'src/app/shared/shared-component/app-loader/app-loader.service';

@Component({
  selector: 'app-batch-table',
  templateUrl: './batch-table.component.html',
  styleUrls: ['./batch-table.component.scss']
})
export class BatchTableComponent implements OnInit {
  batchId:string = "0";
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
    private associateService: AssociateService,
    private loader: AppLoaderService,
    private snackbar: MatSnackBar,
    private employeeService: EmployeeService,
    private batchServie: SelectBatchIdService,
  ) {}

  ngOnInit(): void {
    this.loadBatch();
  }

  loadBatch(){
    this.loader.open();
    this.employeeService.getAllAssociatesByBatch(Number.parseInt(this.batchId)).subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource<Employee>(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loader.close();
      },
      (error) => {
        console.log("error", error);
        this.snackbar.open(error?.error?.message || error?.error?.error, 'error', {
          duration: 3000,
        });
        this.loader.close();
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
