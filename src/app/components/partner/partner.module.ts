  import { PartnerComponent } from './partner.component';
  import { AddPartnerComponent } from './add-partner/add-partner.component';
  import { EditPartnerComponent } from './edit-partner/edit-partner.component';
  import { ViewPartnerComponent } from './view-partner/view-partner.component';

import { CommonModule } from '@angular/common';



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
import { PartnerRoutingModule } from './partner-routing.module';

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
    PartnerRoutingModule
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [PartnerComponent,ViewPartnerComponent,EditPartnerComponent,AddPartnerComponent ]
})
export class PartnerModule { }
