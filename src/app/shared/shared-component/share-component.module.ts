import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedMaterialModule } from '../shared-material.module';


const components = [FooterComponent, HeaderComponent];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedMaterialModule
  ],
  exports: components
})
export class SharedComponentModule { }
