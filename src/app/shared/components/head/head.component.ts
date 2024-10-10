import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { MessageService } from 'primeng/api';
import {
  FaConfig,
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent {
  value: string = '';
  show: string = 'false';
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() titleModule = '';

  constructor(public router: Router,
    private uploadFile: UploadFileService,
    private http: HttpClient,
    private _adminservices: AdminsService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.PushNotification();
    this.PushNotificationCount();
  }
  showSidebar(): void {
    this.show == 'false' ? (this.show = 'true') : (this.show = 'false');
    this.newItemEvent.emit(this.show);
  }

  detailperson(event: any, id: any): void {
    this.showEdit = [];
    event.stopPropagation();

    this.showEdit[id] == true
      ? (this.showEdit[id] = false)
      : (this.showEdit[id] = true);
  }

  showEdit: Array<boolean> = [];
  hidecard(id: any) {
    this.showEdit = [];
  }
  display1 = 'none';

  shownot() {
    //this. PushNotification()
    if (this.display1 == 'none') {
      this.display1 = 'block';
    } else {
      this.display1 = 'none';
    }
  }
  //    onLikeClicked(event:any){
  //     // event.stopPropagation();
  //  this.display1="none"

  //    }
  NotifiList: any = [];
  NotiCount: any;
  NCount: any;
  NotiCount10: any;

  PushNotification() {
    this._adminservices.PushNotification().subscribe(
      (res: any) => {
        this.NotifiList = res;
      },
      (error) => {
        // this.messageService.add({   severity: 'error', summary: 'error', detail: 'error' });
      }
    );
  }
  PushNotificationCount() {
    this._adminservices.PushNotificationCount().subscribe(
      (res: any) => {
        this.NotiCount = res;
        this.NCount = this.NotiCount.count;
        if (this.NotiCount.count > 10) {
          this.NotiCount10 = 10 + '+';
        } else {
          this.NotiCount10 = this.NotiCount.count;
        }
      },
      (error) => {
        // this.messageService.add({   severity: 'error', summary: 'error', detail: 'error' });
      }
    );
  }
  closenotifaction() {
    this.display1 = 'none';
  }
  ClickedOut(event: any) {
    // debugger
    // if(event.target.className != "cfresda") {
    this.display1 = 'none';

    // }
  }
  MarkReaded(id: any) {
    this._adminservices.MarkPushRead(id).subscribe(
      (res) => {
        /* this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Marked as Readed',
        }); */

        this.PushNotification();
        //this.closenotifaction();
        this.PushNotificationCount();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'error',
        });
      }
    );
  }
  MarkUnReaded(id: any) {
    this._adminservices.MarkPushUnRead(id).subscribe(
      (res) => {
        /*  this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Marked as Un-Readed',
        }); */

        this.PushNotification();
        //this.closenotifaction();
        this.PushNotificationCount();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'error',
        });
      }
    );
  }
  MarkAllRead() {
    this._adminservices.MarkAllRead().subscribe(
      (res) => {
        /*  this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'All Marked as Readed',
        }); */

        this.PushNotification();
        //this.closenotifaction();
        this.PushNotificationCount();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'error',
        });
      }
    );
  }
  navigateToRoute(actionRoute: string, actionID: string,itemID:any) {
    // alert(actionRoute);
    // alert(actionID);
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
    this.MarkReaded(itemID)
  }

}
