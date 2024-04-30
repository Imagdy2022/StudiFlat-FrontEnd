import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';

@Component({
  selector: 'app-main-file',
  templateUrl: './main-file.component.html',
  styleUrls: ['./main-file.component.scss'],
})
export class MainFileComponent {
  showSide: string = '';
  showEdit: Array<boolean> = [];

  products!: Array<object>;
  issues: any = [];
  selectedProducts: Array<object> = [];
  headerData: Array<any> = [];
  loading: boolean = true;
  search: boolean = false;
  listDropDown: Array<object> = [
    { name: 'Today' },
    { name: 'Last week' },
    { name: 'This month' },
    { name: 'This year' },
  ];

  constructor(
    public _adminservices: AdminsService,
    private messageService: MessageService,
    private uploadService: UploadFileService,
    public router: Router
  ) {}
  totalofPages = 0;
  ngOnInit() {
    this.initFakeData();
    this.getAllIssues();
    this.checkRole();

    const connection = new signalR.HubConnectionBuilder()

      .withUrl(environment.apiUrl + '/notify', { withCredentials: false })
      .build();

    connection
      .start()
      .then(function () {})
      .catch(function (err) {
        return console.error(err.toString());
      });

    connection.on('NewIssue', (result: any) => {
      this.getAllIssues();
      //this.messageService.add({ severity: 'info', summary: 'New Issue', detail: result.noti_Name });
    });
  }
  IssueRole: any;
  is_Super: any;
  checkRole() {
    const data = localStorage.getItem('user');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.is_Super = parsedData.is_Super;
      if (parsedData.is_Super == false) {
        for (let i = 0; i < parsedData.permissions.length; i++) {
          if (parsedData.permissions[i].page_Name == 'Issue Reports') {
            this.IssueRole = parsedData.permissions[i];
          }
        }
        if (this.IssueRole.p_View == false && this.is_Super == false) {
          this.gotopage();
        }
      }
    }
  }
  gotopage() {
    let url: string = 'unlegal';
    this.router.navigateByUrl(url);
  }
  Date = '';

  getAllIssues() {
    this.issues = [];
    this.numberissues = 0;
    this._adminservices
      .ListAllIssues(
        this.pageNumber,
        this.pagesize,
        this.Date,
        this.statusinquire,
        this.searchText
      )
      .subscribe(
        (res: any) => {
          this.issues = res['data'];
          this.totalRecords = res['totalRecords'];

          this.numberissues = this.issues.length;
          this.totalofPages = res['totalPages'];
        },
        (error) => {
          console.error('Error fetching owners:', error);
        }
      );
  }
  detailperson(event: any, id: any): void {
    this.showEdit = [];
    event.stopPropagation();

    this.showEdit[id] == true
      ? (this.showEdit[id] = false)
      : (this.showEdit[id] = true);
  }
  InquireFillterLists: Array<any> = [];
  InquireFillterSelected: Array<any> = [];
  initFakeData(): void {
    this.InquireFillterLists = [
      {id:0, name:"All"},
      {id:1, name:"Completed"},
      {id:2, name:"Pending"},
      {id:3, name:"InProgress"},
      {id:4, name:"Cancelled"}
    ];
    this.InquireFillterSelected = [true];
  }
  checkindex = 0;
  statusinquire: string = 'All' ;
  clickIquires(index: any) {
    this.checkindex = index.target.value;
    this.InquireFillterSelected = this.InquireFillterSelected.map((data) =>
      data == true ? false : false
    );

    this.InquireFillterSelected[index.target.value] = true;
    if (index.target.value  == 0) {
      this.statusinquire = 'All';
      this.getAllIssues();
    }
    if (index.target.value == 1) {
      this.statusinquire = 'Completed';

      this.getAllIssues();
    }
    if (index.target.value == 2) {
      this.statusinquire = 'Pending';

      this.getAllIssues();
    }
    if (index.target.value == 3) {
      this.statusinquire = 'InProgress';

      this.getAllIssues();
    }
    if (index.target.value == 4) {
      this.statusinquire = 'Cancelled';

      this.getAllIssues();
    }
  }
  hidecard() {
    this.showEdit = [];
  }
  totalRecords = 0;
  pageNumber = 1;
  numberissues = 0;
  pagesize = 10;
  tiggerPageChange(event: any) {
    const calcPageNumber = Math.floor(event.first / event.rows) + 1;
    this.pageNumber = calcPageNumber;
    this.getAllIssues();
  }

  addItem(value: string): void {
    this.showSide = value;
  }

  selectedfromDropDown(value: any) {
    this.Date = value.name;
    this.getAllIssues();
  }
  cancelissue(id: any) {
    this._adminservices.CancelIssue(id).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${'The Issue Canceled '}`,
        });
        this.getAllIssues();
      },
      (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${err.error.message[0]}`,
        });
      }
    );
  }
  Apointment3: any;
  MarkasProgress2() {
    this._adminservices
      .NewAppointment(this.paramid3, this.Apointment3.toLocaleString())
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res['message'],
          });
          this.getAllIssues();
          this.onCloseModal3();
        },
        (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${err.error.message[0]}`,
          });
        }
      );
  }
  MarkasProgress() {
    this._adminservices.MarkasProgress(this.paramid, this.Apointment).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${'Mark as Progress Successfuly '}`,
        });
        this.getAllIssues();
        this.onCloseModal1();
      },
      (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${err.error.message[0]}`,
        });
      }
    );
  }
  appointement: any = [];
  display1 = 'none';
  display2 = 'none';
  display3 = 'none';

  paramid: any;
  Apointment: any;
  onCloseModal1() {
    this.display1 = 'none';
  }
  imageSize: any;
  display22 = 'none';

  opencloseModal(photo: any) {
    this.display22 = 'block';
    this.imageSize = photo;
  }
  onCloseModal3() {
    this.display3 = 'none';
    this.Apointment3 = '';
  }
  onCloseModal2() {
    this.display2 = 'none';
    this.Company_gain = 0;
    this.worker_cost = 0;
    this.Total_cost = 0;
    this.discerption = '';
    this.item_Cost = 0;
  }
  paramid3: any;
  OpenModal3(id: any) {
    this.paramid3 = id;

    this.display3 = 'block';
  }
  OpenModal1(id: any) {
    this.Apointment = [];
    this.paramid = id;

    this.GetIssueByid();
    this.display1 = 'block';
  }
  idmodel2: any;
  OpenModal2(idmodel: any) {
    this.idmodel2 = idmodel;
    this.item_Cost = 0;
    this.who_will_pay = '';
    this.worker_cost = 0;
    this.Total_cost = 0;
    this.Company_gain = 0;
    this.discerption = '';
    this.display2 = 'block';
  }
  GetIssueByid() {
    this._adminservices.GetIssueDetails(this.paramid).subscribe(
      (res) => {
        this.appointement = res['appointement'];

        //  this.createissue.patchValue(res);
        //  this.createissue.get('issue_Images')?.setValue(res["issue_Images"]);
      },
      (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${err.error.message[0]}`,
        });
      }
    );
  }
  handleChange(item: any) {
    this.Apointment = item.appo_Date + ' ' + item.appo_Time;
  }
  who_will_pay: any = 'StudiFlats';
  handleChange2(item: any) {
    this.who_will_pay = item;
  }
  Company_gain: any;
  worker_cost: any = 0;
  Total_cost: any = 0;
  discerption: any;
  item_Cost: any = 0;
  issue_attach: any = '';

  MarkAsSolved() {
    this._adminservices
      .MarkAsSolved(
        this.idmodel2,
        this.who_will_pay,
        this.worker_cost,
        this.Total_cost,
        this.Company_gain,
        this.discerption,
        this.item_Cost,
        this.issue_attach
      )
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${'The Issue was marked as Solved'}`,
          });
          this.getAllIssues();

          this.onCloseModal2();
        },
        (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${err.error.message[0]}`,
          });
        }
      );
  }
  onSearchChange(searchValue: any) {
    this.Total_cost = [];
    // this.worker_cost=searchValue.data
    this.Total_cost = Number(this.item_Cost) + Number(this.worker_cost);
  }
  onSearchChange2(searchValue: any) {
    // this.item_Cost=searchValue.data
    this.Total_cost = Number(this.Total_cost) + Number(this.item_Cost);
  }
  searchText: any = '';

  searchKey(data: string) {
    this.searchText = data;
    this.getAllIssues();
  }
  searchTextChange: any;
  searchAction() {
    // this.searchTextChange.emit(this.searchText);
    // this.search = false;
    this.getAllIssues();
    // this.searchText = '';
  }
  selectedContractImg: any;
  afterUploadImage = 'true';

  onUploadContract(event: any, fieldName: string): void {
    // get the file
    const file = event.target.files[0];
    // convert the file to formdata
    const formData = new FormData();
    formData.append('fileData', file, file.name);
    // check if the file has been uploaded
    if (file) {
      // call the onUpload function to get the link to the file
      this.uploadService.uploadSingleFile(formData).subscribe(
        (img: any) => {
          // create url to preview file
          file.url = URL.createObjectURL(file);
          // check wich file uploaded
          fieldName == 'contract_Path'
            ? (this.selectedContractImg = file)
            : null;

          // patch the fieldName in Form

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Attachments has uploaded Successfuly`,
          });

          this.afterUploadImage = 'true';
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Please try again`,
          });
        }
      );
    }
  }
}
