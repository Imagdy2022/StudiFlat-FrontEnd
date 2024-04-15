import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnlegalComponent } from './unlegal.component';




const routes: Routes = [
  { path: '', component: UnlegalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnLegalRoutingModule { }

