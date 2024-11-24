import { Component, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { BlogService } from '../blog.service';


declare var Quill: any;
declare var ImageResize: any;

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
  // Quill.register('modules/imageResize', window['ImageResize']);
  // Quill.register("modules/resize", window.QuillResizeImage);

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


  // uploadImageToServer(file:any){
  //   this.blogService.uploadImage(file).subscribe(
  //     (response: any) => {

  //       const imageUrl = response[0].file_Path;
  //       console.log(imageUrl)




  //     },
  //     (error) => {
  //       console.error('Error uploading file:', error);
  //     }
  //   );
  // }



  getEditorContent() {
    const content = this.quill.root.innerHTML;
    // const content = this.quill.container.firstChild.innerHTML;
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
// images: any[] = [];
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
//   for (let file of event.files) {
//     const reader = new FileReader();
//     reader.onload = (e: any) => {
//       this.images.push({
//         src: e.target.result,
//         alt: file.name,
//       });
//     };
//     reader.readAsDataURL(file);
//   }
// }

// removeImage(index: number) {
//   this.images.splice(index, 1);
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


  //////////////////////////photos///////////////////////////
  // images: any[] = [];
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
    blog_Main_Image: this.images, // Use the first image for the main image
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
