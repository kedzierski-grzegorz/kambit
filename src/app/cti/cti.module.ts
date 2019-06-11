import { DialogsModule } from '@progress/kendo-angular-dialog';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { CtiCampaignsService } from './shared/cti-campaigns.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtiComponent } from './cti.component';
import { HttpClientModule } from '@angular/common/http';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LoadingDataModule } from '../loading-data/loading-data.module';
import { CtiEditorComponent } from './cti-editor/cti-editor.component';
import { CtiRoutingModule } from './cti-routing.module';

@NgModule({
  declarations: [CtiComponent, CtiEditorComponent],
  imports: [
    CommonModule,
    CtiRoutingModule,
    HttpClientModule,
    ButtonsModule,
    GridModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    InputsModule,
    LoadingDataModule,
    DialogsModule
  ],
  providers: [CtiCampaignsService]
})
export class CtiModule { }
