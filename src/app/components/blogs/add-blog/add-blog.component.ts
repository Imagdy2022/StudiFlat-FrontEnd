import { Component, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { BlogService } from '../blog.service';

declare var Quill: any;


@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements AfterViewInit {
  listDropDown:Array<object>=[{name:'Aprt'},{name:'Bed'},{name:'Sofa'}]
  title:string='';
  metaDes:string='';
  desc:string='';
  altImg:string=''

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
 ngOnInit() {

  this.items = [
    { label: 'manage blogs', routerLink: '/blogs' },
    { label: 'Add Blog', routerLink: '/' }
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
images: any[] = [];
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
  for (let file of event.files) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.images.push({
        src: e.target.result,
        alt: file.name,
      });
    };
    reader.readAsDataURL(file);
  }
}

removeImage(index: number) {
  this.images.splice(index, 1);
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

displayEditor:string='none';
viewEditor(){
  this.displayEditor='block';
}


saveBlog() {
  this.getEditorContent();

  const blogData = {
    blog_Title: this.title,
    blog_Meta_Desc: this.metaDes,
    blog_Category: this.category,
    blog_KeyWords: this.keywords,
    blog_Main_Image: this.images.length ? this.images[0].src : '', // Use the first image for the main image
    blog_Image_Alt: this.altImg,
    blog_Desc: this.desc,
    blog_Slug: this.title.toLowerCase().replace(/\s+/g, '-'),
    blog_Content: this.blogContent,
    is_Published: true // Set as needed
  };

  this.blogService.createNewBlog(blogData).subscribe(
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
}
