

import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';


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
import { AppointmentsComponent } from './appointments.component';





import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';  // PrimeNG input text
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';

import { FileUploadModule } from 'primeng/fileupload';  // File upload
import { GalleriaModule } from 'primeng/galleria';      // Image gallery

import { CalendarModule } from 'primeng/calendar';



import { TabViewModule } from 'primeng/tabview';

 import { BadgeModule } from 'primeng/badge';

 import { DatePipe } from '@angular/common';



import { NgClass } from '@angular/common';


import { MenuModule } from 'primeng/menu';




import { DialogModule } from 'primeng/dialog';



const routes: Routes = [
  { path: '', component:AppointmentsComponent},


];
@NgModule({
imports: [
  CommonModule,
    SharedModule,
    FormsModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    ReactiveFormsModule,
    TagModule,
    ProgressSpinnerModule,
    ButtonModule,
    ToastModule,
    CalendarModule,
    GalleriaModule,
    FileUploadModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    CardModule,
    RadioButtonModule,
    MenuModule,
    NgClass ,
    DialogModule ,
    BadgeModule,
    TabViewModule,
    FieldsetModule,

  RouterModule.forChild(routes)
],
providers: [MessageService,DatePipe],

schemas: [CUSTOM_ELEMENTS_SCHEMA],

declarations: [AppointmentsComponent]
})
export class AppointmentsModule { }
