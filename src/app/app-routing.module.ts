import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';

import { CreateContractComponent } from './components/apartments/contract/create-contract/create-contract.component';
import { AddNewApartmentsComponent } from './components/apartments/add-new-apartments/add-new-apartments.component';
import { ApartmentDetailsComponent } from './components/apartments/apartment-details/apartment-details.component';
import { ContractComponent } from './components/apartments/contract/contract.component';
import { ApartmentsComponent } from './components/apartments/apartments.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { OwnersComponent } from './components/owners/owners.component';
import { UserComponent } from './components/user/user.component';
import { OwnerDetailsComponent } from './components/owners/owner-details/owner-details.component';
import { MessageComponent } from './components/message/message.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { AdminsComponent } from './components/admins//admins.component';
import { RolesComponent } from './components/roles/roles.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { AddAdminComponent } from './components/admins/add-admin/add-admin.component';
import { EditAdminComponent } from './components/admins/edit-admin/edit-admin.component';
import { InquiriesComponent } from './components/inquiries/inquiries.component';
import { ViewInquireComponent } from './components/inquiries/view-inquire/view-inquire.component';
import { InquireOfferComponent } from './components/inquiries/inquire-offer/inquire-offer.component';
import { InquireEditComponent } from './components/inquiries/inquire-edit/inquire-edit.component';
import { CreacteContractComponent } from './components/inquiries/creacte-contract/creacte-contract.component';
import { WorkersComponent } from './components/workers/workers.component';
import { AddWorkerComponent } from './components/workers/add-worker/add-worker.component';
import { EditWorkerComponent } from './components/workers/edit-worker/edit-worker.component';
import { WorkerProfileComponent } from './components/workers/worker-profile/worker-profile.component';
import { MainFileComponent } from './components/issueReports/main-file/main-file.component';
import { ReportsDetailsComponent } from './components/issueReports/reports-details/reports-details.component';
import { ReportPrintComponent } from './components/issueReports/report-print/report-print.component';
import { AddPartnerComponent } from './components/partner/add-partner/add-partner.component';
import { EditPartnerComponent } from './components/partner/edit-partner/edit-partner.component';
import { ViewPartnerComponent } from './components/partner/view-partner/view-partner.component';

import { AssginIssueComponent } from './components/issueReports/assgin-issue/assgin-issue.component';
import { InvoiceComponent } from './components/user/invoice/invoice.component';

import { UnlegalComponent } from './components/unlegal/unlegal.component';
import { PartnerComponent } from './components/partner/partner.component';
import { OwnerProfileComponent } from './components/owners/owner-profile/owner-profile.component';

import { AuthGuard } from './_helpers/auth.guard';
import { AssginTicketComponent } from './components/message/assgin-ticket/assgin-ticket.component';
import { MessResquestComponent } from './components/message/mess-resquest/mess-resquest.component';
import { BookingComponent } from './components/apartments/booking/booking.component';
import { ViewBookingComponent } from './components/apartments/view-booking/view-booking.component';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { AdsComponent } from './components/configurations/ads/ads.component';
import { FaqqComponent } from './components/configurations/faqq/faqq.component';
import { AppMsgsComponent } from './components/appmsgs/appmsgs.component';
import { PushmsgsComponent } from './components/pushmsgs/pushmsgs.component';
import { CancelInquire2Component } from './components/cancel-inquire2/cancel-inquire2.component';
 import { ViewCancelComponent } from './components/cancel-inquire2/view-cancel/view-cancel.component';
import { CheckoutInqqComponent } from './components/checkout-inqq/checkout-inqq.component';
import { CheckoutDetailsComponent } from './components/checkout-inqq/checkout-details/checkout-details.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'apartments',
    component: ApartmentsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'apartments/page/:id',
    component: AddNewApartmentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'apartments/apartments-details/:id',
    component: ApartmentDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'apartments/:id',
    component: ContractComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'apartments/contract/:id',
    component: CreateContractComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'apartments/booking/:id',
    component: BookingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'apartments/view-booking/:id',
    component: ViewBookingComponent,
    canActivate: [AuthGuard],
  },

  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  {
    path: 'configurations',
    component: ConfigurationsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'ads', component: AdsComponent, canActivate: [AuthGuard] },
  { path: 'faq', component: FaqqComponent, canActivate: [AuthGuard] },

  { path: 'owners', component: OwnersComponent, canActivate: [AuthGuard] },
  {
    path: 'owner/:id',
    component: OwnerDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'owner/:page/:id',
    component: OwnerDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'owner-profile/:id',
    component: OwnerProfileComponent,
    canActivate: [AuthGuard],
  },

  { path: 'messages', component: MessageComponent, canActivate: [AuthGuard] },
  {
    path: 'assgin-tiket/:id',
    component: AssginTicketComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'message-tiket/:id',
    component: MessResquestComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] },
  { path: 'admins', component: AdminsComponent, canActivate: [AuthGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
  {
    path: 'authorization/:id',
    component: AuthorizationComponent,
    canActivate: [AuthGuard],
  },
  { path: 'add-admin', component: AddAdminComponent, canActivate: [AuthGuard] },
  { path: 'cancel-inquire', component: CancelInquire2Component, canActivate: [AuthGuard] },
  { path: 'view-inquire/:id', component: ViewInquireComponent, canActivate: [AuthGuard] },
  { path: 'view-cancel/:id', component: ViewCancelComponent, canActivate: [AuthGuard] },

  { path: 'checkout-inquire', component: CheckoutInqqComponent, canActivate: [AuthGuard] },
  { path: 'checkout/:id', component: CheckoutDetailsComponent, canActivate: [AuthGuard] },

  {
    path: 'edit-admin/:id',
    component: EditAdminComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'inquiries',
    component: InquiriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-inquire/:id',
    component: ViewInquireComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inquire-offer/:id',
    component: InquireOfferComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inquire-edit/:id',
    component: InquireEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-contract/:id',
    component: CreacteContractComponent,
    canActivate: [AuthGuard],
  },

  { path: 'workers', component: WorkersComponent, canActivate: [AuthGuard] },
  {
    path: 'add-workers',
    component: AddWorkerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-workers/:id',
    component: EditWorkerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'worker-profile/:id',
    component: WorkerProfileComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'Issue_Reports',
    component: MainFileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Report-view/:id',
    component: ReportsDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Report-print/:id',
    component: ReportPrintComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'assgin-issue/:id',
    component: AssginIssueComponent,
    canActivate: [AuthGuard],
  },

  { path: 'unlegal', component: UnlegalComponent, canActivate: [AuthGuard] },

  { path: 'partner', component: PartnerComponent, canActivate: [AuthGuard] },
  {
    path: 'add-partner',
    component: AddPartnerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-partner/:id',
    component: EditPartnerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-partner/:id',
    component: ViewPartnerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'invoice/:id',
    component: InvoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-msgs',
    component: AppMsgsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'push-msgs',
    component: PushmsgsComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
