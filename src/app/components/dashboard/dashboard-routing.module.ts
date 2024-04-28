import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RecentActivitiesComponent } from './recent-activities/recent-activities.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
  },
  {
    path: 'veiwAll', component: RecentActivitiesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

