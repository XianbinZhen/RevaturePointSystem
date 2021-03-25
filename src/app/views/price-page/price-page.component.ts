import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Prize } from 'src/app/shared/models/prize';
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
  actionType: string = 'Redeem';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  data!: MatTableDataSource<any>;
  myPrize: Prize[] = [];
  points: number = 0;

  constructor(
    private priceService: PriceService,
    private loader: AppLoaderService,
    private snackbar: MatSnackBar,
    private trainerService: TrainerService,
    private userAuthService: UserAuthService
  ) {}

  displayedColumns: string[] = [
    'imgURL',
    'name',
    'cost',
    'description',
    'action',
  ];

  ngOnInit(): void {
    this.loadMyPrize();
  }

  loadMyPrize() {
    this.trainerService
      .getEmployeeById(this.userAuthService.getUser().employeeId!)
      .subscribe(
        (res) => {
          this.myPrize = res.prizes;
          this.points = res.currentRevaPoints;
          this.getAllPrizes();
        },
        (error) => {
          this.snackbar.open(error?.error?.error, 'error', {
            duration: 3000,
          });
        }
      );
  }

  getAllPrizes() {
    this.loader.open();
    this.priceService.getAllPrice().subscribe(
      (res) => {
        res = res.map((e) => ({ ...e, redeemable: this.hasPrize(e) }));
        this.data = new MatTableDataSource<Prize>(res);
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;
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

  hasPrize(prize: Prize): boolean {
    let i = this.myPrize.findIndex((e) => e.prizeId === prize.prizeId);
    // console.log(i === -1);
    return !(i === -1);
  }
  // updatePrizes(element: Prize) {
  //   let prize = element;
  //   this.employeeService.updateAssociateById(prize);
  // }

  updatePrizes(prize: Prize) {
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
          // res.currentRevaPoints -= prize.cost;
          res.prizes.push(prize);
          this.trainerService.updateEmployee(res).subscribe(
            (res) => {
              this.snackbar.open('You redeemed a prize', 'OK', {
                duration: 3000,
              });
              this.loader.close();
              this.loadMyPrize();
            },
            (error) => {
              this.snackbar.open(error?.error?.message, 'error', {
                duration: 3000,
              });
              this.loader.close();
            }
          );
        }
      });
  }
}
