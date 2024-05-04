import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutInqqComponent } from './checkout-inqq.component';
import { CheckoutDetailsComponent } from './checkout-details/checkout-details.component';


const routes: Routes = [
  { path: '', component: CheckoutInqqComponent},
  { path: 'checkout/:id', component: CheckoutDetailsComponent, },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class checkoutRoutingModule { }

