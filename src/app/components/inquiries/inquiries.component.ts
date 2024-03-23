import { Component, OnInit } from '@angular/core';
import {InquiresService} from '../../_services/inquires/inquires.service'
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  Inquires:any=[]
  headerData: Array<any> = [];
  showEdit: Array<boolean> = [];

  numberInquires=0;
  constructor(private _inquiresService:InquiresService ,private messageService: MessageService,public router: Router) { }

  ngOnInit() {
    this.initFakeData();
    this. getAllInquires(this.statusinquire);
    this.checkRole();
    const connection = new signalR.HubConnectionBuilder()

    .withUrl(environment.apiUrl + '/notify',{ withCredentials: false})
    .build();

  connection.start().then(function () {
  }).catch(function (err) {
    return console.error(err.toString());
  });

  connection.on("NewInquiry", (result: any) => {
    this.getAllInquires(this.statusinquire);
    //this.messageService.add({ severity: 'info', summary: 'New Booking Request', detail: result.noti_Name });

  });
  }
  inquiresRole:any
is_Super:any
checkRole(){
  const data = localStorage.getItem("user");
   if (data !== null) {

    let parsedData = JSON.parse(data);
     this.is_Super=parsedData.is_Super
    if(parsedData.is_Super==false) {
for(let i=0; i<parsedData.permissions.length;i++){
  if(parsedData.permissions[i].page_Name=="Inquiries"){
    this.inquiresRole=parsedData.permissions[i];
  }
}
if(this.inquiresRole.p_View==false &&this.is_Super==false) {
  this.gotopage( )
}
}


  }
}
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
    this.getAllInquires(this.statusinquire);
  }
  decreamentPage(){
    this.pageNumber-=1;
    if(this.pageNumber<1){
      this.pageNumber=1;

    }
    this.getAllInquires(this.statusinquire);

  }
  date=""
  totalRecords=0;
  getAllInquires(  statusinquires:any) {
    this.Inquires=[]
    this.numberInquires=0
    this._inquiresService.getAllInquires(statusinquires,this.pageNumber,this.pagesize,this.date,this.searchText).subscribe((res:any) => {
      this.Inquires = res["data"];
      this.numberInquires = this.Inquires.length;
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
        this.getAllInquires(this.statusinquire);
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
    this.InquireFillterLists = ["All Inquiries", "Waiting for Approve", "Waiting List","Confirmed Inquiries","Cancelled Booking","Terminated Booking"];
    this.InquireFillterSelected = [true];
   }
   selectedfromDropDown(value:any){
    this.date=value.name;
    this.getAllInquires(this.statusinquire)
    console.log(value)  }
  checkindex=0;
  clickIquires(index:any){
    this.checkindex=index;
    this.InquireFillterSelected = this.InquireFillterSelected.map((data) => data == true ? false : false)

    this.InquireFillterSelected[index] = true
    if(index == 0){
      this.statusinquire=""
      this.getAllInquires(this.statusinquire);
    }
    if(index == 1){
      this.statusinquire="Pending"

      this.getAllInquires(this.statusinquire);
    }
    if(index == 2){
      this.statusinquire="Waiting"

      this.getAllInquires(this.statusinquire);

    }
    if(index == 3){
      this.statusinquire="Approved"

      this.getAllInquires(this.statusinquire);

    }
    if(index == 4){
      this.statusinquire="Cancelled"

      this.getAllInquires(this.statusinquire);

    }
    if(index == 5){
      this.statusinquire="Terminated"

      this.getAllInquires(this.statusinquire);

    }
  }
  AddWaitingList(id:any){
    this._inquiresService.AddWaitingList(id).subscribe((res) => {
      this.messageService.add({   severity: 'success', summary: 'Success', detail: 'Add Successfuly' });

      this.clickIquires( this.checkindex) ;

     }, (error) => {
      this.messageService.add({   severity: 'error', summary: 'error', detail: 'error' });
    })
  }
  display1="none";
  onCloseModal1(){
    this.display1="none"
  }
  idRequest:any
  onOpenModal1(id:any){
    this.Reason="";
    this.idRequest=id;
    this.display1="block"
  }
  Reason=""
  CancelRequest( ){
    this._inquiresService.CancelRequest(this.idRequest,this.Reason).subscribe((res) => {
      this.clickIquires( this.checkindex) ;
      this.display1="none"
      this.messageService.add({   severity: 'success', summary: 'Success', detail: 'Cancel Request Successfuly' });


     }, (error) => {
      this.messageService.add({   severity: 'error', summary: 'error', detail: 'error' });
    })
  }
  hidecard(id:any){
     this.showEdit=[]

  }
  searchText:any=""
  search:boolean=false

  searchKey(data: string) {
    debugger
    this.searchText = data;
    this.getAllInquires(this.statusinquire)
  }
  searchTextChange:any
  searchAction() {
    // this.searchTextChange.emit(this.searchText);
    this.search = false;
    this.getAllInquires(this.statusinquire)
    this.searchText =""

  }
}
