import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
   showEdit: Array<boolean> = [];
  showSide: string = '';
  products!: Array<object>;
  selectedProducts: Array<object> = [];
  headerData: Array<any> = [];
  loading: boolean = true;
  search:boolean=false;
  workerId:any;
  subscriptions:Subscription[] = [];
  listDropDown:Array<object>=[{name:'All'},{name:'Today'},{name:'Last Week'},{name:'This month'},{name:'This year'}]

  constructor( public _adminservices:AdminsService ,public router: Router,private messageService: MessageService,) { }

  ngOnInit() {

    this.getAllworkers(  )
    this.checkRole();
  }

   /**
   * selectedfromDropDown
   * @param $event string
   * @returns void
   */
  selectedfromDropDown(value:any){

    this.Date=value.name;
    this.getAllworkers()
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

workers=[]
totalRecords=0
tiggerPageChange(event: any) {

  this.first = event.first;
  this.rows = event.rows;
  let calcPageNumber = Math.floor(this.first / this.rows) + 1;
  this.pageNumber = calcPageNumber;
      this.getAllworkers(  )
     }
  numberworkers=0;
  Date:any="All"
   getAllworkers(  ) {
    this.workers=[]
    this.numberworkers=0
    this.subscriptions.push(this._adminservices.GetAllWorkers( this.pageNumber,this.pagesize,this.searchText).subscribe((res:any) => {
      this.workers = res["data"];
      this.totalRecords=res["totalRecords"]

      this.numberworkers = this.workers.length;
      this.totalofPages=res["totalPages"]


     }, (error) => {
       console.error('Error fetching owners:', error);
    }));

  }
  detailperson(event:any,id: any): void {
    this.showEdit=[]
    event.stopPropagation()

    this.showEdit[id] == true ? this.showEdit[id] = false : this.showEdit[id] = true



   }
   hidecard( ){
    this.showEdit=[]

 }
 deleteworker() {

  this.subscriptions.push(this._adminservices.DeleteWorker(this.workerId).subscribe(
    (res: any) => {
      this.closebutton.nativeElement.click();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `${res.message}`,
      });

      this.getAllworkers();
    },
    (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `${error.error.message[0]}`,
      });
    }
  ));

}
workersRole:any
is_Super:any
checkRole(){
  const data = localStorage.getItem("user");
   if (data !== null) {

    let parsedData = JSON.parse(data);
     this.is_Super=parsedData.is_Super
    if(parsedData.is_Super==false) {
for(let i=0; i<parsedData.permissions.length;i++){
  if(parsedData.permissions[i].page_Name=="workers"){
    this.workersRole=parsedData.permissions[i];
  }
}
if(this.workersRole.p_View==false &&this.is_Super==false) {
  this.gotopage( )
}
}


  }
}
gotopage( ){
  let url: string = "unlegal";
    this.router.navigateByUrl(url);
}

searchText: any = '';

searchKey(data: string) {
  this.searchText = data;
  this.getAllworkers();
}
searchTextChange: any;
searchAction(event: KeyboardEvent) {
  if (this.searchText.trim() === '' && (event.key === 'Backspace' || event.key === ' ')) {
    event.preventDefault();
    return;
}
  this.getAllworkers();
}

display = 'none';


deleteModal(id: any) {
  this.display = 'block';
  this.display = 'flex';
  this.workerId = id;
}

onCloseHandled() {
  this.display = 'none';
}


ngOnDestroy() {
  for(let i=0;i<this.subscriptions.length;i++)
  this.subscriptions[i].unsubscribe();
}
}
