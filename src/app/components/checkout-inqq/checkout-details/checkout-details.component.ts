import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { InquiresService } from 'src/app/_services/inquires/inquires.service';

@Component({
  selector: 'app-checkout-details',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.css']
})
export class CheckoutDetailsComponent implements OnInit  {
  showSide: string = '';
  value: string = '';
  cities: Array<object> = [];
  selectedCity: Object = {};
  available: boolean = true;
  link: Array<boolean> = [true];
  listAnchors: any = [
    { id: 'Generalinfo', link: 'General info' },
    { id: 'OtherDetails', link: 'Other Details' },
    { id: 'Documentdetails', link: 'Document details' },
    { id: 'Rentalhistory', link: 'Rental history' },
    { id: 'userinformation', link: 'user information' },
  ]
   titlePage: string = '';
   changeImageUrl:any;
  imageUrl: string = '';
  loadingButton: boolean = false;
    ngOnInit() {
     this.GeCheckoutSheet(  );
   }

   param:any
  constructor(private uploadFile: UploadFileService, public _adminservices:AdminsService ,private viewportScroller: ViewportScroller,private _inquiresService:InquiresService,private _ActivatedRoute:ActivatedRoute,private messageService: MessageService,public router: Router) {
    this.param = _ActivatedRoute.snapshot.paramMap.get('id');

  }
  TantsRole:any
  is_Super:any

  gotopage( ){
    let url: string = "unlegal";
      this.router.navigateByUrl(url);
  }
  gotopage2( ){
    let url: string = "users";
      this.router.navigateByUrl(url);
  }
  /**
   * initCities
   * @return void
   */

  Tenant_details:any={}
  CheckoutSheet:any={}
  tenant_photo=""
  GeCheckoutSheet(  ) {
    this._adminservices.GetCheckoutSheetDetails(this.param).subscribe((res) => {
    this.CheckoutSheet = res ;

    }, (error) => {
     console.error('Error fetching owners:', error);
  })
}
User_ID: any;
 FName: any;
 LName:any;
 PassportID:any;
 About:any;
 image:any

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
  formData2 = new FormData();
  uploadPic(event: any) {

    this.loadingButton = true;
    if (event != 'delete') {
      const selectedFile = event.target.files[0];
      const formData = new FormData();
      formData.append('fileData', selectedFile, selectedFile.name);
      this.formData2.append('User_Img', selectedFile);

      this.uploadFile.uploadSingleFile(formData).subscribe((img: any) => {
        this.imageUrl = img[0].file_Path;
        this.changeImageUrl.emit(img[0].file_Path);
        this.loadingButton = false;
      })
    } else if (event == 'delete') {
      this.imageUrl = '';
      this.changeImageUrl.emit(this.defaultImageUrl());
      this.loadingButton = false;
    }
  }

  /**
   * defaultImageUrl
   * @returns string
   */
  defaultImageUrl(): string {
    return 'https://t4.ftcdn.net/jpg/05/50/60/49/360_F_550604961_BZT4vo52ysIku2cQ3Zn8sAQg1rXHBKv0.jpg'
  }
  gotodetail(id:any){
    let url: string = "invoice/"+id;
    this.router.navigateByUrl(url);
  }
  display1:any="none"
  AddnewExpense(){
    this.expense_type = "";
    this.cost_expense=""
    this.Description_expense=""
    this.urlimageadd=""
    this.display1="block"

  }
  onCloseModal1()
{
  this.display1="none"
}
imageSize: any;
opencloseModal(photo: any) {
  this.display1 = 'block';
  this.imageSize = photo;
}

cost_expense:any=""
expense_type:any=""
Description_expense:any=""
urlimageadd:any=""
uploadPic2(event: any) {
  const selectedFile = event.target.files[0];
  this.formData2 = new FormData();
  this.formData2.append('fileData', selectedFile, selectedFile.name);
   this.uploadFile
    .uploadSingleFile(this.formData2)
    .subscribe((data) => {
      this.urlimageadd=data[0].file_Path
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `${'Images Upload Successfully'}`,
      });
    });
}
selectedFiles?: FileList;
currentFile?: File;
progress = 0;
  message = '';
  preview = '';
  imageInfos?: any = [];
  ListFiles: any;
  urls: any = null;
  counter = 0;
  link_create_ads: any = '';
  removeItem() {
    this.ListFiles = null;
    this.urls = null;
  }
  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    let files = event.target.files;
    this.ListFiles = event.target.files;

    if (files) {
      for (let file of files) {
        this.ListFiles = file;
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  readFile(file: File): Observable<string> {
    return new Observable((obs) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        obs.next(reader.result as string);
        obs.complete();
      };
      reader.readAsDataURL(file);
    });
  }
  AddExpense() {
 let data={
   req_ID : this.param,
   expense_Type :  this.expense_type,
   expense_Amount : this.cost_expense,
   expense_Desc : this.Description_expense,
   expense_File : this.urlimageadd,
 }

    this._adminservices.AddExpense(data).subscribe(
      (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res['message'],
        });
        this.display1 = 'none';
        this.expense_type = "";
        this.cost_expense=""
        this.Description_expense=""
        this.urlimageadd=""
        this.GeCheckoutSheet();
      },
      (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${err.error.message[0]}`,
        });
      }
    );
  }
  idUpdat:any=""
  OpenupdateExpene(data:any){
    this.expense_type=data.expense_Type;
     this.cost_expense= data.expense_Amount;
     this.Description_expense=data.expense_Desc;
     this.urlimageadd=data.expense_File ;
     this.idUpdat=data.expense_ID
      this.display2="block"
  }
  updateExpene(){
    let data={
      id : this.idUpdat,
      expense_Type :  this.expense_type,
      expense_Amount : this.cost_expense,
      expense_Desc : this.Description_expense,
      expense_File : this.urlimageadd,
    }

       this._adminservices.UpdateExpense(data).subscribe(
         (res: any) => {
           this.messageService.add({
             severity: 'success',
             summary: 'Success',
             detail: res['message'],
           });
           this.display2 = 'none';
           this.expense_type = "";
           this.cost_expense=""
           this.Description_expense=""
           this.urlimageadd=""
           this.GeCheckoutSheet();

         },
         (err: any) => {
           this.messageService.add({
             severity: 'error',
             summary: 'Error',
             detail: `${err.error.message[0]}`,
           });
         }
       );
  }
  display2="none"
  onCloseModal2(){
    this.display2="none"
  }
  DeleteExpene(termina:any){

    this._adminservices.DeleteExpense(termina.expense_ID).subscribe(
      (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res['message'],
        });

        this.expense_type = "";
        this.cost_expense=""
        this.Description_expense=""
        this.urlimageadd=""
        this.GeCheckoutSheet();

      },
      (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${err.error.message[0]}`,
        });
      }
    );

  }
  showEdit: Array<boolean> = [];

  detailperson(event:any,id: any): void {
    this.showEdit=[]
    event.stopPropagation()

    this.showEdit[id] == true ? this.showEdit[id] = false : this.showEdit[id] = true



   }
   hidecard( ){
    this.showEdit=[]

 }
 display3:any="none"
 onCloseModal4(){
  this.display3="none"
 }
 InsertCheckOut( ) {
  this._adminservices
    .InsertCheckOut( this.param)
    .subscribe(
      (res) => {
        this.display3="block"

       },
      (error) => {

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'error',
        });
        this.display3="none"

      }
    );
}
gotoListCheckOut(){
  let url: string = "/checkout-inquire";
  this.router.navigateByUrl(url);
}
}
