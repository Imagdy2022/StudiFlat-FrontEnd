import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, PathLocationStrategy } from '@angular/common';
import {  CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { KnobModule } from 'primeng/knob';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';

import { IgxDoughnutChartModule, IgxRingSeriesModule, IgxLegendModule, IgxItemLegendModule } from "igniteui-angular-charts";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/_helpers/jwt.interceptor';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { RecentActivitiesComponent } from './recent-activities/recent-activities.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
  declarations: [DashboardComponent, RecentActivitiesComponent],
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
    DashboardRoutingModule,
    TableModule,
    PaginatorModule
    ],

})
export class DashboardModule {

 }
