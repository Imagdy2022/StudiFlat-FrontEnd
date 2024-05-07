import { Component ,ViewEncapsulation,OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { ApartmentService } from 'src/app/_services/apartments/apartment.service';
import { environment } from 'src/environments/environment';
import { IgxDoughnutChartComponent } from "igniteui-angular-charts";
import { RecentActivities } from 'src/app/models/recent-activities';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],


  // encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  @ViewChild("chart", { static: true })
  public chart : IgxDoughnutChartComponent;
  showSide: string = '';
  apartmentsRentedDial: number = 15;
  subscriptions:Subscription[] = [];
  headTableList:Array<string>=['Apartment name','Locations','Owner','Amount','Status']
  rowDatalist:Array<any>=[{img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'Alt-Moabit',admin:'Ben Ten',amount:'@€25,00/Mo',status:'Rented'},
  {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'Alt-Moabit',admin:'Ben Ten',amount:'@€25,00/Mo',status:'Rented'},
  {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'Alt-Moabit',admin:'Ben Ten',amount:'@€25,00/Mo',status:'Rented'}
]

  listDropDown:Array<object>=[{name:'Today'},{name:'Last week'},{name:'This month'},{name:'This year'}]
  DashboardRole:any
  is_Super:any
  constructor(private apartmentSer: ApartmentService,public router: Router,private messageService: MessageService, public _adminservices: AdminsService,
   ) {
    // this.checkRole();

  }
  dataChart2:any
  public selectedSliceLabel : string = "No Selection";
    public selectedSliceValue : string = "0%";
  public OnSliceClick(e: any) {

    if (e.args.isSelected)
    {
        this.selectedSliceLabel = this.dataChart2[e.args.index].Label;
        this.selectedSliceValue = this.dataChart2[e.args.index].Value + "%";
    }
    else
    {
        this.selectedSliceLabel = "No Selection";
        this.selectedSliceValue = "0%";
    }
}
  ngOnInit(): void {
    const connection = new signalR.HubConnectionBuilder()
    .withUrl(environment.apiUrl + '/notify',{ withCredentials: false})
    .build();

  connection.start().then(function () {
  }).catch(function (err) {
    return console.error(err.toString());
  });
  this.GetDashCards()
  this.AptRentedFree()
  this.MonthlyRevenu()
  this.PopularApt()
  this.RecentActivities()
  connection.on("PublicNotification", (result: any) => {
    this.playAudio();
    this.messageService.add({ severity: 'info', detail: result.noti_Name });

  });
  }

  MonthlyRevenTotol:any=[]
  MonthlyRevenText:any=[]

  MonthlyRevenu() {
    this.subscriptions.push(this._adminservices.MonthlyRevenu().subscribe(
      (res: any) => {
        for(let i=0;i<res.length;i++){
          this.MonthlyRevenTotol.push(res[i].total)
          this.MonthlyRevenText.push(res[i].monthly)
        }
      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    ))

  }
  DashCards: any = {};
  GetDashCards() {
    this.subscriptions.push(this._adminservices.GetDashCards().subscribe(
      (res: any) => {
        this.DashCards = res;
      },
      (error) => {
        console.error('Error fetching Dashboard Cards:', error);
      }
    ));
  }

  PopularAptarr: any[] = [];
  PopularApt() {
    this.subscriptions.push(    this._adminservices.PopularApt().subscribe(
      (res: any) => {
        this.PopularAptarr = res;
      },
      (error) => {
        console.error('Error fetching PopularApt:', error);
      }
    ));
  }

  RecentActivitiesarr: RecentActivities[] = [];
  RecentActivities() {
    this.subscriptions.push(this._adminservices.RecentActivities(1,4).subscribe({
      next:(res:any)=>{
        this.RecentActivitiesarr = res.data;
      },
      error:(err)=>{
      }
    }));

  }
  AptRented:any
  AptRentedFree() {
    this.subscriptions.push( this._adminservices.AptRentedFree().subscribe(
      (res: any) => {
        this.AptRented = res;
        this.dataChart = {
           labels: ['apartments', 'beds', 'rooms'],
          // labels: ['Free', 'Rented'],
          datasets: [
              {
                  data: [50, 20 , 30],
                  backgroundColor:  ['#FECE72' ,'#BED4FF','#FF9B7A'],
                  hoverBackgroundColor: [,'#FECE72','#BED4FF' ,'#FF9B7A']
              }
          ]
      };


      this.options = {
          cutout: '60%',
          plugins: {
              legend: {
                  labels: {
                      color: 'black'
                  }
              }
          }
      };
      },
      (error) => {
        console.error('Error fetching Rented Free:', error);
      }
    ))


  }
  dataChart: any;

   options  : any;
  appendcart(){


  }
  playAudio(){
    let audio = new Audio();
    audio.src = "http://dev.studiflats.com/assets/bell.wav";

    let audio2: HTMLAudioElement = new Audio("http://dev.studiflats.com/assets/bell.wav");
    audio2.play();


  }
  checkRole(){
    const data = localStorage.getItem("user");
     if (data !== null) {

      let parsedData = JSON.parse(data);
       this.is_Super=parsedData.is_Super
      if(parsedData.is_Super==false) {
  for(let i=0; i<parsedData.permissions.length;i++){
    if(parsedData.permissions[i].page_Name=="Dashboard"){
      this.DashboardRole=parsedData.permissions[i];
    }
  }
  if(this.DashboardRole.p_View==false &&this.is_Super==false) {
    this.gotopage( )
  }
}


    }
  }
  gotopage( ){
    let url: string = "unlegal";
      this.router.navigateByUrl(url);
  }
  addItem(value: any) {
    this.showSide = value
  }
  selectedfromDropDownPopularApartments(value:any){
  }
  selectedfromDropDownApartmentsRentedFree(value:any){
  }
  selectedfromDropDown(value:any){
  }
  selectedfromDropDownPopularApartmentstable(value:any){
  }

  navigateToRoute(actionRoute: string, actionID: string) {
    switch (actionRoute) {
      case 'Issues':
        this.router.navigate([`/Issue_Reports/Report-view/${actionID}`]);
        break;
      case 'Owners':
        this.router.navigate([`/owners/owner-profile/${actionID}`]);
        break;
      case 'Apartments':
        this.router.navigate([`/apartments/apartments-details/${actionID}`]);
        break;
      case 'Workers':
        this.router.navigate([`/workers/worker-profile/${actionID}`]);
        break;
      case 'Partners':
        this.router.navigate([`/partner/view-partner/${actionID}`]);
        break;
        case 'Tenant':
          this.router.navigate([`/users/app-edite-user-details/${actionID}`]);
          break;
        case 'Chats':
          this.router.navigate([`/messages/message-tiket/${actionID}`]);
          break;
        case 'Payment':
          this.router.navigate([`/payments/invoice/${actionID}`]);
          break;
        case 'Booking':
          this.router.navigate([`/apartments/booking/${actionID}`]);
          break;
    }
  }

  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }
}
