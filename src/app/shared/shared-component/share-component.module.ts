import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedMaterialModule } from '../shared-material.module';
import { AppLoaderComponent } from './app-loader/app-loader.component';
import { AppLoaderService } from './app-loader/app-loader.service';


const components = [FooterComponent, HeaderComponent, AppLoaderComponent];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedMaterialModule
  ],
  exports: components,
  providers: [AppLoaderService]
})
export class SharedComponentModule { }
