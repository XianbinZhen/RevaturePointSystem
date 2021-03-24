import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-associate-home',
  templateUrl: './associate-home.component.html',
  styleUrls: ['./associate-home.component.scss']
})
export class AssociateHomeComponent implements OnInit {

  constructor(private userAuthService: UserAuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.userAuthService.logout();
  }
}
