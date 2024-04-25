import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss']
})
export class UserMessageComponent {
  showSide:string = '';
  value:any=''
  paramid:any=""
  chatID:any;
  allChat :any[]=[]
  deatail:any={}
  activePerson:boolean=true
   constructor(    private uploadService: UploadFileService,  public router: Router, private _ActivatedRoute:ActivatedRoute,public _ticketService:AdminsService ,private messageService: MessageService,) {
    this.paramid = _ActivatedRoute.snapshot.paramMap.get('id');

   }
   ngOnInit() {
    this.GetChatHistory();
    this.getUserDetails();
    if(this.allChat.length == 0){
      this.StartNewChatWithUser();
    }
  }
  addItem(value:any){
    this.showSide=value
  }
  getUserDetails(){
    this._ticketService.TenantDetails(this.paramid).subscribe((res:any) => {
      this.deatail = res;

     }, (error) => {
       console.error('Error fetching owners:', error);
    });
  }

  StartNewChatWithUser(){
    this._ticketService.StartNewChatWithUser(this.paramid).subscribe({
      next:(data:any)=>{
        this.chatID = data.uuid;
        this.messageService.add({   severity: 'success', summary: 'Success', detail: data.message });
      },
      error:(err:any)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "error" });
      }
    })

  }
  GetChatHistory(   ) {
     this._ticketService.GetChatHistory(this.chatID).subscribe((res:any) => {
      this.allChat = res;
     }, (error) => {
       console.error('Error fetching owners:', error);
    })
  }
  message = '';preview = '';progress = 0;
 reply_Desc:any=""
 urls = new Array<string>();
 counter=0;
 selectedFiles?: FileList;
 currentFile?: File ;selectedContractImg:any

 selectFile(event: any): void {
   this.ListFiles=null
   this.message = '';
   this.preview = '';
   this.progress = 0;
   this.selectedFiles = event.target.files;

    let files = event.target.files;

   if (files) {
     this.selectedContractImg = files  ;

     for (let file of files) {

       this.ListFiles=file;
        let reader = new FileReader();
       reader.onload = (e: any) => {

          this.urls.push(e.target.result);
       }
       reader.readAsDataURL(file);
     }
   }
  this.upload();
 }
 SendMsg() {
  let data = {
    chat_ID: this.chatID,
    msg_Body: this.reply_Desc,
    msg_Attachement: this.apt_imgs,
  }
  this._ticketService.SendMsg(data).subscribe((res) => {
     this.messageService.add({ severity: 'success', summary: 'Success', detail:"send Success" });
     this.GetChatHistory()
     this.reply_Desc ="";
     this.apt_imgs = null;
   }, (error) => {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: "error" });
  })
}

display22:any="none"
imageSize:any=""
openmodel(image:any){
  this.display22="block"
  this.imageSize=image

}
oncloseModal(){
  this.display22="none"

}
gotopage( ){
  let url: string = "messages";
    this.router.navigateByUrl(url);
}
convertFileToFormData(files: any ) {
  const formData = new FormData();

     formData.append('fileData', files , files.name);


  return formData;
}

   readFile(file: File): Observable<string> {

   return new Observable(obs => {
     const reader = new FileReader();
     reader.onload = (e: any) => {

       obs.next(reader.result as string);
       obs.complete();

     }
     reader.readAsDataURL(file);
   });
 }

ListFiles:any=[]
imageList:any={}
apt_imgs:any
upload(): void {
           this.uploadService.uploadSingleFile(this.convertFileToFormData(this.ListFiles )).subscribe(data => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'attach Upload Successfully'}` });
            debugger

              this.apt_imgs= data[0].file_Path  ;



          });
        }
}
