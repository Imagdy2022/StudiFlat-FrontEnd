import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { ReportPrintComponent } from '../issueReports/report-print/report-print.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'apartments',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/apartments/appartments.module').then(
            (a) => a.AppartmentsModule
          ),
      },

      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/user/user.module').then((u) => u.UserModule),
      },
      {
        path: 'inquiries',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/inquiries/inquiries.module').then(
            (i) => i.InquiriesModule
          ),
      },
      {
        path: 'waitingList',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/waiting-list/waiting-list.module').then(
            (i) => i.WaitingListModule
          ),
      },
      {
        path: 'cancel-inquire',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            '../../components/cancel-inquire2/cancel-inquire2.module'
          ).then((i) => i.CancelInquire2Module),
      },
      {
        path: 'checkout-inquire',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/checkout-inqq/checkout-inqq.module').then(
            (i) => i.CheckoutInqqModule
          ),
      },

      {
        path: 'workers',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/workers/workers.module').then(
            (w) => w.WorkersModule
          ),
      },

      {
        path: 'Issue_Reports',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/issueReports/issu-reports.module').then(
            (i) => i.IssuReportsModule
          ),
      },
      {
        path: 'messages',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/message/message.module').then(
            (m) => m.MessageModule
          ),
      },
      {
        path: 'configurations',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/configurations/configurations.module').then(
            (c) => c.ConfigurationsModule
          ),
      },
      {
        path: 'payments',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/payments/payments.module').then(
            (m) => m.PaymentsModule
          ),
      },
      {
        path: 'partner',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/partner/partner.module').then(
            (p) => p.PartnerModule
          ),
      },
      {
        path: 'landlord',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/land-lord/land-lord.module').then(
            (p) => p.LandLordModule
          ),
      },
      {
        path: 'blogs',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/blogs/blog.module').then(
            (p) => p.BlogModule
          ),
      },
      {
        path: 'faq',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/configurations/faqq/faqq.module').then(
            (p) => p.FaqqModule
          ),
      },
      {
        path: 'ads',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/configurations/ads/ads.module').then(
            (p) => p.AdsModule
          ),
      },
      {
        path: 'contract',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            '../../components/configurations/contract/contract.module'
          ).then((p) => p.ContractModule),
      },
      {
        path: 'owners',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/owners/owners.module').then(
            (o) => o.OwnersModule
          ),
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admins',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/admins/admins.module').then(
            (a) => a.AdminsModule
          ),
      },
      {
        path: 'roles',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/roles/roles.module').then(
            (r) => r.RolesModule
          ),
      },
      {
        path: 'app-msgs',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/appmsgs/appmsgs.module').then(
            (m) => m.AppMsgsModule
          ),
      },
      {
        path: 'push-msgs',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/pushmsgs/pushmsgs.module').then(
            (p) => p.PushmsgsModule
          ),
      },
      {
        path: 'unlegal',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../components/unlegal/unlegal.module').then(
            (u) => u.UnlegalModule
          ),
      },

      {
        path: 'Report-print/:id',
        component: ReportPrintComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
