import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { OwnerProfileComponent } from './owner-profile/owner-profile.component';
import { OwnersComponent } from './owners.component';


const routes: Routes = [
  { path: '', component: OwnersComponent },
  { path: ':id', component: OwnerDetailsComponent },
  { path: 'owner-profile/:id', component: OwnerProfileComponent },
  {
    path: ':page/:id', component: OwnerDetailsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnersRoutingModule { }

