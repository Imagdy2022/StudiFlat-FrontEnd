import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdminsService } from "src/app/_services/admins/admins.service";


@Component({
  selector: 'app-create-new-payment',
  templateUrl: './create-new-payment.component.html',
  styleUrls: ['./create-new-payment.component.scss']
})
export class CreateNewPaymentComponent {
  showSide: string = '';
  searchText:any=""
  search:boolean=false

  constructor( public _adminservices:AdminsService ,public router: Router) { }

  ngOnInit() {

    this.getAllpartners(  )
  }

  selectedfromDropDown(value:any){

    this.Date=value.name;
    this.getAllpartners()

  }
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


     }, (error:any) => {
       console.error('Error fetching owners:', error);
    })
  }

  searchAction() {
    this.search = false;
    this.getAllpartners()
      this.searchText =""
  }
  selectUser(e: any ){
  }
  SelectType(e:any){
  }
}
