import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquiriesComponent } from './inquiries.component';
import { ViewInquireComponent } from './view-inquire/view-inquire.component';
import { CreacteContractComponent } from './creacte-contract/creacte-contract.component';
import { InquireEditComponent } from './inquire-edit/inquire-edit.component';
import { InquireOfferComponent } from './inquire-offer/inquire-offer.component';


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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiriesoutingModule { }

