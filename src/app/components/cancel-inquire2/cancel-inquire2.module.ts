import { CommonModule } from '@angular/common';
import { CancelInquire2Component } from './cancel-inquire2.component';
import { ViewCancelComponent } from './view-cancel/view-cancel.component';

import { RouterModule, Routes } from '@angular/router';
 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';

import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
import { GalleriaModule } from 'primeng/galleria';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ChipModule } from 'primeng/chip';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
const routes: Routes = [];

@NgModule({
  declarations: [CancelInquire2Component,ViewCancelComponent],

  imports: [
    CommonModule,
    PaginatorModule,
    SharedModule,
    FormsModule,
    DropdownModule,
    RatingModule,
    TableModule,
    CalendarModule,
    ReactiveFormsModule,
    TagModule,
    ProgressSpinnerModule,
    ButtonModule,
    ToastModule,
    GalleriaModule,
    BreadcrumbModule,
    ChipModule,
    PdfViewerModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CancelInquire2Module { }
