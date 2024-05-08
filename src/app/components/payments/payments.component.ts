import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  @ViewChild ('content',{static: false}) el! : ElementRef
  rangeDates: Date[] ;
  PaymentCards: any = {};
  checked: boolean = false;
  subscriptions:Subscription[] = [];
  monthButton  : boolean= true;
  weekButton  : boolean= false;

  reminderForm: FormGroup = new FormGroup({
    inv_ID: new FormControl(null),
    rem_Desc: new FormControl(null),
    rem_Date: new FormControl(null),
    pushTypes: new FormControl(null),
  })

  constructor(    private messageService: MessageService,
    public router: Router, public _adminservices:AdminsService ) { }

  ngOnInit() {
    this.initFakeData();
    this.checkRole();
    this.GetAllPayments();
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
    this.paymentFillterLists = [
      {
        id:0,
        name: "All Payments"
      },
      {
        id:1,
        name: "Rent"
      },
      {
        id:2,
        name: "Security Deposit"
      },
      {
        id:3,
        name: "Other payments"
      },
      ];

    this.TypeFillterLists = [
      {
        id:0,
        name: "All"
      },
      {
        id:1,
        name: "Incoming Payments"
      },
      {
        id:2,
        name: "Outgoing Payments"
      },
      {
        id:3,
        name: "Pending Payments"
      },
      ];

      this.userFillterLists = [
        {
          id:0,
          name: "All"
        },
        {
          id:1,
          name: "Tenant"
        },
        {
          id:2,
          name: "Owner"
        },
        {
          id:3,
          name: "Partner"
        },
        {
          id:4,
          name: "Apartment"
        },
        {
          id:5,
          name: "Worker"
        },
        ];
    this.paymentFillterSelected = [true];
    this.TypeFillterSelected = [true];
    this.userFillterSelected = [true];


   }
  payments:any=[ ];
dropdownOption: Array<any> = [];
  listDropDown:Array<object>=[{name:'All'},{name:'Today'},{name:'Last week'},{name:'This month'},{name:'This year'}]

  paymentFillterLists: Array<any> = [];
  paymentFillterSelected: Array<any> = [];

  TypeFillterLists: Array<any> = [];
  TypeFillterSelected: Array<any> = [];

  userFillterLists: Array<any> = [];
  userFillterSelected: Array<any> = [];

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
   Date="All"
   selectedfromDropDown(value:any){

     this.Date=value.name;
     this.GetAllPayments()
   }
   FilterButton(){
    this.GetAllPayments()
   }
   ClearButton(){
    this.searchText="";
    this.clickPayment(0);
    this.clickType(0);
    this.clickUserType(0);
    this.GetAllPayments();
   }
   FilterButtons(value:any){
    this.Date=value;
    if(this.Date == 'This Month'){
      this.monthButton = true;
      this.weekButton = false
    }else{
      this.monthButton = false;
      this.weekButton = true;
    }
    this.GetAllPayments();

  }


   pageNumber=1;
  pagesize=10;
  totalofPages=1 ;
  totalRecords= 0;
  tiggerPageChange(event: any) {

        const calcPageNumber = Math.floor(event.first / event.rows) + 1;
        this.pageNumber=calcPageNumber;
        this.GetAllPayments()
       }


 numberInvoices=0;
  GetAllPayments() {
    this.payments=[]
let data;
    if(this?.rangeDates)
      {data ={
        page_No :1,
        page_Size: 10,
        filterKey : this.Date,
        searchKey:this.searchText,
        payment_Type: this.paymentType,
        user_Type: this.userType,
        invoice_Type: this.statuspayment,
        start_Date:this?.rangeDates[0],
        end_Date:this?.rangeDates[1]
      }}
      else {
         data ={
          page_No :1,
          page_Size: 10,
          filterKey : this.Date,
          searchKey:this.searchText,
          payment_Type: this.paymentType,
          user_Type: this.userType,
          invoice_Type: this.statuspayment,
        }
      }


    this.subscriptions.push( this._adminservices.AllPayments(data).subscribe((res:any) => {
      this.payments = res.data;
      this.PaymentCards = res.cards;
      this.totalofPages=res["totalPages"]
      this.totalRecords=res["totalRecords"]


     }, (error) => {
       console.error('Error fetching owners:', error);
    }))

  }

  MarkPaid(id:any){
    this.subscriptions.push(this._adminservices.MarkPaid(id).subscribe((res) => {
      this.messageService.add({   severity: 'success', summary: 'Success', detail: res.message });

      this.GetAllPayments() ;

     }, (error) => {
      this.messageService.add({   severity: 'error', summary: 'error', detail: error.error.message[0]});
    }))

  }
  hidecard( ){
    this.showEdit=[]

 }
 checkindex=0;
 statuspayment:any="All"
 paymentType:any="All"
 userType:any="All"

 clickPayment(index:any){
  this.checkindex=index?.target?.value;
  this.paymentFillterSelected = this.paymentFillterSelected.map((data) => data == true ? false : false)

  this.paymentFillterSelected[index?.target?.value] = true
  if(index?.target?.value == 0){
    this.statuspayment="All"
    this.GetAllPayments();
  }
  if(index?.target?.value == 1){
    this.statuspayment="Rent"

    this.GetAllPayments();
  }
  if(index?.target?.value == 2){
    this.statuspayment="Security"

    this.GetAllPayments();

  }
  if(index?.target?.value == 3){
    this.statuspayment="Other"

    this.GetAllPayments();

  }

}
clickType(index:any){
  this.checkindex=index?.target?.value;
  this.TypeFillterSelected = this.TypeFillterSelected.map((data) => data == true ? false : false)

  this.TypeFillterSelected[index?.target?.value] = true
  if(index?.target?.value == 0){
    this.paymentType="All"
    this.GetAllPayments();
  }
  if(index?.target?.value == 1){
    this.paymentType="Incoming Payments"

    this.GetAllPayments();
  }
  if(index?.target?.value == 2){
    this.paymentType="Outgoing Payments"

    this.GetAllPayments();

  }
  if(index?.target?.value == 3){
    this.paymentType="Pending Payments"

    this.GetAllPayments();

  }

}
clickUserType(index:any){
  this.checkindex=index?.target?.value;
  this.userFillterSelected = this.userFillterSelected.map((data) => data == true ? false : false)

  this.userFillterSelected[index?.target?.value] = true
  if(index?.target?.value == 0){
    this.userType="All"
    this.GetAllPayments();
  }
  if(index?.target?.value == 1){
    this.userType="Tenant"

    this.GetAllPayments();
  }
  if(index?.target?.value == 2){
    this.userType="Owner"

    this.GetAllPayments();

  }
  if(index?.target?.value == 3){
    this.userType="Partner"

    this.GetAllPayments();

  }
  if(index?.target?.Apartment == 4){
    this.userType="Apartment"

    this.GetAllPayments();

  }
  if(index?.target?.value == 5){
    this.userType="Apartment"

    this.GetAllPayments();

  }

}

searchText:any=""

searchKey(data: string) {
  debugger
  this.searchText = data;
  this.GetAllPayments()
}
searchTextChange:any
search:boolean=false
searchAction() {
  // this.searchTextChange.emit(this.searchText);
  this.GetAllPayments()

}
display2 = 'none';
onCloseModal2() {
  this.display2 = 'none';
}
idModal: any;
openModal2(id: any) {
  this.idModal = id;
  this.display2 = 'block';
}
selectedOptions: string[] = [];

handleCheckboxChange(option: string) {
  if (this.selectedOptions.includes(option)) {
    this.selectedOptions = this.selectedOptions.filter(item => item !== option);
  } else {
    this.selectedOptions.push(option);
  }
}
SendReminder() {
  let data = {
    inv_ID: this.idModal,
    rem_Desc: this.reminderForm.value['rem_Desc'],
    rem_Date: this.reminderForm.value['rem_Date'],
    pushTypes: this.selectedOptions,
  }
  this.subscriptions.push( this._adminservices.PaymentsReminder(data).subscribe((res) => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail:res.message });
    setTimeout(()=>{
      this.onCloseModal2();
    },1000)
  }, (error) => {
   this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message[0] });
 }))


}
fileName= 'FinanceTable.xlsx'
exportToExcel(){
  let data = document.getElementById("content");
  const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
  const wb:XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,'Sheet1')
  XLSX.writeFile(wb,this.fileName)

}
ngOnDestroy() {
  for(let i=0;i<this.subscriptions.length;i++)
  this.subscriptions[i].unsubscribe();
}

}
