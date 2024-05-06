import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqqComponent } from './faqq.component';


const routes: Routes = [
  { path: '', component: FaqqComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FAQRoutingModule { }

