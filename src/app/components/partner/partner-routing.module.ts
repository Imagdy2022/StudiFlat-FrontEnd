import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerComponent } from './partner.component';
import { AddPartnerComponent } from './add-partner/add-partner.component';
import { EditPartnerComponent } from './edit-partner/edit-partner.component';
import { ViewPartnerComponent } from './view-partner/view-partner.component';




const routes: Routes = [
  {
    path: '', component: PartnerComponent,
  },
  {
    path: 'add-partner',
    component: AddPartnerComponent,
  },
  {
    path: 'edit-partner/:id',
    component: EditPartnerComponent,
  },
  {
    path: 'view-partner/:id',
    component: ViewPartnerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }

