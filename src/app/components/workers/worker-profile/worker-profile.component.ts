import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OnwerService } from 'src/app/_services/Onwers/onwer.service';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { AdminsService } from 'src/app/_services/admins/admins.service';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css']
})
export class WorkerProfileComponent implements OnInit {

  constructor(
    private viewportScroller: ViewportScroller,
    private uploadService: UploadFileService,

    private messageService: MessageService,
    public router: Router, public _adminservices:AdminsService,
    public _ActivatedRoute: ActivatedRoute,
    public _OnwerService: OnwerService) {
    this.param = _ActivatedRoute.snapshot.paramMap.get('id');
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
 /** createworker  */
 createworker!: FormGroup;
 /** id  */
 id: string = '';
 /** selectedCity  */
 selectedCity: any = '';
 /** loadingButton */
 loadingButton: boolean = false;
 // param title page
 pageTitle:any
 problemcount=0;
 subscriptions:Subscription[] = [];
 ngOnInit() {
  this.ListJobs( );

    this.bindCreateworker()

    this.GetWorkerByid();
    this.checkRole();
 }
 workersRole:any
 is_Super:any
 dataworker:any={}
 checkRole(){
   const data = localStorage.getItem("user");
    if (data !== null) {

     let parsedData = JSON.parse(data);
      this.is_Super=parsedData.is_Super
     if(parsedData.is_Super==false) {
 for(let i=0; i<parsedData.permissions.length;i++){
   if(parsedData.permissions[i].page_Name=="workers"){
     this.workersRole=parsedData.permissions[i];
   }
 }
 if(this.workersRole.p_Update==false &&this.is_Super==false) {
  let url: string = "unlegal";
  this.router.navigateByUrl(url); }
}


   }
 }
 showEdit: Array<boolean> = [];
 detailperson(event:any, id: any){
  this.showEdit=[]
event.stopPropagation()

  this.showEdit[id] == true ? this.showEdit[id] = false : this.showEdit[id] = true





 }
 hidecard( ){
  this.showEdit=[]

}
totalRecords=0
pageNumber=1;
numberissues=0;
pagesize=10;
tiggerPageChange(event: any) {

    const calcPageNumber = Math.floor(event.first / event.rows) + 1;
    this.pageNumber=calcPageNumber;
    this.GetWorkerByid();
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

worker_Skills: Array<any> = []
Skills(value: any): void {

  this.joddd2.skill_Name=value.skill_Name;
   this.worker_Skills.push( this.joddd2);
   this.joddd.skill_Name=value.skill_Content;
   this.worker_Skills.push(this.joddd );
   this.joddd2={}
   this.joddd={}
}
localapt_Transports : Array<any>=[];
LabelTransport: object = { text1: 'skill 1', text2: 'skill 2' };

bindCreateworker(): void {
  this.createworker = new FormGroup({
    'worker_FName': new FormControl('', [Validators.required]),
    'worker_LName': new FormControl('', [Validators.required]),
    'worker_Email': new FormControl('', [Validators.email, Validators.required]),
    'worker_Address': new FormControl('', [Validators.required]),
    'worker_ID': new FormControl(this.param, [Validators.required]),


    'worker_Type': new FormControl('', [Validators.required]),
    'worker_About': new FormControl('', [Validators.required]),
    'worker_PhoneNum': new FormControl('', [Validators.required]),
    'worker_WANum': new FormControl('', [Validators.required]),
    'worker_Img': new FormControl('', [Validators.required]),
    'worker_Passport': new FormControl('', [Validators.required]),
    'worker_BankName': new FormControl('', [Validators.required]),
    'worker_AccountNo': new FormControl('', [Validators.required]),
    'worker_Swift': new FormControl('', [Validators.required]),
    'worker_Job': new FormControl('', [Validators.required]),


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
  const ownerDOB = this.createworker.get('owner_DOB')?.value;
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
ListJobs( ) {
  this.subscriptions.push(this._adminservices.ListJobs( ).subscribe((res) => {
    this.jobs=res
  }, (err: any) => {

    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${ err.error.message[0]}` });
  }));

}
GetWorkerByid( ) {
  this.subscriptions.push(  this._adminservices.GetWorkerByid(this.param).subscribe((res) => {
    this.dataworker=res
   this.problemcount=res["issues"].length
   }, (err: any) => {

   this.messageService.add({ severity: 'error', summary: 'Error', detail: `${ err.error.message[0]}` });
 }))
}

createworkerpost(data: any) {

  data.value.worker_PhoneNum = String(data.value.worker_PhoneNum);
  data.value.worker_WANum = String(data.value.worker_WANum);
  this.subscriptions.push( this._adminservices.UpdateWorker({ ...data.value, worker_Skills: this.worker_Skills },this.param).subscribe((res) => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'Your Data has been Successfully updated into DB  '}` });



  }, (err: any) => {

    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${ err.error.message[0]}` });
  }))



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
        // call the onUpload function to get the link to the file
        this.subscriptions.push( this.uploadService.uploadSingleFile(formData).subscribe((img: any) => {
          // create url to preview file
          file.url = URL.createObjectURL(file);
          this.selectedContractImg = file;

          this.messageService.add({ severity: 'success', summary: 'Success', detail: `photo Upload Successfuly` });

    this.createworker.get("worker_Passport")?.patchValue(img[0].file_Path);

        }, (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Please try again` });
        }))

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
      this.display2="block"
    }

    updateUserImage(event: any) {
      this.createworker.get('worker_Img')?.setValue(event);

    }
    PostJob( ) {
      this.subscriptions.push(      this._adminservices.PostJob( this.Jobname).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${' Job has been Successfully inserted into DB  '}` });


        this.Jobname=""
        this.ListJobs( ) ;
        this.onCloseModal2()

      }, (err: any) => {

        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${ err.error.message[0]}` });
        this.Jobname=""

      }))


  }
  gotopage( ){
    let url: string = "workers";
      this.router.navigateByUrl(url);
  }

  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }

}
