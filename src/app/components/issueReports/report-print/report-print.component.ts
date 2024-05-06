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
    this.subscriptions.push(this._adminservices.CreateIssuePDF(this.paramid).subscribe(data => saveAs(data, 'Example.pdf')))


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
  exportAsPDF(divId:any)
  {

      let data = document.getElementById(divId)!;
      html2canvas(data,{useCORS: true}).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/jpeg')  // 'image/jpeg' for lower quality output.
      let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save('Filename.pdf');
    });
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
 print(){
  let data = document.getElementById("MyDIv")!;
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
