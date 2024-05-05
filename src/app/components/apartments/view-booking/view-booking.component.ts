import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { InquiresService } from 'src/app/_services/inquires/inquires.service';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  showSide: string = '';
  value: string = '';
  cities: Array<object> = [];
  selectedCity: Object = {};
  available: boolean = true;
  link: Array<boolean> = [true];
  subscriptions:Subscription[] = [];
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
  products:any=[{ Invoice:"invoice435",date:"April 27 - May 27, 2023",Amount:"$35,00",Behaviour:true},
  { Invoice:"invoice435",date:"April 27 - May 27, 2023",Amount:"$35,00",Behaviour:true},
  { Invoice:"invoice435",date:"April 27 - May 27, 2023",Amount:"$35,00",Behaviour:true},{ Invoice:"invoice435",date:"April 27 - May 27, 2023",Amount:"$35,00",Behaviour:true}]
  ngOnInit() {
    this.initCities();
    this.GetReqHistory(  );
    this. checkRole();
  }

   param:any
  constructor(private uploadFile: UploadFileService, public _adminservices:AdminsService ,private viewportScroller: ViewportScroller,private _inquiresService:InquiresService,private _ActivatedRoute:ActivatedRoute,private messageService: MessageService,public router: Router) {
    this.param = _ActivatedRoute.snapshot.paramMap.get('id');

  }
  TantsRole:any
  is_Super:any
  checkRole(){
    const data = localStorage.getItem("user");
     if (data !== null) {

      let parsedData = JSON.parse(data);
       this.is_Super=parsedData.is_Super
      if(parsedData.is_Super==false) {
  for(let i=0; i<parsedData.permissions.length;i++){
    if(parsedData.permissions[i].page_Name=="Users"){
      this.TantsRole=parsedData.permissions[i];
    }
  }
  if(this.TantsRole.p_Update==false &&this.is_Super==false) {
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
    let url: string = "users";
      this.router.navigateByUrl(url);
  }
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
  Tenant_details:any={}
  tReqHistory:any={}
  tenant_photo=""
  GetReqHistory(  ) {
    this.subscriptions.push( this._adminservices.GetReqHistory(this.param).subscribe((res) => {
      this.tReqHistory = res ;

      }, (error) => {
       console.error('Error fetching owners:', error);
    }));

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

    this.subscriptions.push(  this.uploadFile.uploadSingleFile(formData).subscribe((img: any) => {
      this.imageUrl = img[0].file_Path;
      this.changeImageUrl.emit(img[0].file_Path);
      this.loadingButton = false;
    }));

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

  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }
  
}
