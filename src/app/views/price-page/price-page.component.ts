import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/shared/models/employee';
import { Prize } from 'src/app/shared/models/prize';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { PriceService } from 'src/app/shared/services/price.service';
import { TrainerService } from 'src/app/shared/services/trainer.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { AppLoaderService } from 'src/app/shared/shared-component/app-loader/app-loader.service';

@Component({
  selector: 'app-price-page',
  templateUrl: './price-page.component.html',
  styleUrls: ['./price-page.component.scss'],
})
export class PricePageComponent implements OnInit {
  @Output() actionEvent = new EventEmitter();
  @Input() actionType: string = '';
  @Input() changeValue = false;
  showAction = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  data!: MatTableDataSource<Prize>;

  constructor(
    private priceService: PriceService,
    private loader: AppLoaderService,
    private snackbar: MatSnackBar,
    private employeeService: EmployeeService,
    private trainerService: TrainerService,
    private userAuthService: UserAuthService
  ) {}

  displayedColumns: string[] = ['name', 'cost', 'description', 'action'];

  ngOnInit(): void {
    this.getAllPrizes();
  }

  getAllPrizes() {
    this.loader.open();
    this.priceService.getAllPrice().subscribe(
      (res) => {
        this.data = new MatTableDataSource<Prize>(res);
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;
        this.loader.close();
      },
      (error) => {
        console.log('error', error);
        this.snackbar.open(error?.error?.error, 'error', {
          duration: 3000,
        });
        this.loader.close();
      }
    );
  }

  // updatePrizes(element: Prize) {
  //   let prize = element;
  //   this.employeeService.updateAssociateById(prize);
  // }

  updatePrizes(prize: Prize) {
    console.log(prize);

    this.loader.open();
    this.trainerService
      .getEmployeeById(this.userAuthService.getUser().employeeId!)
      .subscribe((res) => {
        if (res.currentRevaPoints < prize.cost) {
          this.snackbar.open('Not enough point to redeem', 'close', {
            duration: 3000,
          });
          this.loader.close();
        } else {
          res.currentRevaPoints -= prize.cost;
          res.prizes.push(prize);
          this.trainerService.updateEmployee(res).subscribe(
            (res) => {
              this.snackbar.open('You redeemed a prize', 'OK', {
                duration: 3000,
              });
              this.loader.close();
            },
            (error) => {
              this.snackbar.open('You already have this prize', 'close', {
                duration: 3000,
              });
              this.loader.close();
            }
          );
        }
      });
  }
}
