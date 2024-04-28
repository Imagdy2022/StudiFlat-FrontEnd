import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PushmsgsComponent } from './pushmsgs.component';




const routes: Routes = [
  { path: '', component: PushmsgsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PushMsgsRoutingModule { }

