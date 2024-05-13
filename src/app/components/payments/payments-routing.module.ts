import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './payments.component';
import { CreateNewPaymentComponent } from './create-new-payment/create-new-payment.component';
import { InvoiceComponent } from '../user/invoice/invoice.component';
import { PaymentExportPdfComponent } from './payment-export-pdf/payment-export-pdf.component';


const routes: Routes = [
  {
    path: '', component: PaymentsComponent,
  },
  {
    path: 'create_new', component: CreateNewPaymentComponent,
  },
  {
    path: 'invoice/:id',
    component: InvoiceComponent,
  },
  {
    path: 'export',
    component: PaymentExportPdfComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }

