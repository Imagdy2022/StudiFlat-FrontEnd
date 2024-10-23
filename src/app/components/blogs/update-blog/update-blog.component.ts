import { Component, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { BlogService } from '../blog.service';

declare var Quill: any;


@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss']
})
export class UpdateBlogComponent {
  listDropDown:Array<object>=[{name:'StudiFlats'},{name:'Aprt'},{name:'Bed'},{name:'Sofa'}]
  title:string='';
  metaDes:string='';
  desc:string='';
  altImg:any;

  @ViewChild('editorContainer') editorContainer!: ElementRef;
  blogContent:any;
  quill: any;
  description: string = '';

  constructor(private blogService: BlogService) {}

  ngAfterViewInit() {
    this.quill = new Quill(this.editorContainer.nativeElement, {
      theme: 'snow',
      placeholder: 'Write your blog content here...',
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ align: [] }],
          ['link', 'image', 'video', 'blockquote', 'code-block'],
          ['clean']
        ]
      }
      // modules: {
      //   toolbar: [
      //     [{ header: [1, 2, 3, false] }],
      //     ['bold', 'italic', 'underline'],
      //     [{ list: 'ordered' }, { list: 'bullet' }],
      //     ['link', 'image'],
      //     ['clean']
      //   ]
      // }
    });
  }

  getEditorContent() {
    const content = this.quill.root.innerHTML;
    console.log('Quill content:', content);
    // Bind this content to the description or send it to the server
    this.blogContent = content;
  }
  items:any;

 blogId: string | null = null;
 ngOnInit() {

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
    { label: 'Update Blog', routerLink: '/' }
    ]

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
 category:any="Aprt"

 selectedfromDropDown(value:any){

  this.category=value.name;


}
keywords: string[] = [];

removeKeyword(keyword: string) {
  this.keywords = this.keywords.filter(k => k !== keyword);
}

addKeyword(keyword: string) {
  if (keyword && !this.keywords.includes(keyword)) {
    this.keywords.push(keyword);
  }
}

//////////////////////////upload images////////////////////
images: any;
draggedImage: any;

responsiveOptions: any[] = [
  {
    breakpoint: '1024px',
    numVisible: 5
  },
  {
    breakpoint: '768px',
    numVisible: 3
  },
  {
    breakpoint: '560px',
    numVisible: 1
  }
];

onImageSelect(event: any) {
  // for (let file of event.files) {
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     this.images.push({
  //       src: e.target.result,
  //       alt: file.name,
  //     });
  //   };
  //   reader.readAsDataURL(file);
  // }

    for (let file of event.files) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.images=e.target.result
    console.log(this.images)
    };
    reader.readAsDataURL(file);
  }





}

removeImage() {
  this.images='';
  this.altImg='';
}

onDragStart(event: any, img: any) {
  this.draggedImage = img;
}

onDrop(event: any, index: number) {
  if (this.draggedImage) {
    const draggedIndex = this.images.indexOf(this.draggedImage);
    this.images.splice(draggedIndex, 1); // Remove from original position
    this.images.splice(index, 0, this.draggedImage); // Insert at new position
    this.draggedImage = null; // Reset
  }
}

onDragEnd(event: any) {
  this.draggedImage = null;
}

onDragEnter(event: any, index: number) {
  // Optional: Handle visual effects for drag over
}

displayEditor:string='block';
viewEditor(){
  this.displayEditor='block';
}

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
      this.quill.root.innerHTML = this.blogContent;
      // Optionally, load images if necessary
      this.images = blog.blog_Main_Image ;
    },
    (error) => {
      console.error('Error loading blog details:', error);
    }
  );
}


saveBlog() {
  this.getEditorContent();

  const blogData = {
    blog_ID:this.blogId,
    blog_Title: this.title,
    blog_Meta_Desc: this.metaDes,
    blog_Category: this.category,
    blog_KeyWords: this.keywords,
    blog_Main_Image: this.images||'', // Use the first image for the main image
    blog_Image_Alt: this.altImg,
    blog_Desc: this.desc,
    blog_Slug: this.title.toLowerCase().replace(/\s+/g, '-'),
    blog_Content: this.blogContent,
    is_Published: true // Set as needed
  };

  this.blogService.updateBlog(blogData).subscribe(
    response => {
      console.log('Blog saved successfully:', response);
      // Optionally, navigate to another page or show a success message.
    },
    error => {
      console.error('Error saving blog:', error);
      // Handle errors here.
    }
  );
}

ngOnDestroy() {
  // Clear the blogId from local storage when leaving the component
  localStorage.removeItem('blogId');
}
}
