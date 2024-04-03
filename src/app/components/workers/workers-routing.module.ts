import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkersComponent } from './workers.component';
import { AddWorkerComponent } from './add-worker/add-worker.component';
import { EditWorkerComponent } from './edit-worker/edit-worker.component';
import { WorkerProfileComponent } from './worker-profile/worker-profile.component';



const routes: Routes = [
  {
    path: '', component: WorkersComponent,
  },
  {
    path: 'add-workers',
    component: AddWorkerComponent
  },
  {
    path: 'edit-workers/:id',
    component: EditWorkerComponent
  },
  {
    path: 'worker-profile/:id',
    component: WorkerProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersRoutingModule { }

