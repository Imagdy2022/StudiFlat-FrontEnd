import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMsgsComponent } from './appmsgs.component';

const routes: Routes = [
  { path: '', component: AppMsgsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppMsgsRoutingModule { }

