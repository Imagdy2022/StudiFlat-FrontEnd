import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApartmentService } from 'src/app/_services/apartments/apartment.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  showSide: string = '';
  listDropDown:Array<object>=[{name:'Today'},{name:'Last week'},{name:'This month'},{name:'This year'}]
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

  constructor(private apartmentSer: ApartmentService,public router: Router) {
    this.checkRole();
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


  addItem(value: any) {
    this.showSide = value

  }
  selectedfromDropDown(value:any){

  }
}
