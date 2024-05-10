import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { ApartmentService } from 'src/app/_services/apartments/apartment.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit{
  showSide: string = '';
  Date :string ='All';
  requestRate :  boolean = true;
  paymentHistoryRate :string = 'All';
  apartmentRate :  boolean = true;
  userProblem :  boolean = true;
  DemandsRate :  boolean = true;
  subscriptions:Subscription[] = [];
  listDropDown:Array<object>=[{name:'All'},{name:'Today'},{name:'Last week'},{name:'This month'},{name:'This year'}]

  listDropDownTenantpaymenthistory:Array<object> =[{name :'All'},{name:'Excellent'},{name:'Good'},{name:'Poor'}]
  listDropDownRequests:Array<object> =[{name:'Highest'},{name:'Lowest'}]
  ApartmentRatingsDropDown:Array<object> =[{name:'Highest'},{name:'Lowest'}]
  listDropDownUserProblem:Array<object> =[{name:'Highest'},{name:'Lowest'}]
  listDropDownApartmentDemands:Array<object> =[{name:'Highest'},{name:'Lowest'}]

  rowDatalistTenantpaymenthistory:Array<any>=[]
  ApartmentRatings:Array<any>=[]
  rowDatalistRequests:Array<any>=[]
  rowDatalistDemands:Array<any>=[]

  rowdataListUserreportproblems:Array<any>=[]

  constructor(public router: Router, private _adminservices:AdminsService) {

  }
  ngOnInit(): void {
    this.checkRole();
    this.GetIncomeOutcome()
    this.ApartmentRequests();
    this.PaymentHistory();
    this.ApartmentRating();
    this.UserProblems();
    this.ApartmentDemands();
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
   if(parsedData.permissions[i].page_Name=="Statistics"){
     this.StatisticsRole=parsedData.permissions[i];
   }
 }
 if(this.StatisticsRole.p_Add==false &&this.is_Super==false) {
  let url: string = "unlegal";
  this.router.navigateByUrl(url); }
}


   }
 }

 StatisticsCards: any = {};
 GetIncomeOutcome() {
   this.subscriptions.push(this._adminservices.GetIncomeOutcome().subscribe(
     (res: any) => {
       this.StatisticsCards = res;
     },
     (error) => {
     }
   ));
 }

 ApartmentRequests() {
  this.subscriptions.push(this._adminservices.ApartmentRequests(this.requestRate).subscribe(
    (res: any) => {
      this.rowDatalistRequests = res;
    },
    (error) => {
    }
  ));
}
ApartmentDemands() {
  this.subscriptions.push(this._adminservices.ApartmentRequests(this.DemandsRate).subscribe(
    (res: any) => {
      this.rowDatalistDemands = res;
    },
    (error) => {
    }
  ));
}
PaymentHistory() {
  this.subscriptions.push(this._adminservices.PaymentHistory(this.paymentHistoryRate).subscribe(
    (res: any) => {
      this.rowDatalistTenantpaymenthistory = res;
    },
    (error) => {
    }
  ));
}

ApartmentRating() {
  this.subscriptions.push(this._adminservices.ApartmentRating(this.apartmentRate).subscribe(
    (res: any) => {
      this.ApartmentRatings = res;
    },
    (error) => {
    }
  ));
}

UserProblems() {
  this.subscriptions.push(this._adminservices.UserProblems(this.userProblem).subscribe(
    (res: any) => {
      this.rowdataListUserreportproblems = res;
    },
    (error) => {
    }
  ));
}


  addItem(value: any) {
    this.showSide = value

  }
  selectedfromDropDown(value: any) {
    this.Date = value.name;
  }

  selectedApartmentsRequests(value: any) {
    if(value.name == 'Highest')
      this.requestRate= true
    else
    this.requestRate= false
   this.ApartmentRequests();
  }
  selectedApartmentDemands(value: any) {
    if(value.name == 'Highest')
      this.DemandsRate= true
    else
    this.DemandsRate= false
   this.ApartmentDemands();
  }

  selectedPaymentHistory(value: any) {
   this.paymentHistoryRate = value.name
   this.PaymentHistory();
  }
  selectedApartmentsRateing(value: any) {
    if(value.name == 'Highest')
      this.apartmentRate= true
    else
    this.apartmentRate= false
   this.ApartmentRating();
  }

  selectedUserProblem(value: any) {
    if(value.name == 'Highest')
      this.userProblem= true
    else
    this.userProblem= false
   this.UserProblems();
  }

  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }
}
