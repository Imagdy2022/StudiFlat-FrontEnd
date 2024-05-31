import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';

@Component({
  selector: 'pushmsgs',
  templateUrl: './pushmsgs.component.html',
  styleUrls: ['./pushmsgs.component.css'],
})
export class PushmsgsComponent implements OnInit {
  showEdit: Array<boolean> = [];
  showEdit2: Array<boolean> = [];
  home: any;
  showSide: string = '';
  products!: Array<object>;
  selectedProducts: Array<object> = [];
  headerData: Array<any> = [];
  loading: boolean = true;
  search: boolean = false;
  subscriptions:Subscription[] = [];

  constructor(
    public _adminservices: AdminsService,
    public router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: ['/dashboard'] };
    this.getAllMsgs();
    this.GetAppUsers();
    //  this.GetAds();
  }
  selectppdd: any;
  /**
   * selectedfromDropDown
   * @param $event string
   * @returns void
   */
  selectedfromDropDown(value: any) {
    this.UserID = value.value;
    // this.getAllpartners()
  }
  onUserSelected(value: string) {
    this.UserID = value;
  }
  /**
   * addItem
   * @param value string
   * @returns void
   */
  addItem(value: string): void {
    this.showSide = value;
  }
  GetAppUsers() {
    this.subscriptions.push(  this._adminservices.GetAppUsers().subscribe((res) => {
      this.listDropDownArea = res;
    }))

  }

  onOptionsSelected(value: string) {

  }
  statusTenant: any = '';
  pageNumber = 1;
  pagesize = 20;
  pagesize2 = 10;
  first: number = 1;
  rows: number = 10;

  totalofPages = 0;
  disablenext = false;
  disableperv = false;
  pageNumber2 = 1;
  Msgs = [];
  totalRecords = 0;
  listDropDownArea: any = [];
  tiggerPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    let calcPageNumber = Math.floor(this.first / this.rows) + 1;
    this.pageNumber = calcPageNumber;
    this.pagesize = event.rows;

    this.getAllMsgs();
  }
  tiggerPageChange2(event: any) {
    const calcPageNumber = Math.floor(event.first / event.rows) + 1;
    this.pageNumber2 = calcPageNumber;
  }
  UserID: any;
  CreateFAQ() {
    this.subscriptions.push( this._adminservices
      .SendNotification(this.UserID, this.Question_title, this.question_answer)
      .subscribe(
        (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res['message'],
          });
          this.display1 = 'none';
          this.Question_title = '';
          this.question_answer = '';
          this.getAllMsgs();

          this.Question_title = '';
          this.question_answer = '';
        },
        (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${err.error.message[0]}`,
          });
        }
      ))

  }
  numberMsgs = 0;
  Date: any = 'All';
  getAllMsgs() {
    this.Msgs = [];
    this.numberMsgs = 0;
    this.subscriptions.push( this._adminservices.GetPushMsgs(this.pageNumber, this.pagesize).subscribe(
      (res: any) => {
        this.Msgs = res['data'];
        this.totalRecords = res['totalRecords'];

        this.numberMsgs = this.Msgs.length;
        this.totalofPages = res['totalPages'];
      },
      (error) => {
        console.error('Error fetching Messages:', error);
      }
    ))

  }

  detailperson(event: any, id: any): void {
    this.showEdit = [];
    event.stopPropagation();

    this.showEdit[id] == true
      ? (this.showEdit[id] = false)
      : (this.showEdit[id] = true);
  }
  detailperson2(event: any, id: any): void {
    this.showEdit2 = [];
    event.stopPropagation();

    this.showEdit2[id] == true
      ? (this.showEdit2[id] = false)
      : (this.showEdit2[id] = true);
  }
  hidecard() {
    this.showEdit = [];
  }
  hidecard2() {
    this.showEdit2 = [];
  }

  Question_title: any = '';
  question_answer: any = '';
  display1: any = 'none';
  openmodelcreateMsgs() {
    this.display1 = 'block';
  }
  onCloseModal1() {
    this.display1 = 'none';
  }

  Question_title_update: any = '';
  question_answer_update: any = '';
  display2: any = 'none';
  idMsgs_updat: any;
  openmodel2updateMsgs(item: any) {
    this.idMsgs_updat = ' ';
    this.Question_title_update = '';
    this.question_answer_update = '';
    this.display2 = 'block';

    this.idMsgs_updat = item.msg_ID;
    this.Question_title_update = item.msg_EN;
    this.question_answer_update = item.msg_De;
  }
  onCloseModal2() {
    this.display2 = 'none';
  }
  AddNotification() {
    this.subscriptions.push( this._adminservices
      .SendNotification(
        this.idMsgs_updat,
        this.Question_title_update,
        this.question_answer_update
      )
      .subscribe(
        (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res['message'],
          });
          this.display1 = 'none';
          this.getAllMsgs();

          this.onCloseModal2();
        },
        (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${err.error.message[0]}`,
          });
        }
      ))

  }

  partnersRole: any;
  is_Super: any;
  checkRole() {
    const data = localStorage.getItem('user');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.is_Super = parsedData.is_Super;
      if (parsedData.is_Super == false) {
        for (let i = 0; i < parsedData.permissions.length; i++) {
          if (parsedData.permissions[i].page_Name == 'partners') {
            this.partnersRole = parsedData.permissions[i];
          }
        }
        if (this.partnersRole.p_View == false && this.is_Super == false) {
          this.gotopage();
        }
      }
    }
  }
  gotopage() {
    let url: string = 'unlegal';
    this.router.navigateByUrl(url);
  }

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  imageInfos?: any = [];
  ListFiles: any;
  urls: any = null;
  counter = 0;
  link_create_ads: any = '';
  removeItem() {
    this.ListFiles = null;
    this.urls = null;
  }
  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    let files = event.target.files;
    this.ListFiles = event.target.files;
    if (files) {
      for (let file of files) {
        this.ListFiles = file;
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  readFile(file: File): Observable<string> {
    return new Observable((obs) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        obs.next(reader.result as string);
        obs.complete();
      };
      reader.readAsDataURL(file);
    });
  }
  display3: any = 'none';
  openmodel3adds() {
    this.link_create_ads = ' ';
    this.ListFiles = null;
    this.urls = null;

    this.display3 = 'block';
  }
  onCloseModal3() {
    this.display3 = 'none';
    this.link_create_ads = ' ';
    this.ListFiles = null;
    this.urls = null;
  }
  button_name: any = '';

  searchText: any = '';

  searchKey(data: string) {
    this.searchText = data;
    this.getAllMsgs();
  }
  searchTextChange: any;
  searchAction() {
    // this.searchTextChange.emit(this.searchText);
    this.search = false;
    this.getAllMsgs();
    this.searchText = '';
  }

  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }
}
