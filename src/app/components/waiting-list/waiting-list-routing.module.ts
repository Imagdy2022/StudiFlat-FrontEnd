import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaitingListComponent } from './waiting-list.component';
import { SendOfferComponent } from './send-offer/send-offer.component';


const routes: Routes = [
  { path: '', component: WaitingListComponent},
  {path:'send-offer/:id',component:SendOfferComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaitingListRoutingModule { }

