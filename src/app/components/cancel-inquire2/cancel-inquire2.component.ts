import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';

@Component({
  selector: 'app-cancel-inquire2',
  templateUrl: './cancel-inquire2.component.html',
  styleUrls: ['./cancel-inquire2.component.css']
})
export class CancelInquire2Component implements OnInit  {

  showEdit: Array<boolean> = [];
 showSide: string = '';
 products!: Array<object>;
 selectedProducts: Array<object> = [];
 headerData: Array<any> = [];
 loading: boolean = true;
 search:boolean=false
 subscriptions:Subscription[] = [];
 listDropDown:Array<object>=[{name:'All'},{name:'Today'},{name:'Last Week'},{name:'This month'},{name:'This year'}]

 constructor( public _adminservices:AdminsService ,public router: Router,private messageService: MessageService,) { }

 ngOnInit() {

   this.getAlltermination()
  }

  /**
  * selectedfromDropDown
  * @param $event string
  * @returns void
  */
 selectedfromDropDown(value:any){

   this.Date=value.name;
   this.getAlltermination()


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
 totalofPages=0;
 first: number = 1;
 rows: number = 10;
 disablenext=false;
 disableperv=false;

termination=[]
totalRecords=0
tiggerPageChange(event: any) {

  this.first = event.first;
  this.rows = event.rows;
  let calcPageNumber = Math.floor(this.first / this.rows) + 1;
  this.pageNumber = calcPageNumber;

     this.getAlltermination(  )
    }
 numbertermination=0;
 Date:any="All"
  getAlltermination( ) {
   this.termination=[]
   this.numbertermination=0
   this.subscriptions.push(   this._adminservices.GetTerminations( this.pageNumber,this.pagesize,this.searchText,this.Date).subscribe((res:any) => {
    this.termination = res["data"];
    this.totalRecords=res["totalRecords"]

    this.numbertermination = this.termination.length;
    this.totalofPages=res["totalPages"]


   }, (error) => {
     console.error('Error fetching owners:', error);
  }))

 }
 // DeleteUser(id :any){
 //   this._adminservices.DeleteTenant( id).subscribe((res:any) => {
 //     this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'Deleted Successfuly'}` });

 //     this.getAlltermination( );

 //    }, (error) => {
 //     this.messageService.add({ severity: 'error', summary: 'Error', detail: `${'error'}` });
 //   })

 // }
 // SuspendUser(id:any){
 //   this._adminservices.SuspendTenant( id).subscribe((res:any) => {
 //     this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'Suspended Successfuly'}` });

 //     this.getAlltermination( );

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

terminationRole:any
is_Super:any

gotopage( ){
 let url: string = "unlegal";
   this.router.navigateByUrl(url);
}
searchText:any=""

searchKey(data: string) {
  this.searchText = data;
  this.getAlltermination()
}
searchTextChange:any
searchAction(event: KeyboardEvent) {
  if (this.searchText.trim() === '' && (event.key === 'Backspace' || event.key === ' ')) {
    event.preventDefault();
    return;
}
  this.getAlltermination()

}
ngOnDestroy() {
  for(let i=0;i<this.subscriptions.length;i++)
  this.subscriptions[i].unsubscribe();
}
}
