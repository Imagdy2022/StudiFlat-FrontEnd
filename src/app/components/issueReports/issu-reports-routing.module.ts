import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFileComponent } from './main-file/main-file.component';
import { AssginIssueComponent } from './assgin-issue/assgin-issue.component';
import { ReportsDetailsComponent } from './reports-details/reports-details.component';


const routes: Routes = [
  {
    path: '', component: MainFileComponent,
  },
  {
    path: 'Report-view/:id',
    component: ReportsDetailsComponent,
  },
  {
    path: 'assgin-issue/:id',
    component: AssginIssueComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuReportsRoutingModule { }

