import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminsService } from 'src/app/_services/admins/admins.service';
@Component({
  selector: 'app-assgin-issue',
  templateUrl: './assgin-issue.component.html',
  styleUrls: ['./assgin-issue.component.css']
})
export class AssginIssueComponent implements OnInit {

  showEdit: Array<boolean> = [];
 showSide: string = '';
 products!: Array<object>;
 selectedProducts: Array<object> = [];
 headerData: Array<any> = [];
 loading: boolean = true;
 search:boolean=false
 paramid:any
 listDropDown:Array<object>=[{name:'All'},{name:'Today'},{name:'Last Week'},{name:'This month'},{name:'This year'}]

 constructor(public router: Router, private _ActivatedRoute:ActivatedRoute,public _adminservices:AdminsService ,private messageService: MessageService,) {
  this.paramid = _ActivatedRoute.snapshot.paramMap.get('id');

 }

 ngOnInit() {
   this.getAllworkers(  )
   this.checkRole();
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
   this.gotopage2( )
 }
 }


   }
 }
 gotopage2( ){
   let url: string = "unlegal";
     this.router.navigateByUrl(url);
 }
  /**
  * selectedfromDropDown
  * @param $event string
  * @returns void
  */
 selectedfromDropDown(value:any){

   this.Date=value.name;
   // this.getAllworkers()
   console.log(value)
 }
 /**
  * addItem
  * @param value string
  * @returns void
  */
 addItem(value: string): void {
   this.showSide = value
 }
 idworkerassigin:any=""
 handleChange(evt:any,idworker:any) {

  this.idworkerassigin=idworker
  var target = evt.target;
  if (target.checked) {
   } else {
   }
}

 statusTenant:any=""
 pageNumber=1;
 pagesize=10;
 totalofPages=0;;
 disablenext=false;
 disableperv=false;
 incrementpage(){

   this.pageNumber+=1;
   if(this.pageNumber<1){
     this.pageNumber=1;

   }
   if(this.pageNumber>= this.totalofPages){
     this.pageNumber=this.totalofPages;

   }
   // this.getAllworkers( );
 }
 decreamentPage(){
   this.pageNumber-=1;
   if(this.pageNumber<1){
     this.pageNumber=1;

   }
   // this.getAllworkers( );

 }
workers=[]
totalRecords=0
tiggerPageChange(event: any) {

     const calcPageNumber = Math.floor(event.first / event.rows) + 1;
     this.pageNumber=calcPageNumber;
     console.log(calcPageNumber);
     this.getAllworkers(  )
    }
 numberworkers=0;
 Date:any="All"

  getAllworkers(  ) {
   this.workers=[]
   this.numberworkers=0
   this._adminservices.GetAllWorkers( this.pageNumber,this.pagesize,"").subscribe((res:any) => {
     this.workers = res["data"];
     this.totalRecords=res["totalRecords"]

     this.numberworkers = this.workers.length;
     this.totalofPages=res["totalPages"]


    }, (error) => {
      console.error('Error fetching owners:', error);
   })
 }
 // DeleteUser(id :any){
 //   this._adminservices.DeleteTenant( id).subscribe((res:any) => {
 //     this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'Deleted Successfuly'}` });

 //     this.getAllworkers( );

 //    }, (error) => {
 //     this.messageService.add({ severity: 'error', summary: 'Error', detail: `${'error'}` });
 //   })

 // }
 // SuspendUser(id:any){
 //   this._adminservices.SuspendTenant( id).subscribe((res:any) => {
 //     this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'Suspended Successfuly'}` });

 //     this.getAllworkers( );

 //    }, (error) => {
 //     this.messageService.add({ severity: 'error', summary: 'Error', detail: `${'error'}` });
 //   })
 // }
 detailperson(event:any,id: any): void {
   this.showEdit=[]
   event.stopPropagation()

   this.showEdit[id] == true ? this.showEdit[id] = false : this.showEdit[id] = true



  }
  hidecard( ){
   this.showEdit=[]

}
PostJob( id:any) {

 this._adminservices.DeleteWorker(id ).subscribe((res) => {
   this.messageService.add({ severity: 'success', summary: 'Success', detail: `${' worker has been Successfully deleted into DB  '}` });


   this.getAllworkers()

 }, (err: any) => {

   this.messageService.add({ severity: 'error', summary: 'Error', detail: `${ err.error.message[0]}` });

 })


}
gotopage( ){
  let url: string = "Issue_Reports";
    this.router.navigateByUrl(url);
}
AssignWorker(  ) {

  this._adminservices.AssignWorker( this.paramid,this.idworkerassigin ).subscribe((res) => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'The Issue was Assigned to Selected Worker '}` });

    this.gotopage( );

  }, (err: any) => {

    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${ err.error.message[0]}` });

  })


 }
}

