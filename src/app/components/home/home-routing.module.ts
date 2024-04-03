import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { AddAdminComponent } from '../admins/add-admin/add-admin.component';
import { AdminsComponent } from '../admins/admins.component';
import { EditAdminComponent } from '../admins/edit-admin/edit-admin.component';
import { AppMsgsComponent } from '../appmsgs/appmsgs.component';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { AdsComponent } from '../configurations/ads/ads.component';
import { FaqqComponent } from '../configurations/faqq/faqq.component';
import { ReportPrintComponent } from '../issueReports/report-print/report-print.component';
import { PushmsgsComponent } from '../pushmsgs/pushmsgs.component';
import { RolesComponent } from '../roles/roles.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { UnlegalComponent } from '../unlegal/unlegal.component';
import { InvoiceComponent } from '../user/invoice/invoice.component';
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
    path: 'apartments', canActivate: [AuthGuard],loadChildren: () => import('../../components/apartments/appartments.module').then(a => a.AppartmentsModule),
  },

  {
    path: 'users', canActivate: [AuthGuard], loadChildren: () => import('../../components/user/user.module').then(u => u.UserModule),
  },
  {
    path: 'inquiries', canActivate: [AuthGuard],loadChildren: () => import('../../components/inquiries/inquiries.module').then(i => i.InquiriesModule),
  },

  {
    path: 'workers', canActivate: [AuthGuard],loadChildren: () => import('../../components/workers/workers.module').then(w=>w.WorkersModule),
  },

  {
    path: 'Issue_Reports', canActivate: [AuthGuard],loadChildren: () => import('../../components/issueReports/issu-reports.module').then(i => i.IssuReportsModule),
  },
  {
    path: 'messages', canActivate: [AuthGuard], loadChildren: () => import('../../components/message/message.module').then(m => m.MessageModule),
  },
  {
    path: 'configurations', canActivate: [AuthGuard], loadChildren: () => import('../../components/configurations/configurations.module').then(c=>c.ConfigurationsModule),
  },
  {
    path: 'payments', canActivate: [AuthGuard],loadChildren: () => import('../../components/payments/payments.module').then(m => m.PaymentsModule),
  },
  {
    path: 'partner', canActivate: [AuthGuard],loadChildren: () => import('../../components/partner/partner.module').then(p=>p.PartnerModule),
  },
  { path: 'ads', component: AdsComponent, canActivate: [AuthGuard] },
  { path: 'faq', component: FaqqComponent, canActivate: [AuthGuard] },

  {
  path: 'owners', canActivate: [AuthGuard],loadChildren: () => import('../../components/owners/owners.module').then(o=>o.OwnersModule),
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'admins', component: AdminsComponent, canActivate: [AuthGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
  {
    path: 'authorization/:id',
    component: AuthorizationComponent,
    canActivate: [AuthGuard],
  },
  { path: 'add-admin', component: AddAdminComponent, canActivate: [AuthGuard] },

  {
    path: 'edit-admin/:id',
    component: EditAdminComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'Report-print/:id',
    component: ReportPrintComponent,
    canActivate: [AuthGuard],

  },

  { path: 'unlegal', component: UnlegalComponent, canActivate: [AuthGuard] },

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
