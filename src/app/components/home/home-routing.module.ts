import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { AddAdminComponent } from '../admins/add-admin/add-admin.component';
import { AdminsComponent } from '../admins/admins.component';
import { EditAdminComponent } from '../admins/edit-admin/edit-admin.component';
import { AddNewApartmentsComponent } from '../apartments/add-new-apartments/add-new-apartments.component';
import { ApartmentDetailsComponent } from '../apartments/apartment-details/apartment-details.component';
import { ApartmentsComponent } from '../apartments/apartments.component';
import { BookingComponent } from '../apartments/booking/booking.component';
import { ContractComponent } from '../apartments/contract/contract.component';
import { CreateContractComponent } from '../apartments/contract/create-contract/create-contract.component';
import { ViewBookingComponent } from '../apartments/view-booking/view-booking.component';
import { AppMsgsComponent } from '../appmsgs/appmsgs.component';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { CancelInquire2Component } from '../cancel-inquire2/cancel-inquire2.component';
import { ViewCancelComponent } from '../cancel-inquire2/view-cancel/view-cancel.component';
import { CheckoutDetailsComponent } from '../checkout-inqq/checkout-details/checkout-details.component';
import { CheckoutInqqComponent } from '../checkout-inqq/checkout-inqq.component';
import { AdsComponent } from '../configurations/ads/ads.component';
import { ConfigurationsComponent } from '../configurations/configurations.component';
import { FaqqComponent } from '../configurations/faqq/faqq.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CreacteContractComponent } from '../inquiries/creacte-contract/creacte-contract.component';
import { InquireEditComponent } from '../inquiries/inquire-edit/inquire-edit.component';
import { InquireOfferComponent } from '../inquiries/inquire-offer/inquire-offer.component';
import { InquiriesComponent } from '../inquiries/inquiries.component';
import { ViewInquireComponent } from '../inquiries/view-inquire/view-inquire.component';
import { AssginIssueComponent } from '../issueReports/assgin-issue/assgin-issue.component';
import { MainFileComponent } from '../issueReports/main-file/main-file.component';
import { ReportPrintComponent } from '../issueReports/report-print/report-print.component';
import { ReportsDetailsComponent } from '../issueReports/reports-details/reports-details.component';
import { AssginTicketComponent } from '../message/assgin-ticket/assgin-ticket.component';
import { MessResquestComponent } from '../message/mess-resquest/mess-resquest.component';
import { MessageComponent } from '../message/message.component';
import { OwnerDetailsComponent } from '../owners/owner-details/owner-details.component';
import { OwnerProfileComponent } from '../owners/owner-profile/owner-profile.component';
import { OwnersComponent } from '../owners/owners.component';
import { AddPartnerComponent } from '../partner/add-partner/add-partner.component';
import { EditPartnerComponent } from '../partner/edit-partner/edit-partner.component';
import { PartnerComponent } from '../partner/partner.component';
import { ViewPartnerComponent } from '../partner/view-partner/view-partner.component';
import { PaymentsComponent } from '../payments/payments.component';
import { PushmsgsComponent } from '../pushmsgs/pushmsgs.component';
import { RolesComponent } from '../roles/roles.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { UnlegalComponent } from '../unlegal/unlegal.component';
import { InvoiceComponent } from '../user/invoice/invoice.component';
import { UserComponent } from '../user/user.component';
import { AddWorkerComponent } from '../workers/add-worker/add-worker.component';
import { EditWorkerComponent } from '../workers/edit-worker/edit-worker.component';
import { WorkerProfileComponent } from '../workers/worker-profile/worker-profile.component';
import { WorkersComponent } from '../workers/workers.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [

  {
    path: '', canActivate: [AuthGuard],loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
   
  }

]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
