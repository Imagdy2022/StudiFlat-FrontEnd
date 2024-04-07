import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminsService } from 'src/app/_services/admins/admins.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

  showEdit: Array<boolean> = [];
 showSide: string = '';
 products!: Array<object>;
 selectedProducts: Array<object> = [];
 headerData: Array<any> = [];
 loading: boolean = true;
 search:boolean=false
 listDropDown:Array<object>=[{name:'All'},{name:'Today'},{name:'Last Week'},{name:'This month'},{name:'This year'}]

 constructor( public _adminservices:AdminsService ,public router: Router,private messageService: MessageService,) { }

 ngOnInit() {

   this.getAllpartners(  )
   this.checkRole();
 }

  /**
  * selectedfromDropDown
  * @param $event string
  * @returns void
  */
 selectedfromDropDown(value:any){

   this.Date=value.name;
   this.getAllpartners()

 }
 /**
  * addItem
  * @param value string
  * @returns void
  */
 addItem(value: string): void {
   this.showSide = value
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
   // this.getAllpartners( );
 }
 decreamentPage(){
   this.pageNumber-=1;
   if(this.pageNumber<1){
     this.pageNumber=1;

   }
   // this.getAllpartners( );

 }
partners=[]
totalRecords=0
tiggerPageChange(event: any) {

     const calcPageNumber = Math.floor(event.first / event.rows) + 1;
     this.pageNumber=calcPageNumber;
     this.getAllpartners(  )
    }
 numberpartners=0;
 Date:any="All"
  getAllpartners(  ) {
   this.partners=[]
   this.numberpartners=0
   this._adminservices.ListPartners( this.pageNumber,this.pagesize,this.Date,this.searchText).subscribe((res:any) => {
     this.partners = res["data"];
     this.totalRecords=res["totalRecords"]

     this.numberpartners = this.partners.length;
     this.totalofPages=res["totalPages"]


    }, (error) => {
      console.error('Error fetching owners:', error);
   })
 }
 // DeleteUser(id :any){
 //   this._adminservices.DeleteTenant( id).subscribe((res:any) => {
 //     this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'Deleted Successfuly'}` });

 //     this.getAllpartners( );

 //    }, (error) => {
 //     this.messageService.add({ severity: 'error', summary: 'Error', detail: `${'error'}` });
 //   })

 // }
 // SuspendUser(id:any){
 //   this._adminservices.SuspendTenant( id).subscribe((res:any) => {
 //     this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'Suspended Successfuly'}` });

 //     this.getAllpartners( );

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
deletepartner( id:any) {

 this._adminservices.DeletePartners(id ).subscribe((res) => {
   this.messageService.add({ severity: 'success', summary: 'Success', detail: `${' partner has been Successfully deleted into DB  '}` });


   this.getAllpartners()

 }, (err: any) => {

   this.messageService.add({ severity: 'error', summary: 'Error', detail: `${ err.error.message[0]}` });

 })


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
if(this.partnersRole.p_View==false &&this.is_Super==false) {
 this.gotopage( )
}
}


 }
}
gotopage( ){
 let url: string = "unlegal";
   this.router.navigateByUrl(url);
}
searchText:any=""

searchKey(data: string) {
  debugger
  this.searchText = data;
  this.getAllpartners()
}
searchTextChange:any
searchAction() {
  // this.searchTextChange.emit(this.searchText);
  // this.search = false;
  this.getAllpartners()
    // this.searchText =""

}
}
