import { InquiriesComponent } from './inquiries.component';

import { ViewInquireComponent } from './view-inquire/view-inquire.component';
import { InquireOfferComponent } from './inquire-offer/inquire-offer.component';
import { InquireEditComponent } from './inquire-edit/inquire-edit.component';

import { CreacteContractComponent } from './creacte-contract/creacte-contract.component';

import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
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
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { InquiriesoutingModule } from './inquiries-routing.module';

import { AccordionModule } from 'primeng/accordion';
const routes: Routes = [];

@NgModule({
  declarations: [
    InquiriesComponent,
    ViewInquireComponent,
    InquireOfferComponent,
    InquireEditComponent,
    CreacteContractComponent,
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    SharedModule,
    FormsModule,
    DropdownModule,
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
    InquiriesoutingModule,
    CardModule,
    RatingModule,
    AccordionModule
  ],
  exports: [],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InquiriesModule {}
