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
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', canActivate: [AuthGuard],loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
   
  },
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
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
