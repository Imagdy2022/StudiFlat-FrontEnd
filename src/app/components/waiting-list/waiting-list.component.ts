import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.scss'],
})
export class WaitingListComponent implements OnInit {
  List: any = [];
  headerData: Array<any> = [];
  showEdit: Array<boolean> = [];
  subscriptions: Subscription[] = [];

  numbercheckOut = 0;
  afterUploadImage: string;
  selectedContractImg: any;
  display22: string;
  imageSize: any;
  display33: string;
  constructor(
    private _checkOutService: AdminsService,
    private messageService: MessageService,
    private uploadService: UploadFileService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getWaitingList();
    const connection = new signalR.HubConnectionBuilder()

      .withUrl(environment.apiUrl + '/notify', { withCredentials: false })
      .build();

    connection
      .start()
      .then(function () {})
      .catch(function (err) {
        return console.error(err.toString());
      });

    connection.on('NewInquiry', (result: any) => {
      this.getWaitingList();
      //this.messageService.add({ severity: 'info', summary: 'New Booking Request', detail: result.noti_Name });
    });
  }
  checkOutRole: any;
  is_Super: any;

  gotopage() {
    let url: string = 'unlegal';
    this.router.navigateByUrl(url);
  }
  statusinquire: any = '';
  pageNumber = 1;
  pagesize = 10;
  totalofPages = 0;
  disablenext = false;
  disableperv = false;

  date = 'All';
  totalRecords = 0;
  getWaitingList() {
    this.List = [];
    this.numbercheckOut = 0;
    this.subscriptions.push(
      this._checkOutService
        .GetWaitlist(
          this.pageNumber,
          this.pagesize,
          this.searchText,
          this.date
        )
        .subscribe(
          (res: any) => {
            this.List = res['data'];
            this.numbercheckOut = this.List.length;
            this.totalofPages = res['totalPages'];
            this.totalRecords = res['totalRecords'];
          },
          (error) => {
            console.error('Error fetching owners:', error);
          }
        )
    );
  }
  tiggerPageChange(event: any) {
    const calcPageNumber = Math.floor(event.first / event.rows) + 1;
    this.pageNumber = calcPageNumber;
    this.getWaitingList();
  }
  ids: any = [];
  detailperson(event: any, id: any) {
    this.showEdit = [];
    event.stopPropagation();

    this.showEdit[id] == true
      ? (this.showEdit[id] = false)
      : (this.showEdit[id] = true);
  }
  showSide: string = '';

  addItem(value: string): void {
    this.showSide = value;
  }
  dropdownOption: Array<any> = [];
  listDropDown: Array<object> = [
    { name: 'All' },
    { name: 'Today' },
    { name: 'Last week' },
    { name: 'This month' },
    { name: 'This year' },
  ];
  Inquiries = [];
  InquireFillterLists: Array<any> = [];
  InquireFillterSelected: Array<any> = [];

  selectedfromDropDown(value: any) {
    this.date = value.name;
    this.getWaitingList();
  }
  checkindex = 0;


  hidecard() {
    this.showEdit = [];
  }
  searchText: any = '';
  search: boolean = false;

  searchTextChange: any;
  searchAction(event: KeyboardEvent) {
    if (this.searchText.trim() === '' && (event.key === 'Backspace' || event.key === ' ')) {
      event.preventDefault();
      return;
  }
    this.getWaitingList();
  }


  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++)
      this.subscriptions[i].unsubscribe();
  }
}
