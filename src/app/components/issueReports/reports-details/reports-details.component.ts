import { Component, ViewEncapsulation } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OnwerService } from 'src/app/_services/Onwers/onwer.service';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-reports-details',
  templateUrl: './reports-details.component.html',
  styleUrls: ['./reports-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReportsDetailsComponent {
  paramid: any;
  Apointment: any;
  display1: any;
  appointement: any = [];
  subscriptions: Subscription[] = [];

  constructor(
    private viewportScroller: ViewportScroller,
    private uploadService: UploadFileService,

    private messageService: MessageService,
    public router: Router,
    public _adminservices: AdminsService,
    public _ActivatedRoute: ActivatedRoute
  ) {
    this.paramid = _ActivatedRoute.snapshot.paramMap.get('id');
  }
  showSide: string = '';

  value: string = '';
  cities: Array<object> = [];
  selectedCity: Object = {};
  available: boolean = true;
  link: Array<boolean> = [true];
  param: any;
  listAnchors: any = [
    { id: 'Generalinfo', link: 'General info' },
    { id: 'OtherDetails', link: 'Other Details' },
    { id: 'Documentdetails', link: 'Document details' },
    { id: 'Rentalhistory', link: 'Rental history' },
    { id: 'userinformation', link: 'user information' },
  ];

  ngOnInit() {
    this.initCities();
    this.GetIssueByid();
    this.checkRole();
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
  gotopage2() {
    let url: string = 'Issue_Reports';
    this.router.navigateByUrl(url);
  }
  detialIssue: any = {};
  GetIssueByid() {
    this.subscriptions.push(
      this._adminservices.GetIssueDetails(this.paramid).subscribe(
        (res) => {
          this.detialIssue = res;
          this.appointement = res.appointement;
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
      )
    );
  }
  UpdateIssue() {
    this.subscriptions.push(
      this._adminservices.UpdateIssue(this.paramid, this.detialIssue).subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res['message'],
          });

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
      )
    );
  }

  createissue!: FormGroup;
  issue_Images: Array<any> = [];

  bindCreateworker(): void {
    this.createissue = new FormGroup({
      issue_ID: new FormControl('', [Validators.required]),
      issue_Code: new FormControl('', [Validators.required]),
      apt_ID: new FormControl('', [Validators.email, Validators.required]),
      user_ID: new FormControl('', [Validators.required]),

      name_RingBell: new FormControl('', [Validators.required]),
      phone_Number: new FormControl('', [Validators.required]),
      phone_Number2: new FormControl('', [Validators.required]),
      issue_Desc: new FormControl('', [Validators.required]),
      statusString: new FormControl('', [Validators.required]),
      issue_status: new FormControl('', [Validators.required]),
      created_At: new FormControl('', [Validators.required]),
      issue_Appt: new FormControl('', [Validators.required]),
      issue_Images: new FormControl(this.issue_Images, [Validators.required]),
      issue_Cost: new FormControl('', [Validators.required]),
    });
  }
  createissuepost(data: any): void {}
  uploadedFiles: any[] = [];

  onUpload(event: any): void {
    this.uploadedFiles = event.files;
    this.convertFileToFormData(this.uploadedFiles);
    this.subscriptions.push(
      this.uploadService
        .uploadMultiFile(this.convertFileToFormData(this.uploadedFiles))
        .subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${'Images Upload Successfully'}`,
          });

          for (let file of data) {
            this.issue_Images.push({ apt_imgs: file.name });
          }
          this.createissue.get('img_Url')?.patchValue(this.issue_Images);
        })
    );
  }
  convertFileToFormData(files: any[]) {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('Files', files[i], files[i].name);
    }

    return formData;
  }
  // constructor(private viewportScroller: ViewportScroller) {
  //   this.param = window.location.pathname ;
  //   if (this.param == "/Reports_View") this.param = "Reports View"
  //   else if(this.param == "/Edit_Reports_View") this.param = "Edit Reports View"
  //   else this.param = "Report Details"

  // }
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
  onCloseModal1() {
    this.display1 = 'none';
  }
  submitForm(): void {
    this.UpdateIssue();
  }
  handleChange(item: any) {
    this.Apointment = item.appo_Date + item.appo_Time;
  }
  MarkasProgress() {
    this.subscriptions.push(
      this._adminservices
        .MarkasProgress(this.paramid, this.Apointment)
        .subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `${res.message}`,
            });
            this.GetIssueByid();
            this.onCloseModal1();
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
  display22: any = 'none';
  imageSize: any = '';
  openmodel(image: any) {
    this.imageSize = image;
    this.display22 = 'block';
  }
  oncloseModal() {
    this.display22 = 'none';
  }
  display3: any = 'none';
  openmodel3() {
    this.display3 = 'block';
  }
  Apointment3: any;
  onCloseModal3() {
    this.display3 = 'none';
    this.Apointment3 = '';
  }
  OpenModal1(id: any) {
    this.Apointment = [];
    this.paramid = id;

    this.GetIssueByid();
    this.display1 = 'block';
  }
  MarkasProgress2() {
    this.subscriptions.push(
      this._adminservices
        .NewAppointment(this.paramid, this.Apointment3.toLocaleString())
        .subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res['message'],
            });
            this.GetIssueByid();
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
  routeToMessage(obj: any) {
    if (obj.chat_ID)
      this.router.navigate([`/messages/message-tiket/${obj.chat_ID}`]);
    else {
      this.subscriptions.push(
        this._adminservices
          .StartNewIssueChat(obj.user_ID, obj.issue_ID)
          .subscribe({
            next: (data: any) => {
              let chatID = data.uuid;
              this.router.navigate([`/messages/message-tiket/${chatID}`]);
            },
            error: (err: any) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'error',
              });
            },
          })
      );
    }
  }
  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++)
      this.subscriptions[i].unsubscribe();
  }
}
