import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './admins.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';



const routes: Routes = [
  { path: '', component: AdminsComponent },
  { path: 'add-admin', component: AddAdminComponent},
  {path: 'edit-admin/:id',component: EditAdminComponent,},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }

