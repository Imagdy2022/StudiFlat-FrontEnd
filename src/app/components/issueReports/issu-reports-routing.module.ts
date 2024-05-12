import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFileComponent } from './main-file/main-file.component';
import { AssginIssueComponent } from './assgin-issue/assgin-issue.component';
import { ReportsDetailsComponent } from './reports-details/reports-details.component';
import { AssginIssueOwnerComponent } from './assgin-issue-owner/assgin-issue-owner.component';

const routes: Routes = [
  {
    path: '',
    component: MainFileComponent,
  },
  {
    path: 'Report-view/:id',
    component: ReportsDetailsComponent,
  },
  {
    path: 'assgin-issue/:id',
    component: AssginIssueComponent,
  },
  {
    path: 'assgin-issue-owner/:id',
    component: AssginIssueOwnerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssuReportsRoutingModule {}
