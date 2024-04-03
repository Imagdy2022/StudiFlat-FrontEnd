import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { OwnerProfileComponent } from './owner-profile/owner-profile.component';


import { SharedModule } from 'src/app/shared/shared.module';
import { OwnersComponent } from './owners.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { OwnersRoutingModule } from './owners-routing.module';


const routes: Routes = [];

@NgModule({
  declarations: [
    OwnersComponent,
    OwnerDetailsComponent,OwnerProfileComponent
  ],
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
    OwnersRoutingModule
  ],
  exports: [OwnerDetailsComponent],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class OwnersModule { }
