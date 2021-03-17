import { Component, OnInit } from '@angular/core';
import { AppLoaderService } from 'src/app/shared/shared-component/app-loader/app-loader.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PriceService } from 'src/app/shared/services/price.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private loader: AppLoaderService,
    private snackbar: MatSnackBar,
    private priceService: PriceService) { }

  ngOnInit(): void {
  }

  openSnackbar(): void {
    this.snackbar.open("message","action", {
      duration: 5000
    });
  }

  getAllPrice() {
    this.loader.open();
    this.priceService.getAllPrice().subscribe( res => {
      console.log(res);
      this.loader.close();
    })
  }

}
