import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OnwerService } from 'src/app/_services/Onwers/onwer.service';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { AdminsService } from 'src/app/_services/admins/admins.service';

@Component({
  selector: 'app-view-partner',
  templateUrl: './view-partner.component.html',
  styleUrls: ['./view-partner.component.css']
})
export class ViewPartnerComponent implements OnInit {
paramTile="partenerView"
  constructor(
    private viewportScroller: ViewportScroller,
    private uploadService: UploadFileService,

    private messageService: MessageService,
    public router: Router, public _adminservices:AdminsService,
    public _ActivatedRoute: ActivatedRoute,
    public _OnwerService: OnwerService) {
    this.param = _ActivatedRoute.snapshot.paramMap.get('id');
    this.pageTitle=_ActivatedRoute.snapshot.paramMap.get('page')
    this.scrollTop();
    this.checkPage();
  }
 /** showSide  */
 showSide: string = '';
 /** available  */
 available: boolean = true;
 /** link  */
 link: Array<boolean> = [true];
 /** cities  */
 cities: Array<object> = [];
 /** param  */
 param: any;
 /** listAnchors  */
 listAnchors: any = [];
 /** createpartner  */
 createpartner!: FormGroup;
 /** id  */
 id: string = '';
 /** selectedCity  */
 selectedCity: any = '';
 /** loadingButton */
 loadingButton: boolean = false;
 // param title page
 pageTitle:any
 ngOnInit() {
    this.bindCreatepartner()
    this.GetCountries( )
    this.GetPartnerProfile( );
    this.checkRole()
 }
 partnersRole:any
 is_Super:any
 checkRole(){
   const data = localStorage.getItem("user");
    if (data !== null) {

     let parsedData = JSON.parse(data);
      this.is_Super=parsedData.is_Super
     if(parsedData.is_Super==false) {
 for(let i=0; i<parsedData.permissions.length;i++){
   if(parsedData.permissions[i].page_Name=="partners"){
     this.partnersRole=parsedData.permissions[i];
   }
 }
 if(this.partnersRole.p_Add==false &&this.is_Super==false) {
  let url: string = "unlegal";
  this.router.navigateByUrl(url); }
}


   }
 }

 checkPage(): void {

    this.listAnchors = [
      { id: 'Generalinfo', link: 'General info' },
      { id: 'OtherDetails', link: 'Other Details' },
      { id: 'Bankdetails', link: 'Bank details' }
    ]
}

 addItem(value: string) {
  this.showSide = value
}
joddd:any={ }
joddd2:any={ }

partner_Skills: Array<any> = []
Skills(value: any): void {

  this.joddd2.skill_Name=value.skill_Name;
   this.partner_Skills.push( this.joddd2);
   this.joddd.skill_Name=value.skill_Content;
   this.partner_Skills.push(this.joddd );
   this.joddd2={}
   this.joddd={}
}
localapt_Transports : Array<any>=[];
LabelTransport: object = { text1: 'skill 1', text2: 'skill 2' };

bindCreatepartner(): void {
  this.createpartner = new FormGroup({
    'partner_FName': new FormControl('', [Validators.required]),
    'partner_LName': new FormControl('', [Validators.required]),
    'partner_Commession': new FormControl(0, [Validators.required]),

    'partner_Email': new FormControl('', [Validators.email, Validators.required]),
    'partner_Code': new FormControl('', [Validators.required]),
    'partner_Nationality': new FormControl('', [Validators.required]),


    'partner_Type': new FormControl('', [Validators.required]),
    'partner_About': new FormControl('', [Validators.required]),
    'partner_PhoneNumber': new FormControl('', [Validators.required]),
    'partner_WANumber': new FormControl('', [Validators.required]),
    'partner_Photo': new FormControl('', [Validators.required]),
    'partner_Passport': new FormControl('', [Validators.required]),
    'partner_Bank': new FormControl('', [Validators.required]),
    'partner_Account': new FormControl('', [Validators.required]),
    'partner_Swift': new FormControl('', [Validators.required]),


  });
}
scrollTop(): void {
  window.scrollTo(0, 0)
}
changeAnchor(index: number): void {
  this.link = this.link.map(el => el == true ? false : false)
  this.link[index] = true
}
get formattedDate(): string {
  // Retrieve the 'owner_DOB' value from the form control
  const ownerDOB = this.createpartner.get('owner_DOB')?.value;
  // Check if the 'ownerDOB' value is a valid Date object
  if (ownerDOB instanceof Date) {
    // Extract year, month, and day components from the Date
    const year = ownerDOB.getFullYear();
    const month = String(ownerDOB.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-indexed
    const day = String(ownerDOB.getDate()).padStart(2, '0');
    // Return the formatted date string in "YYYY-MM-DD" format
    return `${year}-${month}-${day}`;
  }
  // Return an empty string if the value is not a valid Date object
  return '';
}
public onClick(elementId: string): void {
  this.viewportScroller.scrollToAnchor(elementId);
}

jobs:any=[]
detil_part:any={}
GetPartnerProfile( ) {

  this._adminservices.PartnerProfile(this.param ).subscribe((res) => {
    this.createpartner.patchValue(res);
    this.detil_part=res
      this.selectedContractImg = { 'url':res.partner_Passport};  }, (err: any) => {

    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${ err.error.message[0]}` });
  })


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
Countries:any=[]
GetCountries( ) {

  this._adminservices.GetCountries().subscribe((res) => {
    this.Countries=res
  }, (err: any) => {

    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message[0]}\n` });

  })

}
GetAgencyCode( ) {

  this._adminservices.GetAgencyCode().subscribe((res) => {
    this.createpartner.get("partner_Code")?.patchValue(res);

  }, (err: any) => {

    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message[0]}\n` });

  })

}
 spinner :boolean= false;
 gotopage( ){
  let url: string = "partner";
    this.router.navigateByUrl(url);
}

createpartnerpost(data: any) {
  data.value.partner_PhoneNumber = String(data.value.partner_PhoneNumber);
  data.value.partner_WANumber = String(data.value.partner_WANumber);

  this.spinner = true;

        this._adminservices.PostPartner({ ...data.value}).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'Your Data has been Successfully inserted into DB  '}` });

          this.spinner = false;
          this.gotopage( )

        }, (err: any) => {

          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message[0]}\n` });
          this.spinner = false;

        })


    }
    formData2 = new FormData();
    selectedContractImg:any
    onUploadContract(event: any, fieldName: string): void {
      // get the file

      const file = event.target.files[0];
      // convert the file to formdata
      const formData = new FormData();
      formData.append('fileData', file, file.name);
      // check if the file has been uploaded
      if (file) {
        this.spinner = true;

        // call the onUpload function to get the link to the file
        this.uploadService.uploadSingleFile(formData).subscribe((img: any) => {
          // create url to preview file
          file.url = URL.createObjectURL(file);
          this.selectedContractImg = file;

          this.messageService.add({ severity: 'success', summary: 'Success', detail: `photo Upload Successfuly` });

    this.createpartner.get("partner_Passport")?.patchValue(img[0].file_Path);
    this.spinner = false;


        }, (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Please try again` });
          this.spinner = false;

        });
      }
    }

    /**
     * defaultImageUrl
     * @returns string
     */
    defaultImageUrl(): string {
      return 'https://t4.ftcdn.net/jpg/05/50/60/49/360_F_550604961_BZT4vo52ysIku2cQ3Zn8sAQg1rXHBKv0.jpg'
    }
    Jobname=""
    display2="none"
    onCloseModal2(){
      this.Jobname=""
      this.display2="none"

    }
    onOpenModal2(){
      this.Jobname=""

      this.display2="block"
    }

    updateUserImage(event: any) {
      this.createpartner.get('partner_Photo')?.setValue(event);

    }
    PostJob( ) {

      this._adminservices.PostJob( this.Jobname).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${' Job has been Successfully inserted into DB  '}` });


        this.Jobname=""
        this.GetPartnerProfile( ) ;
        this.onCloseModal2()

      }, (err: any) => {

        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${ err.error.message[0]}` });
        this.Jobname=""

      })


  }
}
