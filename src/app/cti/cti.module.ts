import { ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtiComponent } from './cti.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CtiComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ButtonsModule,
    GridModule,
    ReactiveFormsModule
  ]
})
export class CtiModule { }
