import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private router: Router, private userAuth: UserAuthService, private snack: MatSnackBar) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userAuth.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(["/login"], {
        queryParams: {
          return: state.url
        }
      });
      this.snack.open("You don't have access to this page!", 'OK', {duration: 6000});
      return false;
    }
  }
}
