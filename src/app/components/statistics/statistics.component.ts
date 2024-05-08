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
  subscriptions:Subscription[] = [];
  listDropDown:Array<object>=[{name:'All'},{name:'Today'},{name:'Last week'},{name:'This month'},{name:'This year'}]
  headTitleRating:string='Apartment ratings'
  headTitleRequests:string='Apartments requests'
  headTitleTenantpaymenthistory:string='Tenant payment history'
  headTitleApartmentsizes:string='Apartment sizes'
  headTitleUserreportproblems:string='User report problems'
  headTitleApartmentdemands:string='Apartment demands'
  headTableListRating:Array<string>=['Name','Locations','Ratings']
  headTableListUserreportproblems:Array<string>=['User name','Apartments name','No. of problem reports']
  headTableListTenantpaymenthistory:Array<string>=['Name','Duration','Behaviour']
  headTableListApartmentdemands:Array<string>=['Name']
  headTableListRequests:Array<any>=['Name','Requests']

  listDropDownRating:Array<object> =[{name:'Highest'},{name:'Medium'},{name:'Lowest'},{name:'None'}]
  listDropDownTenantpaymenthistory:Array<object> =[{name:'Poor'},{name:'Good'},{name:'Average'},{name:'Bad'}]
  listDropDownRequests:Array<object> =[{name:'Highest'},{name:'Medium'},{name:'Lowest'},{name:'None'}]
  listDropDownApartmentsizes:Array<object> =[{name:'Popular'},{name:'Least popular'},{name:'Edit'},{name:'All'}]
  listDropDownApartmentdemands:Array<object> =[{name:'Highest'},{name:'Medium'},{name:'Lowest'},{name:'None'}]


  rowDatalistRating:Array<any>=[{img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'Alt-Moabit',rating:'4.5'},
  {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'Alt-Moabit',rating:'4.5'},
  {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'Alt-Moabit',rating:'4.5'}
]
  rowDatalistTenantpaymenthistory:Array<any>=[{img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'April 27 - May 27, 2023',rating:'Poor'},
  {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'April 27 - May 27, 2023',rating:'Poor'},
  {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'April 27 - May 27, 2023',rating:'Poor'}
  ]
  rowDatalistUserreportproblems:Array<any>=[
    {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'Alt-Moabit',rating:'4.5'},
    {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'Alt-Moabit',rating:'4.5'},
    {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'Alt-Moabit',rating:'4.5'}
  ]
  rowDatalistRequests:Array<any>=[{img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'23'},
  {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'23'},
  {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'23'},]

  rowDatalistApartmentdemands:Array<any>=[{img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit'},
  {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit'},
  {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit'},]

  rowdataListUserreportproblems:Array<any>=[
    {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',img1:'assets/images/Avatar.svg',name1:'Willow Creek Apartments',title:'Alt-Moabit',numberofproblem:'22'},
    {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',img1:'assets/images/Avatar.svg',name1:'Willow Creek Apartments',title:'Alt-Moabit',numberofproblem:'22'},
    {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',img1:'assets/images/Avatar.svg',name1:'Willow Creek Apartments',title:'Alt-Moabit',numberofproblem:'22'},

  ]

  constructor(private apartmentSer: ApartmentService,public router: Router, private _adminservices:AdminsService) {

  }
  ngOnInit(): void {
    this.checkRole();
    this.GetIncomeOutcome()
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
      //  console.error('Error fetching Dashboard Cards:', error);
     }
   ));
 }


  addItem(value: any) {
    this.showSide = value

  }
  selectedfromDropDown(value: any) {
    this.Date = value.name;
  }

  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }
}
