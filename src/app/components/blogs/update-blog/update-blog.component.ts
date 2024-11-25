import { Component, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';


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

  constructor(public router: Router,private blogService: BlogService) {}

  // ngAfterViewInit() {
  //   this.quill = new Quill(this.editorContainer.nativeElement, {
  //     theme: 'snow',
  //     placeholder: 'Write your blog content here...',
  //     modules: {
  //       toolbar: [
  //         [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //         [{ font: [] }],
  //         [{ size: ['small', false, 'large', 'huge'] }],
  //         ['bold', 'italic', 'underline', 'strike'],
  //         [{ color: [] }, { background: [] }],
  //         [{ script: 'sub' }, { script: 'super' }],
  //         [{ list: 'ordered' }, { list: 'bullet' }],
  //         [{ indent: '-1' }, { indent: '+1' }],
  //         [{ align: [] }],
  //         ['link', 'image', 'video', 'blockquote', 'code-block'],
  //         ['clean']
  //       ]
  //     }

  //   });
  // }

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
  if(this.blogsRole.p_Add==false &&this.is_Super==false) {
   this.gotopage( )
  }
  }


   }
  }
  gotopage( ){
   let url: string = "unlegal";
     this.router.navigateByUrl(url);
  }

  ngAfterViewInit() {
    // const Quill =(window as any)['Quill'];
    // if (window && (window as any).ImageResize) {
    //   Quill.register('modules/imageResize', (window as any).ImageResize);
    //   console.log('done')
    // } else {
    //   console.error('ImageResize module is not defined. Make sure the CDN is loaded correctly.');
    //   return;
    // }
    const Quill = (window as any)['Quill'];
    const ImageResize = (window as any)['ImageResize'] ; // Use correct global reference
    const ImageResizeModule = ImageResize.default || ImageResize;

    console.log('Quill:', Quill);
    console.log('ImageResize:', ImageResize);

    if (  !ImageResize) {
      console.error('Quill or ImageResize module not loaded properly');
      return;
    }

    // Register the Image Resize module
    Quill.register('modules/imageResize', ImageResizeModule );

    this.quill = new Quill(this.editorContainer.nativeElement, {
      theme: 'snow',
      placeholder: 'Write your blog content here...',
      modules: {
        imageResize: {
          displaySize: true
        },
        toolbar:{container:[
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ 'color': [] }, { 'background': [] }],
          [{ align: [] }],
          ['link', 'image', 'video', 'blockquote', 'code-block'],
          ['clean']
        ] ,
         handlers: {
          image: () => this.customImageHandler()
         }}
        //  ,
        //  imageResize: {
        //   modules: ['Resize', 'DisplaySize', 'Toolbar'],
        // },

        // }} [
        //   [{ header: [1, 2, 3, 4, 5, 6, false] }],
        //   [{ font: [] }],
        //   [{ size: ['small', false, 'large', 'huge'] }],
        //   ['bold', 'italic', 'underline', 'strike'],
        //   [{ color: [] }, { background: [] }],
        //   [{ script: 'sub' }, { script: 'super' }],
        //   [{ list: 'ordered' }, { list: 'bullet' }],
        //   [{ indent: '-1' }, { indent: '+1' }],
        //   [{ align: [] }],
        //   ['link', 'image', 'video', 'blockquote', 'code-block'],
        //   ['clean']
        // ] ,
        //   handlers: {
        //   image: this.customImageHandler.bind(this)
        // }
        // handlers: {
        //   image: () => this.customImageHandler()
        // }


      },
        // imageResize: {
        //   modules: ['Resize', 'DisplaySize', 'Toolbar'],
        // },

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
    // this.quill.register('modules/imageResize', (window as any)['QuillImageResize']);

  }

  customImageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files ? input.files[0] : null;

      if (file) {
        // Call the service to upload the image
        this.blogService.uploadImage(file).subscribe(
          (response: any) => {
            const imageUrl = response[0]?.file_Path; // Adjust field based on your API response

            if (imageUrl) {
              // Insert the Image URL into Quill Editor
              const range = this.quill.getSelection();
              this.quill.insertEmbed(range?.index || 0, 'image', imageUrl);
            }
          },
          (error) => {
            console.error('Error uploading file:', error);
          }
        );
      }
    };
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
 addItem(value: any): void {
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
// images: any;
// draggedImage: any;

// responsiveOptions: any[] = [
//   {
//     breakpoint: '1024px',
//     numVisible: 5
//   },
//   {
//     breakpoint: '768px',
//     numVisible: 3
//   },
//   {
//     breakpoint: '560px',
//     numVisible: 1
//   }
// ];

// onImageSelect(event: any) {


//     for (let file of event.files) {
//     const reader = new FileReader();
//     reader.onload = (e: any) => {
//       this.images=e.target.result
//     console.log(this.images)
//     };
//     reader.readAsDataURL(file);
//   }





// }

// removeImage() {
//   this.images='';
//   this.altImg='';
// }

// onDragStart(event: any, img: any) {
//   this.draggedImage = img;
// }

// onDrop(event: any, index: number) {
//   if (this.draggedImage) {
//     const draggedIndex = this.images.indexOf(this.draggedImage);
//     this.images.splice(draggedIndex, 1);
//     this.images.splice(index, 0, this.draggedImage);
//     this.draggedImage = null;
//   }
// }

// onDragEnd(event: any) {
//   this.draggedImage = null;
// }

// onDragEnter(event: any, index: number) {

// }
images: string = '';

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

// onImageSelect(event: any) {
//   for (let file of event.files) {
//     const reader = new FileReader();
//     reader.onload = (e: any) => {
//       this.images.push(e.target.result);
//     };
//     reader.readAsDataURL(file);
//   }
// }
loading: boolean = false;

onImageSelect(event: any) {
  this.loading=true;
  for (let file of event.files) {
    this.blogService.uploadImage(file).subscribe(
      (response: any) => {
        // Assuming the API returns a URL to the uploaded image
        const imageUrl = response[0].file_Path;
        console.log(imageUrl)
        // this.images.push(imageUrl);
        this.images=imageUrl;

        this.loading = false;
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
}



// removeImage(index: number) {
//   this.images.splice(index, 1);
// }
removeImage() {
  this.images='';
}

onDragStart(event: any, img: any) {
  this.draggedImage = img;
}

// onDrop(event: any, index: number) {
//   if (this.draggedImage) {
//     const draggedIndex = this.images.indexOf(this.draggedImage);
//     this.images.splice(draggedIndex, 1);
//     this.images.splice(index, 0, this.draggedImage);
//     this.draggedImage = null;
//   }
// }

onDragEnd(event: any) {
  this.draggedImage = null;
}

onDragEnter(event: any, index: number) {
  // Optional: Handle visual effects for drag over
}

/////////////////////////////////////////////////////////////////

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
