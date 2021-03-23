import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService } from './shared/services/admin-auth-guard.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { AddPrizePageComponent } from './views/add-prize-page/add-prize-page.component';
import { AssociatePageComponent } from './views/associate-page/associate-page.component';
import { GiveRevaturePointComponent } from './views/give-revature-point/give-revature-point.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { LeaderboardPageComponent } from './views/leaderboard-page/leaderboard-page.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';
import { PricePageComponent } from './views/price-page/price-page.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';
import { TrainerPageComponent } from './views/trainer-page/trainer-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'trainer',
    component: TrainerPageComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
    children: [
      { path: '', redirectTo: "leaderboard", pathMatch: 'full' },
      { path: 'addPrize', component: AddPrizePageComponent },
      { path: 'leaderboard', component: LeaderboardPageComponent },
      { path: 'givePoint', component: GiveRevaturePointComponent }
    ],
  },
  {
    path: 'associate',
    component: AssociatePageComponent,
    // canActivate: [AuthGuardService]
  },
  { path: 'leaderboard', component: LeaderboardPageComponent },
  { path: 'price', component: PricePageComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
