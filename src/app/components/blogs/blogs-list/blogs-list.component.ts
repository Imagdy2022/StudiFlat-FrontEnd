
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';


@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss']
})
export class BlogsListComponent {
  @ViewChild('closebutton') closebutton: any;
  showEdit: Array<boolean> = [];
 showSide: string = '';
 products!: Array<object>;
 selectedProducts: Array<object> = [];
 headerData: Array<any> = [];
 loading: boolean = true;
 search:boolean=false;
 partnerId:any;
 subscriptions:Subscription[] = [];
 listDropDown:Array<object>=[{name:'All'},{name:'Today'},{name:'Last Week'},{name:'This month'},{name:'This year'}]

 constructor( public _adminservices:AdminsService ,public router: Router,private messageService: MessageService,) {
  this.getAllpartners(  )
 }
items:any;
 ngOnInit() {

  this.items = [
    { label: 'manage blogs', routerLink: '/blogs' },
    ]
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
// totalRecords=0
// first: number = 1;
// rows: number = 10;

tiggerPageChange(event: any) {
  this.first = event.first;
  this.rows = event.rows;
  let calcPageNumber = Math.floor(this.first / this.rows) + 1;
  this.pageNumber = calcPageNumber;
     this.getAllpartners(  )
    }
 numberpartners=0;
 Date:any="All"
  getAllpartners(  ) {
   this.partners=[]
   this.numberpartners=0
   this.subscriptions.push(this._adminservices.ListPartners( this.pageNumber,this.pagesize,this.Date,this.searchText).subscribe((res:any) => {
    this.partners = res["data"];
    console.log(this.partners)
    this.totalRecords=res["totalRecords"]

    this.numberpartners = this.partners.length;
    this.totalofPages=res["totalPages"]


   }, (error) => {
     console.error('Error fetching owners:', error);
  }))

}
 detailperson(event:any,id: any): void {
   this.showEdit=[]
   event.stopPropagation()

   this.showEdit[id] == true ? this.showEdit[id] = false : this.showEdit[id] = true



  }
  hidecard( ){
   this.showEdit=[]

}
deletepartner() {
 this.subscriptions.push( this._adminservices.DeletePartners(this.partnerId ).subscribe((res) => {
  this.closebutton.nativeElement.click();
  this.messageService.add({ severity: 'success', summary: 'Success', detail: `${res.message}` });

  this.getAllpartners()

}, (err: any) => {

  this.messageService.add({ severity: 'error', summary: 'Error', detail: `${ err.error.message[0]}` });

}))

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
searchAction(event: KeyboardEvent) {
  if (this.searchText.trim() === '' && (event.key === 'Backspace' || event.key === ' ')) {
    event.preventDefault();
    return;
}
  this.getAllpartners()

}

display = 'none';

deleteModal(id: any) {
  this.display = 'block';
  this.display = 'flex';
  this.partnerId = id;
}

onCloseHandled() {
  this.display = 'none';
}

ngOnDestroy() {
  for(let i=0;i<this.subscriptions.length;i++)
  this.subscriptions[i].unsubscribe();
}



///////////////////////////////////////////////////////////////
first: number = 0; // The index of the first record
rows: number = 10; // The number of rows per page
totalRecords: number = 120; // Total number of records (can be dynamic)

// This method is triggered when the page changes
onPageChange(event: any) {
  this.first = event.first; // Index of the first record in the new page
  this.rows = event.rows;   // Number of rows to display per page
  console.log('Page changed:', event);
}
displayMenu:string='none';
openMenu(){
  if(this.displayMenu==='block'){
  this.displayMenu='none';

  }else{
    this.displayMenu='block';
  }

}
}
