import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout-inqq',
  templateUrl: './checkout-inqq.component.html',
  styleUrls: ['./checkout-inqq.component.css']
})
export class CheckoutInqqComponent implements OnInit{
  checkOut:any=[]
  headerData: Array<any> = [];
  showEdit: Array<boolean> = [];

  numbercheckOut=0;
  constructor(private _checkOutService:AdminsService ,private messageService: MessageService,public router: Router) { }

  ngOnInit() {
    this.initFakeData();
    this. getAllcheckOut(this.statusinquire);
     const connection = new signalR.HubConnectionBuilder()

    .withUrl(environment.apiUrl + '/notify',{ withCredentials: false})
    .build();

  connection.start().then(function () {
  }).catch(function (err) {
    return console.error(err.toString());
  });

  connection.on("NewInquiry", (result: any) => {
    this.getAllcheckOut(this.statusinquire);
    //this.messageService.add({ severity: 'info', summary: 'New Booking Request', detail: result.noti_Name });

  });
  }
  checkOutRole:any
is_Super:any
 
gotopage( ){
  let url: string = "unlegal";
    this.router.navigateByUrl(url);
}
  statusinquire:any=""
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
    this.getAllcheckOut(this.statusinquire);
  }
  decreamentPage(){
    this.pageNumber-=1;
    if(this.pageNumber<1){
      this.pageNumber=1;

    }
    this.getAllcheckOut(this.statusinquire);

  }
  date=""
  totalRecords=0;
  getAllcheckOut(  statuscheckOut:any) {
    this.checkOut=[]
    this.numbercheckOut=0
    this._checkOutService.GetCheckoutList(this.pageNumber,this.pagesize,this.searchText,statuscheckOut).subscribe((res:any) => {
      this.checkOut = res["data"];
      this.numbercheckOut = this.checkOut.length;
      this.totalofPages=res["totalPages"]
      this.totalRecords=res["totalRecords"]

      if(this.totalofPages==this.pageNumber){
        this.disablenext=true
      }else{
        this.disablenext=false

      }
      if(this.pageNumber==1){
        this.disableperv=true
      }else{
        this.disableperv=false

      }

     }, (error) => {
       console.error('Error fetching owners:', error);
    })
  }
  tiggerPageChange(event: any) {

        const calcPageNumber = Math.floor(event.first / event.rows) + 1;
        this.pageNumber=calcPageNumber;
        console.log(calcPageNumber);
        this.getAllcheckOut(this.statusinquire);
      }
      ids:any=[]
  detailperson(event:any, id: any){
    this.showEdit=[]
event.stopPropagation()

    this.showEdit[id] == true ? this.showEdit[id] = false : this.showEdit[id] = true
   }
  showSide: string = '';

  addItem(value: string): void {
    this.showSide = value
  }
  dropdownOption: Array<any> = [];
  listDropDown:Array<object>=[{name:'Today'},{name:'Last week'},{name:'This month'},{name:'This year'}]
  Inquiries=[]
  InquireFillterLists: Array<any> = [];
  InquireFillterSelected: Array<any> = [];
  initFakeData(): void {
    this.InquireFillterLists = ["All", "completed", "Ready Checkout","end soon", ];
    this.InquireFillterSelected = [true];
   }
   selectedfromDropDown(value:any){
    this.date=value.name;
    this.getAllcheckOut(this.statusinquire)
    console.log(value)  }
  checkindex=0;
  clickIquires(index:any){
    this.checkindex=index;
    this.InquireFillterSelected = this.InquireFillterSelected.map((data) => data == true ? false : false)

    this.InquireFillterSelected[index] = true
    if(index == 0){
      this.statusinquire="All"
      this.getAllcheckOut(this.statusinquire);
    }
    if(index == 1){
      this.statusinquire="completed"

      this.getAllcheckOut(this.statusinquire);
    }
    if(index == 2){
      this.statusinquire="Ready Checkout"

      this.getAllcheckOut(this.statusinquire);

    }
    if(index == 3){
      this.statusinquire="end soon"

      this.getAllcheckOut(this.statusinquire);

    }
     
  }
  onCloseModal1(){
    this.display1="none"
  }
  display1:any="none"
  InsertCheckOut(REQ_ID:any) {
    this._checkOutService
      .InsertCheckOut(REQ_ID)
      .subscribe(
        (res) => {
          // this.messageService.add({
          //   severity: 'success',
          //   summary: 'Success',
          //   detail: 'Passport has Marked as UnValid',
          // });
          this.display1 = 'block';
          this.getAllcheckOut(this.statusinquire)

         },
        (error) => {
          this.display1 = 'none';

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'error',
          });
        }
      );
  }
   
 
  hidecard(){
     this.showEdit=[]

  }
  searchText:any=""
  search:boolean=false

  searchKey(data: string) {
    debugger
    this.searchText = data;
    this.getAllcheckOut(this.statusinquire)
  }
  searchTextChange:any
  searchAction() {
    // this.searchTextChange.emit(this.searchText);
    this.search = false;
    this.getAllcheckOut(this.statusinquire)
    this.searchText =""

  }
}
