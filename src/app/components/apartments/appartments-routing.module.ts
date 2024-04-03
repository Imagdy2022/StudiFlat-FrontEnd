import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentsComponent } from './apartments.component';
import { AddNewApartmentsComponent } from './add-new-apartments/add-new-apartments.component';
import { ApartmentDetailsComponent } from './apartment-details/apartment-details.component';
import { ContractComponent } from './contract/contract.component';
import { CreateContractComponent } from './contract/create-contract/create-contract.component';
import { BookingComponent } from './booking/booking.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';



const routes: Routes = [
  {
    path: '', component: ApartmentsComponent
  },
  {
    path: 'Add-NewApartments', component: AddNewApartmentsComponent
  },
  {
    path: 'page/:id',
    component: AddNewApartmentsComponent
  },
  {
    path: 'apartments-details/:id',
    component: ApartmentDetailsComponent
  },
  {
    path: ':id',
    component: ContractComponent
  },
  {
    path: 'contract/:id',
    component: CreateContractComponent
  },
  {
    path: 'booking/:id',
    component: BookingComponent
  },
  {
    path: 'view-booking/:id',
    component: ViewBookingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentsRoutingModule { }

