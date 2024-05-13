import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';


import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentsComponent } from './payments.component';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
 import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { CreateNewPaymentComponent } from './create-new-payment/create-new-payment.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { PaymentExportPdfComponent } from './payment-export-pdf/payment-export-pdf.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    PaymentsComponent,
    CreateNewPaymentComponent,
    PaymentExportPdfComponent,
   ],
   exports: [CreateNewPaymentComponent],
  imports: [
    CommonModule,
    PaginatorModule,
    SharedModule,
    FormsModule,
    DropdownModule,
    TableModule,
    ReactiveFormsModule,
    TagModule,
    ProgressSpinnerModule,
    ButtonModule,
    ToastModule,
    PaymentsRoutingModule,
    CalendarModule
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PaymentsModule { }
