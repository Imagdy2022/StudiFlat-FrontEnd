 import { CommonModule } from '@angular/common';
import { WorkersComponent } from './workers.component';

import { AddWorkerComponent } from './add-worker/add-worker.component';
import { EditWorkerComponent } from './edit-worker/edit-worker.component';
import { WorkerProfileComponent } from './worker-profile/worker-profile.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { DropdownModule } from 'primeng/dropdown';


import { SharedModule } from 'src/app/shared/shared.module';
 import { RouterModule, Routes } from '@angular/router';



 import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';


  import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
 import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'
import { PaginatorModule } from 'primeng/paginator';

const routes: Routes = [
  ];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DropdownModule,
    TableModule,PaginatorModule,
    ReactiveFormsModule,
    TagModule,
    ProgressSpinnerModule,
    ButtonModule,
    ToastModule,
    RouterModule.forChild(routes)
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [WorkersComponent,AddWorkerComponent,EditWorkerComponent,WorkerProfileComponent]
})
export class WorkersModule { }
