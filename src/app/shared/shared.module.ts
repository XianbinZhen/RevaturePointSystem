import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentModule } from './shared-component/share-component.module';
import { SharedMaterialModule } from './shared-material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedComponentModule,
    SharedMaterialModule
  ],
  exports: [SharedComponentModule]
})
export class SharedModule { }
