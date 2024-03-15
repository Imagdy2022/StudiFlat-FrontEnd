import { Component ,ViewEncapsulation,OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { ApartmentService } from 'src/app/_services/apartments/apartment.service';
import { environment } from 'src/environments/environment';
import { IgxDoughnutChartComponent } from "igniteui-angular-charts";
import { IgxRingSeriesComponent } from "igniteui-angular-charts";
import { IgxSliceClickEventArgs } from "igniteui-angular-charts";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],


  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  @ViewChild("chart", { static: true })
  public chart : IgxDoughnutChartComponent;
  showSide: string = '';
  apartmentsRentedDial: number = 15;
  headTableList:Array<string>=['Apartment name','Locations','Owner','Amount','Status']
  rowDatalist:Array<any>=[{img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'Alt-Moabit',admin:'Ben Ten',amount:'@€25,00/Mo',status:'Rented'},
  {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'Alt-Moabit',admin:'Ben Ten',amount:'@€25,00/Mo',status:'Rented'},
  {img:'assets/images/Avatar.svg',name:'Willow Creek Apartments',title:'Alt-Moabit',location:'Alt-Moabit',admin:'Ben Ten',amount:'@€25,00/Mo',status:'Rented'}
]
  RecentActivitiesList:Array<any>=[
    {img:'assets/images/Avatar.svg',status:'Paid rent',name:'James Tobias',message:'Rental has been booked'},
    {img:'assets/images/Avatar.svg',status:'Paid rent',name:'James Tobias',message:'Rental has been booked'},
    {img:'assets/images/Avatar.svg',status:'Paid rent',name:'James Tobias',message:'Rental has been booked'}
  ]
  listDropDown:Array<object>=[{name:'Today'},{name:'Last week'},{name:'This month'},{name:'This year'}]
  DashboardRole:any
  is_Super:any
  constructor(private apartmentSer: ApartmentService,public router: Router,private messageService: MessageService, public _adminservices: AdminsService,
   ) {
    this.dataChart2 = [
      { Value: 37, Label: "Cooling", Summary: "Cooling 37%" },
      { Value: 25, Label: "Residential", Summary: "Residential 25%"  },
      { Value: 12, Label: "Heating", Summary: "Heating 12%" },
      { Value: 11, Label: "Lighting", Summary: "Lighting 11%" },
      { Value: 18, Label: "Other", Summary: "Other 18%" }
  ];
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

  basicData:any
  basicOptions:any
  MonthlyRevenu() {
 
    this._adminservices.MonthlyRevenu().subscribe(
      (res: any) => {
        for(let i=0;i<res.length;i++){
          this.MonthlyRevenTotol.push(res[i].total)
          this.MonthlyRevenText.push(res[i].monthly)
        }
         this.basicData = {
          labels:  this.MonthlyRevenText ,
          datasets: [
              {
                label: 'Revenu',

                   data:  this.MonthlyRevenTotol ,
                  // backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                  // borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                  borderWidth: 1,
                  innerWidth:10,
                  

              }
          ]
      };

      this.basicOptions = {
        responsive: true,
        legend: {
            display:false,
            labels: {
                fontColor: '#86909C',
                display:false
            }
        },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      color: ''
                  },
                  grid: {
                      color: '',
                      drawBorder: false
                  }
              },
              x: {
                  ticks: {
                      color: ''
                  },
                  grid: {
                      color: '',
                      drawBorder: false
                  }
              }
          }
      };
      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }
  DashCards: any = {};
  GetDashCards() {
 
    this._adminservices.GetDashCards().subscribe(
      (res: any) => {
        this.DashCards = res;
      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }

  PopularAptarr: any = {};
  PopularApt() {
 
    this._adminservices.PopularApt().subscribe(
      (res: any) => {
        this.PopularAptarr = res;
      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }

  RecentActivitiesarr: any = {};
  RecentActivities() {
 
    this._adminservices.RecentActivities().subscribe(
      (res: any) => {
        this.RecentActivitiesarr = res;
      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }
  AptRented:any
  AptRentedFree() {
 
    this._adminservices.AptRentedFree().subscribe(
      (res: any) => {
        this.AptRented = res;
        this.dataChart = {
          labels: ['Free', 'Rented' ],
          datasets: [
              {
                  data: [ this.AptRented.apt_Free,  this.AptRented.apt_Rented ],
                  backgroundColor:  ['#12B76A','#1F4068'  ],
                  hoverBackgroundColor: ['#12B76A','#1F4068'  ]
              }
          ]
      };


      this.options = {
          cutout: '70%',
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
        console.error('Error fetching owners:', error);
      }
    );
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
    console.log(value)
  }
  selectedfromDropDownPopularApartments(value:any){
    console.log(value)
  }
  selectedfromDropDownApartmentsRentedFree(value:any){
    console.log(value)
  }
  selectedfromDropDown(value:any){
    console.log(value)
  }
  selectedfromDropDownPopularApartmentstable(value:any){
    console.log(value)
  }
}
