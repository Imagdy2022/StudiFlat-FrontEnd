import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { RecentActivities } from 'src/app/models/recent-activities';

@Component({
  selector: 'app-recent-activities',
  templateUrl: './recent-activities.component.html',
  styleUrls: ['./recent-activities.component.scss']
})
export class RecentActivitiesComponent implements OnInit{
  RecentActivitiesarr: RecentActivities[] = [];
  headerData: Array<any> = [];
  showSide: string = '';
  pageNumber=1;
  pagesize=10;
  totalofPages=0;
  totalRecords=0;
  listDropDown:Array<object>=[{name:'Today'},{name:'Last week'},{name:'This month'},{name:'This year'}]
  constructor(public router: Router,private messageService: MessageService, public _adminservices: AdminsService,
  ) {

 }
  addItem(value: any) {
    this.showSide = value
  }
  ngOnInit(): void {
    this.RecentActivities();

  }
  selectedfromDropDown(value:any){
  }
  RecentActivities() {
    this._adminservices.RecentActivities(this.pageNumber,this.pagesize).subscribe({
      next:(res:any)=>{
        this.RecentActivitiesarr = res.data;
        this.totalofPages=res.totalPages
        this.totalRecords=res.totalRecords
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  tiggerPageChange(event: any) {

    const calcPageNumber = Math.floor(event.first / event.rows) + 1;
    this.pageNumber=calcPageNumber;
    this.RecentActivities();
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
        case 'Tenants':
          this.router.navigate([`/users/app-edite-user-details/${actionID}`]);
          break;
        case 'Tickets':
          this.router.navigate([`/messages/message-tiket/${actionID}`]);
          break;
        case 'Invoices':
          this.router.navigate([`/payments/invoice/${actionID}`]);
          break;
        case 'Booking':
          this.router.navigate([`/apartments/booking/${actionID}`]);
          break;
    }
  }

}
