import { Component, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';

import { BlogService } from '../blog.service';
import { Router } from '@angular/router';


declare var Quill: any;

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent {
  listDropDown:Array<object>=[{name:'All'},{name:'Today'},{name:'Last Week'},{name:'This month'},{name:'This year'}]

  items:any;

  blogId: string | null = null;
  constructor(public router: Router,private blogService: BlogService) {}

 ngOnInit() {

  this.checkRole();

  this.blogId = this.blogService.getBlogId()|| localStorage.getItem('blogId');

    if (this.blogId) {
      this.loadBlogDetails(this.blogId);
      localStorage.setItem('blogId', this.blogId);
    }   else {
      // Handle the case where no blogId is found (e.g., navigate to a list or show an error)
      console.error('No blog ID found');
    }

  this.items = [
    { label: 'manage blogs', routerLink: '/blogs' },
    { label: 'blog details', routerLink: '/' }
    ]

 }


 blogsRole:any
is_Super:any
checkRole(){
 const data = localStorage.getItem("user");
  if (data !== null) {

   let parsedData = JSON.parse(data);
    this.is_Super=parsedData.is_Super
   if(parsedData.is_Super==false) {
for(let i=0; i<parsedData.permissions.length;i++){
 if(parsedData.permissions[i].page_Name=="Blog"){
   this.blogsRole=parsedData.permissions[i];
 }
}
if(this.blogsRole.p_View==false &&this.is_Super==false) {
 this.gotopage( )
}
}


 }
}

gotopage( ){
  let url: string = "unlegal";
    this.router.navigateByUrl(url);
 }


   /**
  * addItem
  * @param value string
  * @returns void
  */
 showSide:string='';
 addItem(value: string): void {
  this.showSide = value
}

 /**
  * selectedfromDropDown
  * @param $event string
  * @returns void
  */
 Date:any="All"

 selectedfromDropDown(value:any){

  this.Date=value.name;


}

title:string=''
metaDes:string=''
desc:string=''
altImg:string=''
blogContent:any;
category:any;
keywords:any;
quill: any;
images:any;
blogDate:any;
loadBlogDetails(blogId: string): void {
  this.blogService.getBlogDetails(blogId).subscribe(
    (blog) => {
      console.log(blog)
      this.title = blog.blog_Title;
      this.metaDes = blog.blog_Meta_Desc;
      this.desc = blog.blog_Desc;
      this.altImg = blog.blog_Image_Alt;
      this.blogContent = blog.blog_Content;
      this.category = blog.blog_Category;
      this.keywords = blog.blog_KeyWords || [];
      // this.quill.root.innerHTML = this.blogContent;
      // Optionally, load images if necessary
      this.images = blog.blog_Main_Image;
      this.blogDate=blog.blog_Created_at
    },
    (error) => {
      console.error('Error loading blog details:', error);
    }
  );
}

ngOnDestroy() {
  // Clear the blogId from local storage when leaving the component
  localStorage.removeItem('blogId');
}
}
