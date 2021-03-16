import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociatePageComponent } from './views/associate-page/associate-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';
import { TrainerPageComponent } from './views/trainer-page/trainer-page.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomePageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },
  { path: "trainer", component: TrainerPageComponent },
  { path: "associate", component: AssociatePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
