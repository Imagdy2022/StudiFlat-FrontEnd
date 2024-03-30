import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminsService } from 'src/app/_services/admins/admins.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor(    private messageService: MessageService,
    public router: Router, public _adminservices:AdminsService ) { }

  ngOnInit() {
    this.initFakeData();
    this.checkRole();
    this.ListAllInvoices(this.statuspayment);
  }
  PaymentsRole:any
  is_Super:any
  checkRole(){
    const data = localStorage.getItem("user");
     if (data !== null) {

      let parsedData = JSON.parse(data);
       this.is_Super=parsedData.is_Super
      if(parsedData.is_Super==false) {
  for(let i=0; i<parsedData.permissions.length;i++){
    if(parsedData.permissions[i].page_Name=="Payments"){
      this.PaymentsRole=parsedData.permissions[i];
    }
  }
  if(this.PaymentsRole.p_View==false &&this.is_Super==false) {
    this.gotopage( )
  }
}


    }
  }
  gotopage( ){
    let url: string = "unlegal";
      this.router.navigateByUrl(url);
  }
  initFakeData(): void {
    this.paymentFillterLists = ["All Payments", "Rent", "Security Deposit","Other payments"];
    this.paymentFillterSelected = [true];
   }
  payments:any=[ ];
dropdownOption: Array<any> = [];
  listDropDown:Array<object>=[{name:'Today'},{name:'Last week'},{name:'This month'},{name:'This year'}]

  paymentFillterLists: Array<any> = [];
  paymentFillterSelected: Array<any> = [];

  showSide: string = '';

  addItem(value: string): void {
    this.showSide = value
  }
  showEdit: Array<boolean> = [];

  detailperson(event:any,id: any): void {
    this.showEdit=[]
    event.stopPropagation()

    this.showEdit[id] == true ? this.showEdit[id] = false : this.showEdit[id] = true



   }
   pageNumber=1;
  pagesize=10;
  totalofPages=1 ;
  totalRecords= 0;
  tiggerPageChange(event: any) {

        const calcPageNumber = Math.floor(event.first / event.rows) + 1;
        this.pageNumber=calcPageNumber;
        this.ListAllInvoices( this.statuspayment)
       }
       selectedfromDropDown(value:any){
        this.ListAllInvoices(this.statuspayment);
      }


 numberInvoices=0;
  ListAllInvoices(  statuspayments:any) {
    this.payments=[]
    this.numberInvoices=0
    this._adminservices.ListAllInvoices( statuspayments,this.pageNumber,this.pagesize ,this.searchText).subscribe((res:any) => {
      this.payments = res["data"];
      this.numberInvoices = this.payments.length;
      this.totalofPages=res["totalPages"]
      this.totalRecords=res["totalRecords"]


     }, (error) => {
       console.error('Error fetching owners:', error);
    })
  }
  MarkPaid(id:any){
    this._adminservices.MarkPaid(id).subscribe((res) => {
      this.messageService.add({   severity: 'success', summary: 'Success', detail: 'marked Successfuly' });

      this.ListAllInvoices( this.statuspayment) ;

     }, (error) => {
      this.messageService.add({   severity: 'error', summary: 'error', detail: 'error' });
    })
  }
  hidecard( ){
    this.showEdit=[]

 }
 checkindex=0;
 statuspayment:any=""

 clickPayment(index:any){
  this.checkindex=index;
  this.paymentFillterSelected = this.paymentFillterSelected.map((data) => data == true ? false : false)

  this.paymentFillterSelected[index] = true
  if(index == 0){
    this.statuspayment=""
    this.ListAllInvoices(this.statuspayment);
  }
  if(index == 1){
    this.statuspayment="Rent"

    this.ListAllInvoices(this.statuspayment);
  }
  if(index == 2){
    this.statuspayment="Security"

    this.ListAllInvoices(this.statuspayment);

  }
  if(index == 3){
    this.statuspayment="Other"

    this.ListAllInvoices(this.statuspayment);

  }

}
searchText:any=""

searchKey(data: string) {
  debugger
  this.searchText = data;
  this.ListAllInvoices(this.statuspayment);
}
searchTextChange:any
search:boolean=false
searchAction() {
  // this.searchTextChange.emit(this.searchText);
  this.search = false;
  this.ListAllInvoices(this.statuspayment);
    this.searchText =""

}
}
