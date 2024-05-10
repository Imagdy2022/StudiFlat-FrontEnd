import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { AuthorizationComponent } from '../authorization/authorization.component';




const routes: Routes = [
  { path: '', component: RolesComponent },
  {path: 'authorization/:id', component: AuthorizationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }

