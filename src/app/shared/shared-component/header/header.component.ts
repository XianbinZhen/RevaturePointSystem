import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  isLogin: boolean  = false;

  constructor(private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.isLogin = this.userAuthService.isLoggedIn();
  }

  logout() {
    this.isLogin = false;
    this.userAuthService.logout();
  }

}
