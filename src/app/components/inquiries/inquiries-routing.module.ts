import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquiriesComponent } from './inquiries.component';
import { ViewInquireComponent } from './view-inquire/view-inquire.component';
import { CreacteContractComponent } from './creacte-contract/creacte-contract.component';
import { InquireEditComponent } from './inquire-edit/inquire-edit.component';
import { InquireOfferComponent } from './inquire-offer/inquire-offer.component';
import { CancelInquire2Component } from '../cancel-inquire2/cancel-inquire2.component';
import { ViewCancelComponent } from '../cancel-inquire2/view-cancel/view-cancel.component';
import { CheckoutInqqComponent } from '../checkout-inqq/checkout-inqq.component';
import { CheckoutDetailsComponent } from '../checkout-inqq/checkout-details/checkout-details.component';


const routes: Routes = [
  {
    path: '', component: InquiriesComponent,
  },
  {
    path: 'view-inquire/:id', component: ViewInquireComponent,
  },
  {
    path: 'inquire-offer/:id', component: InquireOfferComponent,
  },
  {
    path: 'inquire-edit/:id', component: InquireEditComponent,
  },
  {
    path: 'create-contract/:id', component: CreacteContractComponent,
  },
  { path: 'cancel-inquire', component: CancelInquire2Component},
  { path: 'view-cancel/:id', component: ViewCancelComponent },

  { path: 'checkout-inquire', component: CheckoutInqqComponent},
  { path: 'checkout/:id', component: CheckoutDetailsComponent, },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiriesoutingModule { }
