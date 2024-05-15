import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { ApartmentService } from 'src/app/_services/apartments/apartment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  showSide:string = '';
  value:any='';
  activePerson:boolean=true;
  targetId:any;
  subscriptions:Subscription[] = [];
  monthButton  : boolean= true;
  weekButton  : boolean= false;


  constructor(private _ticketService:AdminsService ,private messageService: MessageService,public router: Router) {
    this.checkRole();
  }
  ngOnInit() {
      this.getAll_tickets();
      const connection = new signalR.HubConnectionBuilder()

      .withUrl(environment.apiUrl + '/notify',{ withCredentials: false})
      .build();

    connection.start().then(function () {
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("NewTicket", (result: any) => {
      this.getAll_tickets();
      //this.messageService.add({ severity: 'info', summary: 'New Ticket', detail: result.noti_Name });

    });
  }
  StatisticsRole:any
 is_Super:any
 checkRole(){
   const data = localStorage.getItem("user");
    if (data !== null) {

     let parsedData = JSON.parse(data);
      this.is_Super=parsedData.is_Super
     if(parsedData.is_Super==false) {
 for(let i=0; i<parsedData.permissions.length;i++){
   if(parsedData.permissions[i].page_Name=="Messages"){
     this.StatisticsRole=parsedData.permissions[i];
   }
 }
 if(this.StatisticsRole.p_Add==false &&this.is_Super==false) {
  let url: string = "unlegal";
  this.router.navigateByUrl(url); }
}


   }
 }
  addItem(value:any){
    this.showSide=value
  }


    _tickets:any=[]
    headerData: Array<any> = [];
    showEdit: Array<boolean> = [];

    number_tickets=0;


    _ticketsRole:any


    statusinquire:any=""
    pageNumber=1;
    pagesize=10;
    totalofPages=0;;
    disablenext=false;
    disableperv=false;

    date="All"
    totalRecords=0;
    getAll_tickets(   ) {
      this._tickets=[]
      this.number_tickets=0
      this.subscriptions.push( this._ticketService.AllTickets(this.date,this.pageNumber,this.pagesize,this.searchText).subscribe((res:any) => {
        this._tickets = res["data"];
        this.number_tickets = this._tickets.length;
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
      }))

    }
    tiggerPageChange(event: any) {

          const calcPageNumber = Math.floor(event.first / event.rows) + 1;
          this.pageNumber=calcPageNumber;
          this.getAll_tickets();
        }
        ids:any=[]
    detailperson(event:any, id: any){
      this.showEdit=[]
      this.targetId = id;
  event.stopPropagation()

      this.showEdit[id] == true ? this.showEdit[id] = false : this.showEdit[id] = true

     }

    dropdownOption: Array<any> = [];
    listDropDown:Array<object>=[{name:'All'},{name:'Today'},{name:'Last week'},{name:'This month'},{name:'This year'}]
    Inquiries=[]
    InquireFillterLists: Array<any> = [];
    InquireFillterSelected: Array<any> = [];

     selectedfromDropDown(value:any){
      this.date=value.name;
      this.getAll_tickets();
    }
    FilterButtons(value:any){
      this.date=value;
      if(this.date == 'This Month'){
        this.monthButton = true;
        this.weekButton = false
      }else{
        this.monthButton = false;
        this.weekButton = true;
      }
      this.getAll_tickets()
    }


    hidecard(id:any){
       this.showEdit=[]


    }
    searchText:any=""
    search:boolean = false;
  searchKey(data: string) {
    debugger
    this.searchText = data;
    this.getAll_tickets();
  }
  searchTextChange:any
  searchAction(event: KeyboardEvent) {
    if (this.searchText.trim() === '' && (event.key === 'Backspace' || event.key === ' ')) {
      event.preventDefault();
      return;
  }
    this.getAll_tickets();

  }
  CloseTicket(status:any) {
    let index = this.targetId
    this.subscriptions.push( this._ticketService.CloseTicket(index,status  ).subscribe((res) => {
      this.messageService.add({   severity: 'success', summary: 'Success', detail: res.message });
      this.getAll_tickets();
      }, (error) => {
     this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message[0] });
   }))

  }

  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }
  }

