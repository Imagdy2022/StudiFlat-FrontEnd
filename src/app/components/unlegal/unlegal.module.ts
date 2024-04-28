 import { CommonModule } from '@angular/common';
import { UnlegalComponent } from './unlegal.component';



import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';


import { SharedModule } from 'src/app/shared/shared.module';
 import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
 import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UnLegalRoutingModule } from './unlegal-routing.module';
const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DropdownModule,
    TableModule,
    ReactiveFormsModule,
    TagModule,
    ProgressSpinnerModule,
    ButtonModule,
    ToastModule,
    UnLegalRoutingModule
  ],
  exports: [ ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [UnlegalComponent]
})
export class UnlegalModule { }
