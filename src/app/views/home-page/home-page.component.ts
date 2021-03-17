import { Component, OnInit } from '@angular/core';
import { AppLoaderService } from 'src/app/shared/shared-component/app-loader/app-loader.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private loader: AppLoaderService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.loader.open();
    setTimeout(() => {
      this.loader.close();
    }, 1000);
  }

  openSnackbar(): void {
    this.snackbar.open("message","action", {
      duration: 5000
    });
  }

}
