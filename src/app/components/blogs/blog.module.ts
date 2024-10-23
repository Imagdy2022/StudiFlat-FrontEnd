










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
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';




import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';  // PrimeNG input text
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';

import { FileUploadModule } from 'primeng/fileupload';  // File upload
import { GalleriaModule } from 'primeng/galleria';      // Image gallery

import { CalendarModule } from 'primeng/calendar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ChipModule } from 'primeng/chip';
import { ToolbarModule } from 'primeng/toolbar';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ChipsModule } from 'primeng/chips';
import { UpdateBlogComponent } from './update-blog/update-blog.component';






const routes: Routes = [
  { path: '', component: BlogsListComponent },
  { path: 'details/:slug', component: BlogDetailsComponent },
  { path: 'add-blog', component: AddBlogComponent },
  { path: 'update/:slug', component: UpdateBlogComponent }



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
    BreadcrumbModule,
    ChipModule,
    ToolbarModule,
    ChipsModule,
  RouterModule.forChild(routes)
],
providers: [MessageService],
schemas: [CUSTOM_ELEMENTS_SCHEMA],

declarations: [BlogsListComponent, BlogDetailsComponent, AddBlogComponent, UpdateBlogComponent]
})
export class BlogModule { }

