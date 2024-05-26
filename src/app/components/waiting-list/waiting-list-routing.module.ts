import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaitingListComponent } from './waiting-list.component';


const routes: Routes = [
  { path: '', component: WaitingListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaitingListRoutingModule { }

