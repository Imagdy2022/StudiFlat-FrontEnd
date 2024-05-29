import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-create-new-payment',
  templateUrl: './create-new-payment.component.html',
  styleUrls: ['./create-new-payment.component.scss'],
})
export class CreateNewPaymentComponent {
  showSide: string = '';
  search: boolean = false;
  toType: string = 'Owner';
  allData: any[] = [];
  imgUrl: any;
  imageFile: string = '';
  firstIDFound = false;
  secondID: any;
  fileDetails : any;
  subscriptions: Subscription[] = [];
  attachUrl: any[];
  paymentForm: FormGroup = new FormGroup({
    Pay_To: new FormControl(null),
    Pay_UUID: new FormControl(null),
    Apt_ID: new FormControl(null),
    Pay_To_Type: new FormControl(null),
    Payment_Desc: new FormControl(null),
    Payment_Amount: new FormControl(null),
    Payment_Bouns: new FormControl(null),
    Payment_Notes: new FormControl(null),
    Payment_Attachment: new FormControl(null),
    Pay_Method: new FormControl('Cash'),
  });

  constructor(
    private uploadService: UploadFileService,
    public _adminservices: AdminsService,
    public router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.GetPayToList();
  }

  selectedfromDropDown(value: any) {
    this.Date = value.name;
    this.GetPayToList();
  }
  addItem(value: string): void {
    this.showSide = value;
  }

  statusTenant: any = '';
  pageNumber = 1;
  pagesize = 10;
  totalofPages = 0;
  first: number = 1;
  rows: number = 10;
  disablenext = false;
  disableperv = false;
  formDataArray: FormData[] = [];
  imageUrls: string[] = [];

  totalRecords = 0;
  paymethod: any;
  tiggerPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    let calcPageNumber = Math.floor(this.first / this.rows) + 1;
    this.pageNumber = calcPageNumber;
    this.GetPayToList();
  }
  numberpartners = 0;
  Date: any = 'All';

  itemID1: any;
  itemID2: any;
  selectUser(data: any) {
    Object.keys(data).forEach((key) => {
      if (key.toLowerCase().includes('id')) {
        if (!this.firstIDFound) {
          this.itemID1 = data[key];
          this.firstIDFound = true;
        } else if (key.toLowerCase().includes('id')) {
          this.itemID2 = data[key];
        }
      }
    });
  }
  SelectType(e: any) {
    this.toType = e.target.value;
    this.GetPayToList();
  }
  GetPayToList() {
    this.subscriptions.push(
      this._adminservices
        .GetPayToList(
          this.toType,
          this.searchText,
          this.pageNumber,
          this.pagesize
        )
        .subscribe({
          next: (res: any) => {
            this.allData = res.data;
            this.pageNumber = res.pageNumber;
            this.pagesize = res.pageSize;
            this.totalofPages = res.totalPages;
            this.totalRecords = res.totalRecords;
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
          error: (err) => {},
        })
    );
  }
  getImageFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        this.paymentForm.get('Payment_Attachment')?.setValue(this.imgUrl);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${'Images Upload Successfully'}`,
        });
      };
    }
  }
  AddPayment() {
    let data = {
      Pay_To: this.paymentForm.value['Pay_To'],
      Pay_UUID: this.itemID1,
      Apt_ID: this.itemID2,
      Pay_To_Type: this.paymentForm.value['Pay_To_Type'],
      Payment_Desc: this.paymentForm.value['Payment_Desc'],
      Payment_Amount: this.paymentForm.value['Payment_Amount'],
      Payment_Bouns: this.paymentForm.value['Payment_Bouns'],
      Payment_Notes: this.paymentForm.value['Payment_Notes'],
      Payment_Method: this.paymentForm.value['Pay_Method'],
      Payment_Attachment: this.attachUrls,
    };

    this.subscriptions.push(
      this._adminservices.AddPayment(data).subscribe({
        next: (data: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${data.message}`,
          });
          this.router.navigate(['/payments']);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${err.error.message[0]}`,
          });
        },
      })
    );
  }

  searchText: string = '';

  searchAction(event: KeyboardEvent) {
    if (
      this.searchText.trim() === '' &&
      (event.key === 'Backspace' || event.key === ' ')
    ) {
      event.preventDefault();
      return;
    }
    this.GetPayToList();
  }

  attachUrls: any[] = [];

onUploadContract(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      const formData = new FormData();
      formData.append('fileData', file, file.name);

      this.subscriptions.push(
        this.uploadService.uploadSingleFile(formData).subscribe(
          (res: any) => {
            this.fileDetails = {
              url: res[0].file_Path,
              name: file.name,
              type: file.type
            };
            this.attachUrls.push(this.fileDetails);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `${res.message}`,
            });
          },
          (err: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Please try again',
            });
          }
        )
      );
    }
  } else {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No file selected',
    });
  }
}
isImage(fileType: string): boolean {
  const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
  return imageTypes.includes(fileType);
}


  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++)
      this.subscriptions[i].unsubscribe();
  }
}
