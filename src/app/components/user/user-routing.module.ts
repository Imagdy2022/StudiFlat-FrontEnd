import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditeUserDetailsComponent } from './edite-user-details/edite-user-details.component';


const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'app-user-details/:id', component: UserDetailsComponent },
  { path: 'app-edite-user-details/:id', component: EditeUserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

