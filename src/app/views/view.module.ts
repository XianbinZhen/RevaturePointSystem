import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AssociatePageComponent } from './associate-page/associate-page.component';
import { TrainerPageComponent } from './trainer-page/trainer-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const components = [
  HomePageComponent,
  LoginPageComponent,
  AssociatePageComponent,
  TrainerPageComponent,
  RegisterPageComponent,
];

@NgModule({
  declarations: components,
  imports: [CommonModule],
  exports: components,
})
export class ViewModule {}
