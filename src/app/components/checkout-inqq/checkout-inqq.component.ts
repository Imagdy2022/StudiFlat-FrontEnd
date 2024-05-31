import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout-inqq',
  templateUrl: './checkout-inqq.component.html',
  styleUrls: ['./checkout-inqq.component.css'],
})
export class CheckoutInqqComponent implements OnInit {
  checkOut: any = [];
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
    this.initFakeData();
    this.getAllcheckOut(this.statusinquire);
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
      this.getAllcheckOut(this.statusinquire);
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
  first: number = 1;
  rows: number = 10;

  date = 'All';
  totalRecords = 0;
  getAllcheckOut(statuscheckOut: any) {
    this.checkOut = [];
    this.numbercheckOut = 0;
    this.subscriptions.push(
      this._checkOutService
        .GetCheckoutList(
          this.pageNumber,
          this.pagesize,
          this.searchText,
          statuscheckOut,
          this.date
        )
        .subscribe(
          (res: any) => {
            this.checkOut = res['data'];
            this.numbercheckOut = this.checkOut.length;
            this.totalofPages = res['totalPages'];
            this.totalRecords = res['totalRecords'];

            if (this.totalofPages == this.pageNumber) {
              this.disablenext = true;
            } else {
              this.disablenext = false;
            }
            if (this.pageNumber == 1) {
              this.disableperv = true;
            } else {
              this.disableperv = false;
            }
          },
          (error) => {
            console.error('Error fetching owners:', error);
          }
        )
    );
  }
  tiggerPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    let calcPageNumber = Math.floor(this.first / this.rows) + 1;
    this.pageNumber = calcPageNumber;
    this.getAllcheckOut(this.statusinquire);
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
  initFakeData(): void {
    this.InquireFillterLists = [
      {
        id: 0,
        name: 'All',
      },
      {
        id: 1,
        name: 'completed',
      },
      {
        id: 2,
        name: 'Ready Checkout',
      },
      {
        id: 3,
        name: 'end soon',
      },
    ];
    this.InquireFillterSelected = [true];
  }
  selectedfromDropDown(value: any) {
    this.date = value.name;
    this.getAllcheckOut(this.statusinquire);
  }
  checkindex = 0;
  clickIquires(index: any) {
    this.checkindex = index.target.value;
    this.InquireFillterSelected = this.InquireFillterSelected.map((data) =>
      data == true ? false : false
    );

    this.InquireFillterSelected[index.target.value] = true;
    if (index.target.value == 0) {
      this.statusinquire = 'All';
      this.getAllcheckOut(this.statusinquire);
    }
    if (index.target.value == 1) {
      this.statusinquire = 'completed';

      this.getAllcheckOut(this.statusinquire);
    }
    if (index.target.value == 2) {
      this.statusinquire = 'Ready Checkout';

      this.getAllcheckOut(this.statusinquire);
    }
    if (index.target.value == 3) {
      this.statusinquire = 'end soon';

      this.getAllcheckOut(this.statusinquire);
    }
  }
  onCloseModal1() {
    this.display1 = 'none';
  }
  display1: any = 'none';
  InsertCheckOut(REQ_ID: any) {
    this.subscriptions.push(
      this._checkOutService.InsertCheckOut(REQ_ID).subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${res.message}`,
          });
          this.display1 = 'block';
          this.getAllcheckOut(this.statusinquire);
        },
        (error) => {
          this.display1 = 'none';

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${error.error.message[0]}`,
          });
        }
      )
    );
  }

  hidecard() {
    this.showEdit = [];
  }
  searchText: any = '';
  search: boolean = false;

  searchKey(data: string) {
    debugger;
    this.searchText = data;
    this.getAllcheckOut(this.statusinquire);
  }
  searchTextChange: any;
  searchAction(event: KeyboardEvent) {
    if (this.searchText.trim() === '' && (event.key === 'Backspace' || event.key === ' ')) {
      event.preventDefault();
      return;
  }
    this.getAllcheckOut(this.statusinquire);
  }
  display3: any;
  BankDetails: any;
  GetBankDetails(Req_ID: any) {
    this._checkOutService.GetBankDetails(Req_ID).subscribe(
      (res: any) => {
        this.BankDetails = res;
      },
      (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${err.error.message[0]}`,
        });
      }
    );

    this.display2 = 'block';
  }
  display2: any;
  Is_PDF: any;
  onCloseModal2() {
    this.display2 = 'none';
  }
  RefundDetails: any;
  GetRefundDetails(Req_ID: any) {
    this.subscriptions.push(
      this._checkOutService.GetRefundDetails(Req_ID).subscribe(
        (res) => {
          this.RefundDetails = res;
          this.Is_PDF = res.refund_Attachment.includes('.pdf') ? true : false;
        },
        (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${err.error.message[0]}`,
          });
        }
      )
    );
    this.display3 = 'block';
  }

  onCloseModal3() {
    this.display3 = 'none';
  }
  Refund_Transaction_ID: any;
  Refund_Attachment: any;
  ChangeRefund_ID(event: Event) {
    this.Refund_Transaction_ID = (event.target as HTMLInputElement).value;
    console.log(this.Refund_Transaction_ID);
  }

  onUploadContract(event: any, fieldName: string): void {
    // get the file
    const file = event.target.files[0];
    // convert the file to formdata
    const formData = new FormData();
    formData.append('fileData', file, file.name);
    // check if the file has been uploaded
    if (file) {
      // call the onUpload function to get the link to the file
      this.subscriptions.push(
        this.uploadService.uploadSingleFile(formData).subscribe(
          (img: any) => {
            // create url to preview file
            file.url = URL.createObjectURL(file);
            // check wich file uploaded
            fieldName == 'contract_Path'
              ? (this.selectedContractImg = file)
              : null;

            this.Refund_Attachment = img[0].file_Path;
            console.log(img[0].file_Path);
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
        )
      );
    }
  }
  opencloseModal(photo: any) {
    this.display22 = 'block';
    this.imageSize = photo;
  }

  PostRefunding() {
    this.subscriptions.push(
      this._checkOutService
        .PostRefunding(
          this.RefundDetails.req_ID,
          this.RefundDetails.inv_ID,
          this.Refund_Transaction_ID,
          this.Refund_Attachment
        )
        .subscribe(
          (ress) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Refunding Process has done',
            });
            this.getAllcheckOut(this.statusinquire);
            this.onCloseModal3();
          },
          (err: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${err.error.message[0]}`,
            });
          }
        )
    );
  }
  openmodel(image: any) {
    this.imageSize = image;
    this.display33 = 'block';
  }
  oncloseModal() {
    this.display33 = 'none';
  }
  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++)
      this.subscriptions[i].unsubscribe();
  }
}
