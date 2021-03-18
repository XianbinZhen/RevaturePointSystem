import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private userAuth: UserAuthService, private snack: MatSnackBar) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userAuth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/login"], {
        queryParams: {
          return: state.url
        }
      });
      this.snack.open('Please login to access this page!', 'OK', {duration: 6000});
      return false;
    }
  }

}
