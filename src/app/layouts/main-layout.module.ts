import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule  } from '@progress/kendo-angular-dateinputs';
import { MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { GridModule, PDFModule, ExcelModule  } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { MainLayoutRoutes } from './main-layout.routing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DeviceHistoryComponent } from '../reports/devicehistory.component';
import { XYChartComponent } from '../reports/xychart.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DatePickerModule,
    MultiSelectModule,
    GridModule, 
    PDFModule,
    ExcelModule,
    ButtonsModule,
    TabStripModule
  ],
  declarations: [
    DashboardComponent,
    DeviceHistoryComponent,
    XYChartComponent
  ],
  providers:[DatePipe]
})

export class MainLayoutModule {}
