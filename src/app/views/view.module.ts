import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AssociatePageComponent } from './associate-page/associate-page.component';
import { TrainerPageComponent } from './trainer-page/trainer-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { AppRoutingModule } from '../app-routing.module';
import { LeaderboardPageComponent } from './leaderboard-page/leaderboard-page.component';
import { PricePageComponent } from './price-page/price-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddPrizePageComponent } from './add-prize-page/add-prize-page.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { BatchTableComponent } from './batch-table/batch-table.component';
import { GiveRevaturePointComponent } from './give-revature-point/give-revature-point.component';

const components = [
  HomePageComponent,
  LoginPageComponent,
  AssociatePageComponent,
  TrainerPageComponent,
  RegisterPageComponent,
  LeaderboardPageComponent,
  PricePageComponent,
  NotFoundPageComponent,
  AddPrizePageComponent,
  BatchTableComponent,
  GiveRevaturePointComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    SharedMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDXYgAR6kVbM_9IPUUVPDYhDFOkKEhvibc',
      authDomain: 'zhen-305115.firebaseapp.com',
      databaseURL: 'https://zhen-305115-default-rtdb.firebaseio.com',
      projectId: 'zhen-305115',
      storageBucket: 'zhen-305115.appspot.com',
      messagingSenderId: '144990151322',
      appId: '1:144990151322:web:b6287b9cf462649be37523',
      measurementId: 'G-1LCRPXZGRZ',
    }),
    AngularFireStorageModule,
  ],
  exports: components,
})
export class ViewModule {}
