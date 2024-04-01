import { ProgressSpinnerComponent } from './components/progressSpinner/progress-spinner/progress-spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { TagModule } from 'primeng/tag';

import { ApartmentEquipmentDetailsSectionsComponent } from './components/apartment-equipment-details-sections/apartment-equipment-details-sections.component';
import { AddNewFieldApartmentButtonComponent } from './components/add-new-field-apartment-button/add-new-field-apartment-button.component';
import { StatusNewFieldApartmentComponent } from './components/status-new-field-apartment/status-new-field-apartment.component';
import { CreateContractSectionsComponent } from './components/create-contract-sections/create-contract-sections.component';
import { AddNewFieldApartmentComponent } from './components/add-new-field-apartment/add-new-field-apartment.component';
import { TotalDetailDashboardComponent } from './components/total-detail-dashboard/total-detail-dashboard.component';
import { DownloadPDFButtonComponent } from './components/download-pdfbutton/download-pdfbutton.component';
import { StatisticsTable1Component } from './components/statistics-table1/statistics-table1.component';
import { GeneralInfoUserComponent } from './components/general-info-user/general-info-user.component';
import { StatisticsTableComponent } from './components/statistics-table/statistics-table.component';
import { AddNewButtonComponent } from './components/add-new-button/add-new-button.component';
import { ShareButtonComponent } from './components/share-button/share-button.component';
import { PrintButtonComponent } from './components/print-button/print-button.component';
import { HeaderTableComponent } from './components/header-table/header-table.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { InputCreateFieldComponent } from './components/input-create-field/input-create-field.component';

import { DataTableComponent } from './components/data-table/data-table.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TableComponent } from './components/table/table/table.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeadComponent } from './components/head/head.component';

import { BadgeModule } from 'primeng/badge';
import { RouterModule } from '@angular/router';

// import * as index from './../shared/models';

@NgModule({
  declarations: [
    AddNewButtonComponent,
    InputCreateFieldComponent,
    DropdownComponent,
    HeadComponent,
    SidebarComponent,
    TotalDetailDashboardComponent,
    AccordionComponent,
    GeneralInfoUserComponent,
    ShareButtonComponent,
    PrintButtonComponent,
    DownloadPDFButtonComponent,
    StatisticsTableComponent,
    StatisticsTable1Component,
    HeaderTableComponent,
    AddNewFieldApartmentComponent,
    StatusNewFieldApartmentComponent,
    AddNewFieldApartmentButtonComponent,
    ApartmentEquipmentDetailsSectionsComponent,
    CreateContractSectionsComponent,
    InputFieldComponent,

    DataTableComponent,
    TableComponent,
    ProgressSpinnerComponent,
  ],

  exports: [
    AddNewButtonComponent,
    InputCreateFieldComponent,

    DropdownComponent,
    HeadComponent,
    SidebarComponent,
    TotalDetailDashboardComponent,
    AccordionComponent,
    GeneralInfoUserComponent,
    ShareButtonComponent,
    PrintButtonComponent,
    DownloadPDFButtonComponent,
    StatisticsTableComponent,
    StatisticsTable1Component,
    HeaderTableComponent,
    AddNewFieldApartmentComponent,
    StatusNewFieldApartmentComponent,
    AddNewFieldApartmentButtonComponent,
    ApartmentEquipmentDetailsSectionsComponent,
    CreateContractSectionsComponent,
    InputFieldComponent,
    DataTableComponent,
    TableComponent,
    ProgressSpinnerComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    SidebarModule,
    ButtonModule,
    RouterModule,
    DropdownModule,
    TagModule,
    ProgressSpinnerModule,
    TableModule,
    PaginatorModule,
    ConfirmPopupModule,
    BadgeModule,
  ],
  providers: [ConfirmationService],
})
export class SharedModule {}
