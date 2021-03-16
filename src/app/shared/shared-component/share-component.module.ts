import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


const components = [FooterComponent, HeaderComponent];

@NgModule({
  declarations: components,
  imports: [
    CommonModule
  ],
  exports: components
})
export class SharedComponentModule { }
