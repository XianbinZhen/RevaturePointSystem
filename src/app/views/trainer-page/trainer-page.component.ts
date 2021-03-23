import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.scss'],
})
export class TrainerPageComponent implements OnInit {
  
  defaultThumbnail =
    'https://firebasestorage.googleapis.com/v0/b/zhen-305115.appspot.com/o/REVPOINTSYS%2F27315031.jpg?alt=media&token=fbd77075-1f08-41c6-83fc-8560578b20f2';
  imgThumbnail = '';

  constructor(private userAuthService: UserAuthService) {}

  ngOnInit(): void {
    this.userAuthService
      .getEmployeeByID(this.userAuthService.getUser())
      .subscribe(
        (res) => {
          this.imgThumbnail = res.imgURL;
        },
        (error) => {
          console.log('error', error);
        }
      );
  }

  logout() {
    this.userAuthService.logout();
  }
}
