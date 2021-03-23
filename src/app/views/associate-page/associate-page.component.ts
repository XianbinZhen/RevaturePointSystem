
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/shared/models/employee';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { AppLoaderService } from 'src/app/shared/shared-component/app-loader/app-loader.service';
import {SharedMaterialModule} from 'src/app/shared/shared-material.module';


@Component({
  selector: 'app-associate-page',
  templateUrl: './associate-page.component.html',
  styleUrls: ['./associate-page.component.scss']
})
export class AssociatePageComponent implements OnInit{

  constructor(private employeeService:EmployeeService, private userAuthService: UserAuthService, private snackbar: MatSnackBar, private loader: AppLoaderService) { 
  }
  
  jwt = this.userAuthService.getJwtToken();
  scrollbar=false;
  emp!:Employee; 
  batchmates:Employee[] = [];
  displayedColumns: string[] = ['fname', 'currentRevaPoints'];
  
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!:MatTableDataSource<Employee>;
 
  // changes view if page size is too small
  @HostListener('window:resize', ['$event'])
  onResize(event:UIEvent) {
    if(event.target != null){
      const x = event.target as Window; 
      if(x.innerWidth < 1200){
        this.scrollbar = true;
      }else{
        this.scrollbar = false
      }
    }
  }
  async ngOnInit(){
    if(window.innerWidth < 1200){
      this.scrollbar = true;
    }
    // Had to use async here to wait for employee data
    await this.getLoggedInEmployee();
    
    this.loader.open();

    this.employeeService.getLoggedInEmployeeBatch(this.emp).subscribe(
       (res) => {
        this.batchmates = res;
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

  async getLoggedInEmployee(){
    this.emp =  await this.employeeService.getLoggedInEmployee().toPromise();
  }
}
