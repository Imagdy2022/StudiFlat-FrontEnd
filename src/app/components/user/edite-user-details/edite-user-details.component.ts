import { Component, ViewEncapsulation } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InquiresService } from 'src/app/_services/inquires/inquires.service';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { Observable, Subscription } from 'rxjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-edite-user-details',
  templateUrl: './edite-user-details.component.html',
  styleUrls: ['./edite-user-details.component.scss'],
})
export class EditeUserDetailsComponent {
  showSide: string = '';
  value: string = '';
  cities: Array<object> = [];
  selectedCity: any;
  available: boolean = true;
  link: Array<boolean> = [true];
  subscriptions: Subscription[] = [];
  listAnchors: any = [
    { id: 'Generalinfo', link: 'General info' },
    { id: 'OtherDetails', link: 'Other Details' },
    { id: 'Documentdetails', link: 'Document details' },
    { id: 'Rentalhistory', link: 'Rental history' },
    { id: 'userinformation', link: 'user information' },
  ];
  titlePage: string = '';
  changeImageUrl: any;
  imageUrl: string = '';
  loadingButton: boolean = false;
  products: any = [
    {
      Invoice: 'invoice435',
      date: 'April 27 - May 27, 2023',
      Amount: '$35,00',
      Behaviour: true,
    },
    {
      Invoice: 'invoice435',
      date: 'April 27 - May 27, 2023',
      Amount: '$35,00',
      Behaviour: true,
    },
    {
      Invoice: 'invoice435',
      date: 'April 27 - May 27, 2023',
      Amount: '$35,00',
      Behaviour: true,
    },
    {
      Invoice: 'invoice435',
      date: 'April 27 - May 27, 2023',
      Amount: '$35,00',
      Behaviour: true,
    },
  ];
  ngOnInit() {
    this.initCities();
    this.GetRequestDetails();
    this.checkRole();
  }

  param: any;
  constructor(
    private uploadFile: UploadFileService,
    public _adminservices: AdminsService,
    private viewportScroller: ViewportScroller,
    private _inquiresService: InquiresService,
    private _ActivatedRoute: ActivatedRoute,
    private messageService: MessageService,
    public router: Router
  ) {
    this.param = _ActivatedRoute.snapshot.paramMap.get('id');
  }
  TantsRole: any;
  is_Super: any;
  checkRole() {
    const data = localStorage.getItem('user');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.is_Super = parsedData.is_Super;
      if (parsedData.is_Super == false) {
        for (let i = 0; i < parsedData.permissions.length; i++) {
          if (parsedData.permissions[i].page_Name == 'Users') {
            this.TantsRole = parsedData.permissions[i];
          }
        }
        if (this.TantsRole.p_Update == false && this.is_Super == false) {
          this.gotopage();
        }
      }
    }
  }
  gotopage() {
    let url: string = 'unlegal';
    this.router.navigateByUrl(url);
  }
  gotopage2() {
    let url: string = 'users';
    this.router.navigateByUrl(url);
  }
  /**
   * initCities
   * @return void
   */
  initCities(): void {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }
  Tenant_details: any = [];
  Tenant_Attach: any = [];
  tenant_photo = '';
  GetRequestDetails() {
    this.subscriptions.push(
      this._adminservices.TenantDetails(this.param).subscribe(
        (res) => {
          this.Tenant_details = res;
          this.Tenant_Attach = res['documents'];
          this.FName = res['tenant_FName'];
          this.LName = res['tenant_LName'];
          this.PassportID = res['tenant_PassportID'];
          this.About = res['tenant_About'];
          this.tenant_photo = res['tenant_photo'];
          this.comment_leave = res['beh_Comment'];
          this.ratingnumber = res['rate'];
        },
        (error) => {
          console.error('Error fetching owners:', error);
        }
      )
    );
  }
  User_ID: any;
  FName: any;
  LName: any;
  PassportID: any;
  About: any;
  image: any;
  comment_leave: any = '';
  UpdateTenantInfo() {
    this.subscriptions.push(
      this._adminservices
        .UpdateTenantInfo(
          this.param,
          this.FName,
          this.LName,
          this.PassportID,
          this.About,
          this.ratingnumber,
          this.comment_leave,
          this.formData2
        )
        .subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `${res.message}`,
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${error.error.message[0]}`,
            });
          }
        )
    );
  }
  /**
   * addItem
   * @param value
   */
  addItem(value: string) {
    this.showSide = value;
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  changeAnchor(index: number): void {
    this.link = this.link.map((el) => (el == true ? false : false));
    this.link[index] = true;
  }
  formData2 = new FormData();
  uploadPic(event: any) {
    this.loadingButton = true;
    if (event != 'delete') {
      const selectedFile = event.target.files[0];
      const formData = new FormData();
      formData.append('fileData', selectedFile, selectedFile.name);
      this.formData2.append('User_Img', selectedFile);

      this.subscriptions.push(
        this.uploadFile.uploadSingleFile(formData).subscribe((img: any) => {
          this.imageUrl = img[0].file_Path;
          this.changeImageUrl?.emit(img[0].file_Path);
          this.loadingButton = false;
        })
      );
    } else if (event == 'delete') {
      this.imageUrl = '';
      this.changeImageUrl.emit(this.defaultImageUrl());
      this.loadingButton = false;
    }
  }

  /**
   * defaultImageUrl
   * @returns string
   */
  defaultImageUrl(): string {
    return 'https://t4.ftcdn.net/jpg/05/50/60/49/360_F_550604961_BZT4vo52ysIku2cQ3Zn8sAQg1rXHBKv0.jpg';
  }
  gotodetail(id: any) {
    let url: string = '/payments/invoice/' + id;
    this.router.navigateByUrl(url);
  }
  star: any = {};
  id: any;
  finalRate: any;
  idopen: any;
  num = 5;
  isRate = false;
  addStarsRating(value: number, id: any) {
    let url = `StarsRatings/AddOpenDataStarsRating`;
  }
  ratingnumber: any = 0;
  addreating(numberra: any) {
    this.ratingnumber = numberra;
  }
  desk = '';
  display1: any = 'none';
  onCloseModal1() {
    this.display1 = 'none';
    this.desk = '';
  }
  openmodel1() {
    this.display1 = 'block';
  }
  formdata2 = new FormData();
  uploadPic2(event: any) {
    const selectedFile = event.target.files[0];
    this.formData2 = new FormData();
    this.formData2.append('AttachFile', selectedFile, selectedFile.name);

    // this.uploadFile.uploadSingleFile(formData).subscribe((img: any) => {
    //   this.imageUrl = img[0].file_Path;
    //   this.changeImageUrl.emit(img[0].file_Path);
    //   this.loadingButton = false;
    // });
    // } else if (event == 'delete') {
    //   this.imageUrl = '';
    //   this.changeImageUrl.emit(this.defaultImageUrl());
    //   this.loadingButton = false;
    // }
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
    // this.formData2.append('AttachFile', this.ListFiles , this.ListFiles.name);

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
  AddAttach() {
    const formData = new FormData();

    formData.append('AttachFile', this.ListFiles, this.ListFiles.name);
    this.subscriptions.push(
      this._adminservices.AddAttach(this.param, this.desk, formData).subscribe(
        (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res['message'],
          });
          this.display1 = 'none';
          this.urls = null;
          this.ListFiles = null;
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
  exportAsPDF(divId: any, name: any) {
    let data = document.getElementById(divId)!;
    html2canvas(data, { useCORS: true }).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/jpeg'); // 'image/jpeg' for lower quality output.
      let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save(`${{ name }}.pdf`);
    });
  }
  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++)
      this.subscriptions[i].unsubscribe();
  }
}
