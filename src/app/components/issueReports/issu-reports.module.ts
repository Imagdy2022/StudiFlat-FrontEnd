import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ReportsDetailsComponent } from './reports-details/reports-details.component';
import { MainFileComponent } from './main-file/main-file.component';

import { AssginIssueComponent } from './assgin-issue/assgin-issue.component';

import { ReportPrintComponent } from './report-print/report-print.component';

import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { ChipModule } from 'primeng/chip';
const routes: Routes = [];

@NgModule({
  declarations: [
    ReportsDetailsComponent,
    MainFileComponent,
    AssginIssueComponent,
    ReportPrintComponent,
  ],
  imports: [
    CommonModule,
    
    SharedModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    ReactiveFormsModule,
    TagModule,
    ProgressSpinnerModule,
    ButtonModule,
    ToastModule,
    ChipModule,
    RouterModule.forChild(routes),
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IssuReportsModule {}
