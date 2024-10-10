import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { DomSanitizer } from '@angular/platform-browser';

import* as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import saveAs from 'file-saver';
import { Subscription } from 'rxjs';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
// import * as htmlToPdfmake from 'html-to-pdfmake';
let popupWindow: Window | null = null;
 @Component({
  selector: 'app-report-print',
  templateUrl: './report-print.component.html',
  styleUrls: ['./report-print.component.css']
})
export class ReportPrintComponent implements OnInit {

  paramid:any
  @ViewChild('pdfTable') pdfTable!: ElementRef;

  constructor(
    private viewportScroller: ViewportScroller,
    private uploadService: UploadFileService,

    private messageService: MessageService,
    public router: Router, public _adminservices:AdminsService,
    public _ActivatedRoute: ActivatedRoute,private sanitizer: DomSanitizer
   ) {
    this.paramid = _ActivatedRoute.snapshot.paramMap.get('id');

  }

  showSide: string = '';

  value: string = '';
  cities: Array<object> = [];
  selectedCity: Object = {};
  available: boolean = true;
  link: Array<boolean> = [true];
  param:any;
  subscriptions:Subscription[] = [];
  listAnchors: any = [
    { id: 'Generalinfo', link: 'General info' },
    { id: 'OtherDetails', link: 'Other Details' },
    { id: 'Documentdetails', link: 'Document details' },
    { id: 'Rentalhistory', link: 'Rental history' },
    { id: 'userinformation', link: 'user information' },
  ]

  ngOnInit() {
    this.initCities();
    this.GetIssueByid( )
    this.checkRole()
  }
  transform2(url:any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
     }
  IssueRole:any
  is_Super:any
  checkRole(){
    const data = localStorage.getItem("user");
     if (data !== null) {

      let parsedData = JSON.parse(data);
       this.is_Super=parsedData.is_Super
      if(parsedData.is_Super==false) {
  for(let i=0; i<parsedData.permissions.length;i++){
    if(parsedData.permissions[i].page_Name=="Issue Reports"){
      this.IssueRole=parsedData.permissions[i];
    }
  }
  if(this.IssueRole.p_View==false &&this.is_Super==false) {
    this.gotopage( )
  }
  }


    }
  }
  gotopage( ){
    let url: string = "unlegal";
      this.router.navigateByUrl(url);
  }
  gotopage2( ){
    let url: string = "Issue_Reports";
      this.router.navigateByUrl(url);
  }
  detialIssue:any={}
  GetIssueByid( ) {
    this.subscriptions.push(this._adminservices.GetIssueDetails(this.paramid).subscribe((res) => {
      this.detialIssue=res

     //  this.createissue.patchValue(res);
     //  this.createissue.get('issue_Images')?.setValue(res["issue_Images"]);
    }, (err: any) => {

     this.messageService.add({ severity: 'error', summary: 'Error', detail: `${ err.error.message[0]}` });
   }))

  }
  blob:any
  CreateIssuePDF( ) {
    var mediaType = 'application/pdf';
    this.subscriptions.push(this._adminservices.CreateIssuePDF(this.paramid).subscribe((data) => {
      saveAs(data, 'Example.pdf')
      console.log('pdf',data)
    }

    ))


      // this.blob = new Blob([res], {type: 'application/pdf'});

      // var downloadURL = window.URL.createObjectURL(res);
      // var link = document.createElement('a');
      // link.href = downloadURL;
      // link.download = "help.pdf";
      // link.click();
      //  this.createissue.patchValue(res);
      //  this.createissue.get('issue_Images')?.setValue(res["issue_Images"]);
    //  }, (err: any) => {
    //   debugger
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: `${ err.error.message[0]}` });
    // })


  }

  createissue!: FormGroup;
  issue_Images: Array<any> = [];

  bindCreateworker(): void {
    this.createissue = new FormGroup({
      'issue_ID': new FormControl('', [Validators.required]),
      'issue_Code': new FormControl('', [Validators.required]),
      'apt_ID': new FormControl('', [Validators.email, Validators.required]),
      'user_ID': new FormControl('', [Validators.required]),

      'name_RingBell': new FormControl('', [Validators.required]),
      'phone_Number': new FormControl('', [Validators.required]),
      'phone_Number2': new FormControl('', [Validators.required]),
      'issue_Desc': new FormControl('', [Validators.required]),
      'statusString': new FormControl('', [Validators.required]),
      'issue_status': new FormControl('', [Validators.required]),
      'created_At': new FormControl('', [Validators.required]),
      'issue_Appt': new FormControl('', [Validators.required]),
      'issue_Images': new FormControl(this.issue_Images, [Validators.required]),
      'issue_Cost': new FormControl('', [Validators.required]),


    });
  }
  createissuepost(data: any): void {

  }
  uploadedFiles: any[] = [];

  onUpload(event: any): void {
    this.uploadedFiles = event.files;
    this.convertFileToFormData(this.uploadedFiles);
    this.subscriptions.push(    this.uploadService.uploadMultiFile(this.convertFileToFormData(this.uploadedFiles)).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'Images Upload Successfully'}` });

      for (let file of data) {
        this.issue_Images.push({ 'apt_imgs': file.name });
      }
       this.createissue.get('img_Url')?.patchValue(this.issue_Images);
    }))

  }
  convertFileToFormData(files: any[]) {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('Files', files[i], files[i].name);
    }

    return formData;
  }
  // constructor(private viewportScroller: ViewportScroller) {
  //   this.param = window.location.pathname ;
  //   if (this.param == "/Reports_View") this.param = "Reports View"
  //   else if(this.param == "/Edit_Reports_View") this.param = "Edit Reports View"
  //   else this.param = "Report Details"

  // }
  /**
   * initCities
   * @return void
   */
  initCities(): void {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  /**
   * addItem
   * @param value
   */
  addItem(value: string) {
    this.showSide = value
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  changeAnchor(index: number): void {
    this.link = this.link.map(el => el == true ? false : false)
    this.link[index] = true
  }

  submitForm():void{

  }
  // public downloadAsPDF() {
  //   const doc = new jsPDF();

  //   const specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };

  //   const pdfTable = this.pdfTable.nativeElement;

  //   doc.fromHTML(pdfTable.innerHTML, 15, 15, {
  //     width: 190,
  //     'elementHandlers': specialElementHandlers
  //   });

  //   doc.save('tableToPdf.pdf');
  // }
  // exportAsPDF(divId:any)
  // {

  //   let data = document.getElementById(divId);
  //   console.log('Element found!',data);
  //   if (!data) {
  //     console.error('Element not found!');
  //     return;
  //   }
  //     html2canvas(data,{useCORS: true}).then(canvas => {
  //     const contentDataURL = canvas.toDataURL('image/jpeg')
  //     let pdf = new jsPDF('l', 'cm', 'a4');

  //     pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
  //     pdf.save('Filename.pdf');
  //   });
  // }
  isLoading: boolean = false;  // Loading flag

  exportAsPDFf(divId: any) {
    this.isLoading = true;
    setTimeout(() => {
      let data = document.getElementById(divId);

      if (!data) {
        console.error('Element not found!');
        this.isLoading = false;
        return;
      }

      html2canvas(data, { useCORS: true }).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/jpeg');
        let pdf = new jsPDF('l', 'cm', 'a4'); // Landscape mode with cm unit

        pdf.addImage(contentDataURL, 'JPEG', 0, 0, 29.7, 21.0);

        pdf.save('Filename.pdf');

        this.isLoading = false;  // Hide the loading indicator when done
      }).catch((error) => {
        console.error('Error generating PDF:', error);
        this.isLoading = false;
      });

    }, 100);
  }

  ensureImagesLoaded() {
    return new Promise<void>((resolve) => {
      const images = document.images;
      let loadedImages = 0;
      const totalImages = images.length;

      if (totalImages === 0) {
        resolve();
      }

      for (let i = 0; i < totalImages; i++) {
        if (images[i].complete) {
          loadedImages++;
        } else {
          images[i].addEventListener('load', () => {
            loadedImages++;
            if (loadedImages === totalImages) {
              resolve();
            }
          });
        }
      }
    });
  }

  exportAsPDFff(divId: string) {
    this.isLoading = true;  // Show loading indicator

    // Use setTimeout to allow UI updates before PDF generation
    setTimeout(() => {
      const data = document.getElementById(divId);

      if (!data) {
        console.error('Element not found!');
        this.isLoading = false;
        return;
      }

      // Capture the div as a canvas using html2canvas
      html2canvas(data, {
        useCORS: true,  // Enable cross-origin images
        scale: 2  // Higher scale for better quality
      }).then((canvas) => {
        const contentDataURL = canvas.toDataURL('image/jpeg');  // Convert the canvas to a base64 image

        // Create a new jsPDF instance in landscape mode with A4 size
        const pdf = new jsPDF('l', 'cm', 'a4');

        // Add the image to the PDF with full-page size
        pdf.addImage(contentDataURL, 'JPEG', 0, 0, 29.7, 21.0);

        // Save the generated PDF file
        pdf.save('GeneratedFile.pdf');

        // Hide loading indicator after the PDF is generated
        this.isLoading = false;
      }).catch((error) => {
        console.error('Error generating PDF:', error);
        this.isLoading = false;
      });
    }, 100);  // Small delay to ensure UI updates
  }

  exportAsPDFfff(divId: string) {
    this.isLoading = true;  // Show loading indicator

    setTimeout(() => {
      const data = document.getElementById(divId);

      if (!data) {
        console.error('Element not found!');
        this.isLoading = false;
        return;
      }

      // Capture the div as a canvas using html2canvas
      html2canvas(data, {
        useCORS: true,  // Enable cross-origin images
        scale: 2  // Higher scale for better quality
      }).then((canvas) => {
        const imgWidth = 29.7;
        const pageHeight = 30.0;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF('l', 'cm', 'a4');  // Landscape mode

        let position = 0;  // Starting position on the first page
        if (imgHeight > pageHeight) {
          // If the content overflows beyond one page, create new pages
          let heightLeft = imgHeight;

          while (heightLeft > 0) {
            pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            position = heightLeft > 0 ? -pageHeight : 0;
            if (heightLeft > 0) pdf.addPage();
          }
        } else {
          // If content fits on one page, add it directly
          pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, imgWidth, imgHeight);
        }

        // Save the generated PDF
        pdf.save('GeneratedFile.pdf');

        this.isLoading = false;  // Hide loading indicator after the PDF is generated
      }).catch((error) => {
        console.error('Error generating PDF:', error);
        this.isLoading = false;
      });
    }, 100);  // Small delay to ensure UI updates
  }

  exportAsPDFffff(divId: string) {
    this.isLoading = true; // Show loading indicator

    setTimeout(() => {
      const data = document.getElementById(divId);

      if (!data) {
        console.error('Element not found!');
        this.isLoading = false;
        return;
      }

      const pdf = new jsPDF('l', 'cm', 'a4'); // A4 Landscape

      // Calculate dimensions and scaling
      const pageWidth = pdf.internal.pageSize.getWidth();
      // const pageWidth = 29.7;
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Use html2canvas to capture the content
      html2canvas(data, {
        useCORS: true,
        scale: 2, // Increase scale for higher quality rendering
      }).then((canvas) => {
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Calculate scale ratio to fit everything on a single page
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

        // Get the scaled width and height for the image
        const scaledWidth = imgWidth * ratio;
        const scaledHeight = imgHeight * ratio;

        // Convert the canvas to an image
        const contentDataURL = canvas.toDataURL('image/jpeg');

        // Add image to the PDF at the scaled dimensions
        pdf.addImage(contentDataURL, 'JPEG', 0, 0, scaledWidth, scaledHeight);

        // Save the generated PDF
        pdf.save('GeneratedFile.pdf');

        this.isLoading = false; // Hide loading indicator when done
      }).catch((error) => {
        console.error('Error generating PDF:', error);
        this.isLoading = false;
      });

    }, 100); // Small delay to ensure UI updates
  }

  exportAsPDFfffff(divId: string) {
    this.isLoading = true; // Show loading indicator

    setTimeout(() => {
      const data = document.getElementById(divId);

      if (!data) {
        console.error('Element not found!');
        this.isLoading = false;
        return;
      }

      const pdf = new jsPDF('l', 'cm', 'a4'); // A4 Landscape

      // Calculate dimensions and scaling
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Use html2canvas to capture the content
      html2canvas(data, {
        useCORS: true,
        scale: 2, // Increase scale for higher quality rendering
      }).then((canvas) => {
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Calculate scale ratio to fit everything on a single page
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

        // Get the scaled width and height for the image
        const scaledWidth = imgWidth * ratio;
        const scaledHeight = imgHeight * ratio;

        // Convert the canvas to an image
        const contentDataURL = canvas.toDataURL('image/jpeg');

        // Add image to the PDF at the scaled dimensions
        pdf.addImage(contentDataURL, 'JPEG', 0, 0, scaledWidth, scaledHeight);

        // Save the generated PDF
        pdf.save('GeneratedFile.pdf');

        this.isLoading = false; // Hide loading indicator when done
      }).catch((error) => {
        console.error('Error generating PDF:', error);
        this.isLoading = false;
      });

    }, 100); // Small delay to ensure UI updates
  }

  exportAsPDF(divId: string) {
    this.isLoading = true;  // Show loading indicator

    setTimeout(() => {
      const data = document.getElementById(divId);

      if (!data) {
        console.error('Element not found!');
        this.isLoading = false;
        return;
      }

      // Capture the div as a canvas using html2canvas
      html2canvas(data, {
        useCORS: true,  // Enable cross-origin images
        scale: 2  // Higher scale for better quality
      }).then((canvas) => {
        const imgWidth = 29.7;  // PDF page width in cm for A4
        const pageHeight = 21.0;  // PDF page height in cm for A4 landscape
        const imgHeight = (canvas.height * imgWidth) / canvas.width;  // Calculate image height to maintain aspect ratio

        const pdf = new jsPDF('l', 'cm', 'a4');  // Landscape mode

        let position = 0;  // Starting position on the first page
        if (imgHeight > pageHeight) {
          // If the content overflows beyond one page, create new pages
          let heightLeft = imgHeight;

          while (heightLeft > 0) {
            pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            position = heightLeft > 0 ? -pageHeight : 0;
            if (heightLeft > 0) pdf.addPage();
          }
        } else {
          // If content fits on one page, add it directly
          pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, imgWidth, imgHeight);
        }

        // Save the generated PDF
        pdf.save('GeneratedFile.pdf');

        this.isLoading = false;  // Hide loading indicator after the PDF is generated
      }).catch((error) => {
        console.error('Error generating PDF:', error);
        this.isLoading = false;
      });
    }, 100);  // Small delay to ensure UI updates
  }




















  generatePdf(data:any) {

    html2canvas(data, { allowTaint: true }).then(canvas => {
     let HTML_Width = canvas.width;
     let HTML_Height = canvas.height;
     let top_left_margin = 15;
     let PDF_Width = HTML_Width + (top_left_margin * 2);
     let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
     let canvas_image_width = HTML_Width;
     let canvas_image_height = HTML_Height;
     let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
     canvas.getContext('2d');
     let imgData = canvas.toDataURL("image/jpeg", 1.0);
     let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
     pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
     for (let i = 1; i <= totalPDFPages; i++) {
       pdf.addPage([PDF_Width, PDF_Height], 'p');
       pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
     }
      pdf.save("HTML-Document.pdf");
   });
 }
     print3() {

  let doc: any = document;
  doc.printJs();
}
 printt(){
  let data = document.getElementById("pdf")!;
  html2canvas(data).then(canvas => {
  const contentDataURL = canvas.toDataURL('image/jpeg')  // 'image/jpeg' for lower quality output.
  let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
  // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
  pdf.addImage(contentDataURL, 'jpg', 0, 0, 29.7, 21.0);
  // window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
  window.open(pdf.output('bloburl'))
  // var base64string = pdf.output('bloburl');
  // this.debugBase64( base64string );


  // const printContent = document.getElementById("MyDIv")!;
  // const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0')!;
  // WindowPrt.document.write(printContent.innerHTML);
  // WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="src/styles.scss">');
  // WindowPrt.document.close();
  // WindowPrt.focus();
  // WindowPrt.print();
  // WindowPrt.close();
  });
}

printtt() {
  // Find the div element by its ID
  let printContents = document.getElementById('pdf')?.innerHTML;
  if (!printContents) {
    console.error('Element not found!');
    return;
  }

  // Open a new window
  let originalContents = document.body.innerHTML;
  let popupWindow = window.open('' , 'top=0,left=0,height=100%,width=auto');

  if (popupWindow) {
    popupWindow.document.open();
    popupWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
          <style>
            /* Add any custom styles you want for the printed content here */
            body { font-family: Arial, sans-serif; margin: 20px; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    popupWindow.document.close();

    // Wait for the content to load and then print
    popupWindow.focus();
    popupWindow.print();
    popupWindow.close();
  }
}
printttt() {
  // Find the div element by its ID
  let printContents = document.getElementById('pdf')?.innerHTML;
  if (!printContents) {
    console.error('Element not found!');
    return;
  }

  // Open a new window
  let popupWindow = window.open('', 'top=0,left=0,height=100%,width=auto');

  if (popupWindow) {
    popupWindow.document.open();
    popupWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <link id="bootstrap-link" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    popupWindow.document.close();

    // Wait for the stylesheet to load before printing
    const bootstrapLink = popupWindow.document.getElementById('bootstrap-link');
    bootstrapLink!.onload = function() {
      popupWindow!.focus();
      popupWindow!.print();
      popupWindow!.close();
    };
  }
}




print() {
  // Find the div element by its ID
  let printContents = document.getElementById('pdf')?.innerHTML;
  if (!printContents) {
    console.error('Element not found!');
    return;
  }

  // Check if the popup window is already open
  if (popupWindow && !popupWindow.closed) {
    // Reuse the existing popup window and refresh its content
    popupWindow.document.body.innerHTML = `
      <html>
        <head>
          <title>Print</title>
          <link id="bootstrap-link" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `;
  } else {
    // Create a new popup window
    popupWindow = window.open('', 'top=0,left=0,height=100%,width=auto');

    if (popupWindow) {
      popupWindow.document.open();
      popupWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <link id="bootstrap-link" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `);
      popupWindow.document.close();
    }
  }

  // Wait for the stylesheet to load before printing
  const bootstrapLink = popupWindow?.document.getElementById('bootstrap-link');
  bootstrapLink!.onload = function() {
    popupWindow!.focus();
    popupWindow!.print();
  };
}



   debugBase64(base64URL:any){
    var win = window.open()!;
    win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}
OnPrint() {

  window.print();
}
public convetToPDF()
{
  const  data = document.getElementById('contentToConvert')as HTMLElement; ;
html2canvas(data,{ logging: true,  allowTaint: true, useCORS: true }).then(canvas => {
// Few necessary setting options
var imgWidth = 208;
var pageHeight = 295;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;

const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
var position = 0;
pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
pdf.save('new-file.pdf'); // Generated PDF
});
}
exportAllToPDF(pages: HTMLElement) {
  const doc = new jsPDF({
    unit: 'px',
    // format: this.pdfOptions.value.pageFormat === 'A4' ? [595, 842] : [842, 1191]
  });

  doc.html(pages, {
    callback: (doc: jsPDF) => {
      doc.deletePage(doc.getNumberOfPages());
      doc.save('pdf-export');
    }
  });
}
onConfirm() {
  const pages = document.querySelector('.xxcprint') as HTMLElement;
  this.exportAllToPDF(pages);
}

public downloadAsPDF10() {
  const doc = new jsPDF();

  const pdfTable = this.pdfTable.nativeElement;
  var htmlToPdfmake = require("html-to-pdfmake");

  var html = htmlToPdfmake(pdfTable.innerHTML);

  const documentDefinition = { content: html };
  pdfMake.createPdf(documentDefinition).open();

}
ngOnDestroy() {
  for(let i=0;i<this.subscriptions.length;i++)
  this.subscriptions[i].unsubscribe();
}
}
