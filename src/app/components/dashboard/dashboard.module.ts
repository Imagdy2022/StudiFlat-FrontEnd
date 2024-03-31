import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { KnobModule } from 'primeng/knob';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';

import { IgxDoughnutChartModule, IgxRingSeriesModule, IgxLegendModule, IgxItemLegendModule } from "igniteui-angular-charts";
import { DashboardRoutingModule } from './dashboard-routing.module';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,ChartModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    KnobModule,
    ToastModule,IgxDoughnutChartModule,
    IgxRingSeriesModule,
    IgxLegendModule,
    IgxItemLegendModule, 
    DashboardRoutingModule
    ],
})
export class DashboardModule { }
