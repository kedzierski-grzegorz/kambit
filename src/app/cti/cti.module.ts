import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtiComponent } from './cti.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CtiComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class CtiModule { }
