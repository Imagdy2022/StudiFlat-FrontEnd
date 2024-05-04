import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelInquire2Component } from './cancel-inquire2.component';
import { ViewCancelComponent } from './view-cancel/view-cancel.component';
import { CheckoutInqqComponent } from '../checkout-inqq/checkout-inqq.component';
import { CheckoutDetailsComponent } from '../checkout-inqq/checkout-details/checkout-details.component';


const routes: Routes = [
  { path: '', component: CancelInquire2Component},
  { path: 'view-cancel/:id', component: ViewCancelComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class cancelRoutingModule { }

