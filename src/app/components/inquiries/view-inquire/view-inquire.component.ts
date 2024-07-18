import { Component, OnInit,  ViewChild , ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import saveAs from 'file-saver';
import { MenuItem, MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { InquiresService } from 'src/app/_services/inquires/inquires.service';
import { Guid } from 'guid-typescript';

import { ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-view-inquire',
  templateUrl: './view-inquire.component.html',
  styleUrls: ['./view-inquire.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ViewInquireComponent implements OnInit {
  @ViewChild('confirmPopup') confirmPopup: ElementRef;

  home: MenuItem | undefined;
  gfg: MenuItem[] | undefined;
  showPassportModal: any;
  subscriptions:Subscription[] = [];

  rejectReason: string = '';
  showRejectReasonDialog: boolean = false;
  currentAction: string = '';
  showConfirmDialog: boolean = false;

  rejectReasonP: string = '';
  showRejectReasonDialogP: boolean = false;
  currentActionP: string = '';
  showConfirmDialogP: boolean = false;

  rejectReasonS: string = '';
  showRejectReasonDialogS: boolean = false;
  currentActionS: string = '';
  showConfirmDialogS: boolean = false;

  reqId: string = '';



  param: string;

  currentImage: string;
  currentIndex: number = 0;
  constructor(
    private _inquiresService: InquiresService,
    private _ActivatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public router: Router
  ) {
    this.param = _ActivatedRoute.snapshot.paramMap.get('id') ?? '';
    console.log(this.param);
  }

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: ['/dashboard'] };
    this.gfg = [
      {
        label: 'Inquiries',
        routerLink: ['/inquiries'],
      },
      {
        label: 'View Inquiry Details',
      },
    ];
    /* this.gfg?.push({ label: 'Inquiries', routerLink: ['/inquiries'] });
    this.gfg?.push({ label: 'View Inquiry Details' }); */

    this.GetRequestDetails();
    this.currentImage = this.inquire_details.apartment_Pictures[0].includes('https') ? this.inquire_details.apartment_Pictures[0] : '../../../assets/images/apartmentImages/default_apartment.jpg';
    this.checkRole();
  }


  /****888888888 */

  get displayedThumbnails() {
    return this.inquire_details.apartment_Pictures.slice(this.currentIndex, this.currentIndex + 5);
  }

  changeMainImage(img: string) {
    this.currentImage = img.includes('https') ? img : '../../../assets/images/apartmentImages/default_apartment.jpg';
  }

  next() {
    if (this.currentIndex + 5 < this.inquire_details.apartment_Pictures.length) {
      this.currentIndex += 1;
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
  }


  showConfirm(action: string) {
    this.currentAction = action;
    if (action === 'confirm') {
      this.showConfirmDialog = true;
    } else if (action === 'reject') {
      this.showRejectReasonDialog = true;
    }
  }
  passID:any;
  showConfirmPass(action: string,passID:any) {
    this.currentActionP = action;
    if (action === 'confirm') {
      this.showConfirmDialogP = true;
      this.passID=passID;
    } else if (action === 'reject') {
      this.showRejectReasonDialogP = true;
      this.passID=passID;
    }
  }
  showConfirmSelfi(action: string) {
    this.currentActionS = action;
    if (action === 'confirm') {
      this.showConfirmDialogS = true;
    } else if (action === 'reject') {
      this.showRejectReasonDialogS = true;
    }
  }

  // confirmApproval() {

  //   console.log('Approval confirmed');
  //   this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Approval confirmed' });
  //   this.showConfirmDialog = false;
  // }


  confirmApproval() {
    this._inquiresService.requestApproval(this.reqId, true).subscribe(
      response => {
        console.log('Approval confirmed', response);
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Approval confirmed' });
        this.showConfirmDialog = false;
      },
      error => {
        console.error('Error confirming approval', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Approval confirmation failed' });
      }
    );
  }

  // rejectApproval() {

  //   console.log('Approval rejected with reason:', this.rejectReason);
  //   this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: `Approval rejected with reason: ${this.rejectReason}` });
  //   console.log(this.rejectReason)
  //   this.showRejectReasonDialog = false;
  // }


  rejectApproval() {
    this._inquiresService.requestApproval(this.reqId, false, this.rejectReason).subscribe(
      response => {
        console.log('Approval rejected with reason:', this.rejectReason, response);
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: `Approval rejected with reason: ${this.rejectReason}` });
        this.showRejectReasonDialog = false;
      },
      error => {
        console.error('Error rejecting approval', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Approval rejection failed' });
      }
    );
  }

  onCloseRejectDialog() {
    this.showRejectReasonDialog = false;
  }

  onCloseConfirmDialog() {
    this.showConfirmDialog = false;
  }
 /****888888888 */


 handleAction(reqId:any,isValid: boolean, id:string) {
  let rejectReason = '';
  if (!isValid) {
    rejectReason = this.rejectReasonP;
  }
  console.log(id);

  this._inquiresService.validatePassport(reqId, id, isValid, rejectReason).subscribe(
    response => {
      if (isValid) {
        console.log('Approval confirmed', response);
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Approval confirmed' });
        this.showConfirmDialogP = false;
      } else {
        console.log('Approval rejected with reason:', this.rejectReasonP, response);
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: `Approval rejected with reason: ${this.rejectReasonP}` });
        this.showRejectReasonDialogP = false;
      }
    },
    error => {
      console.error('Error processing request', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Request failed' });
    }
  );
}


handleActionSelfi(isApproved: boolean, bookingId: string, guestId: string) {
  let rejectReason = '';
  if (!isApproved) {
    rejectReason = this.rejectReasonS;
  }

  this._inquiresService.validateSelfie(bookingId, guestId, isApproved, rejectReason).subscribe(
    response => {
      if (isApproved) {
        console.log('Selfie approval confirmed', response);
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Selfie approval confirmed' });
        this.showConfirmDialogS = false;
      } else {
        console.log('Selfie approval rejected with reason:', this.rejectReasonS, response);
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: `Selfie approval rejected with reason: ${this.rejectReasonS}` });
        this.showRejectReasonDialogS = false;
      }
    },
    error => {
      console.error('Error processing request', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Request failed' });
    }
  );
}


 /**888888888 */
 displayQr: any;
  qrCodeImg!: string;
  qrCode: string;
  roomType: string;
  aprtCode: string;
 onOpenQrModal(imgLink: string, qrCode: string, roomType: string) {
  this.qrCodeImg = imgLink;
  this.displayQr = 'block';
  this.qrCode = qrCode;
  this.roomType = roomType.substring(0, 1);
  // this.aprtCode = apartCode;
}

onCloseQrModal() {
  this.qrCodeImg = '';
  this.displayQr = 'none';
}
/**88888888 */



  isAccordionOpen: boolean = false;

  toggleContent(): void {
    const detailsContent = document.getElementById("details-content");
    const bookingProcess = document.getElementById("booking-process");
    const moreDetails = document.getElementById("more-details");

    if (detailsContent && bookingProcess && moreDetails) {
      if (detailsContent.style.display === "none") {
        detailsContent.style.display = "block";
        bookingProcess.style.display = "block";
        moreDetails.style.display = "block";
      } else {
        detailsContent.style.display = "none";
        bookingProcess.style.display = "none";
        moreDetails.style.display = "none";
      }
    }
  }
  isContentVisible:any;
  toggleContentpass(): void {
    this.isContentVisible = !this.isContentVisible;
  }

  isDepositVisible:any;
  toggleContentdeposit(): void {
    this.isDepositVisible = !this.isDepositVisible;
  }

  isContractVisible:any;
  toggleContentContract(): void {
    this.isContractVisible = !this.isContractVisible;
  }
  isArriveVisible:any;
  toggleContentArrive(): void {
    this.isArriveVisible = !this.isArriveVisible;
  }
  isCheckinVisible:any;
  toggleContentCheckin(): void {
    this.isCheckinVisible = !this.isCheckinVisible;
  }
  isinsideCheckinVisible:any;
  toggleContentinsideCheckin(): void {
    this.isinsideCheckinVisible= !this. isinsideCheckinVisible;
  }
  isidentityVisible:any;
  toggleContentidentity(): void {
    this.isidentityVisible= !this.isidentityVisible;
  }

  isPaymentsVisible:any;
  toggleContentPayments(): void {
    this.isPaymentsVisible= !this.isPaymentsVisible;
  }
  isHandoverVisible:any;
  toggleContentHandover(): void {
    this.isHandoverVisible= !this.isHandoverVisible;
  }
  isRulesVisible:any;
  toggleContentRules(): void {
    this.isRulesVisible= !this.isRulesVisible;
  }



  inquiresRole: any;
  is_Super: any;
  checkRole() {
    const data = localStorage.getItem('user');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.is_Super = parsedData.is_Super;
      if (parsedData.is_Super == false) {
        for (let i = 0; i < parsedData.permissions.length; i++) {
          if (parsedData.permissions[i].page_Name == 'Inquiries') {
            this.inquiresRole = parsedData.permissions[i];
          }
        }
        if (this.inquiresRole.p_View == false && this.is_Super == false) {
          this.gotopage();
        }
      }
    }
  }
  gotopage() {
    let url: string = 'unlegal';
    this.router.navigateByUrl(url);
  }
  inquire_details: any;
  showSide: string = '';
  value: any;
  contract_Main: any;
  Reason: any = '';
  Reason2: any = '';
  prop_imgs: any;
  hidepassport: boolean = false;
  display1 = 'none';
  addItem(value: string): void {
    this.showSide = value;
  }
  bookingPrice :number=0;
  GetRequestDetails() {

    this.subscriptions.push(this._inquiresService.GetRequestDetails(this.param).subscribe(
      (res) => {

        console.log(`booking details response :`,res);
        // console.log(res.booking_ID);
        // this.inquire_details = res[0];
        // this.selectedContractImg = res[0].contract_Path;
        // this.prop_imgs = res[0].apt_Imgs;
        // this.hidepassport = res[0].paid;

        this.reqId=res.booking_ID ||'';
        // this.passportId=res.booking_Beds.guest_Passport.
        this.inquire_details = res;
        this.currentImage = this.inquire_details.apartment_Pictures[0].includes('https') ? this.inquire_details.apartment_Pictures[0] : '../../../assets/images/apartmentImages/default_apartment.jpg';
        this.selectedContractImg = res.apartment_Pictures[0];
        this.prop_imgs = res.apartment_Pictures;
        this.hidepassport = res.booking_Beds[0]?.guest_Passport?.passport_Approved;
        this.value = res.apartment_Rating;
        for(let i=0; i< res.booking_Beds.length ; i++){
            this.bookingPrice += res?.booking_Beds[i]?.bed_Price;

        }



      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    ))

  }


  UploadReqContract() {
    this.subscriptions.push(this._inquiresService
      .UploadReqContract(this.param, this.convertFileToFormData(this.ListFiles))
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res['message'],
          });
          this.display1 = 'none';
          this.GetRequestDetails();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message[0],
          });
        }
      ))

  }
  CreateContractPDF() {
    let ID = Guid.create();
    let FileName = ID + '.pdf';
    this.subscriptions.push(  this._inquiresService
      .CreateContractPDF(this.param)
      .subscribe((data) => saveAs(data, FileName)))

  }

  selectedContractImg: any;
  OwnerDtail: any;
  onCloseModal1() {
    this.display1 = 'none';
  }
  onCloseModal2() {
    this.display2 = 'none';
  }
  display2 = 'none';
  itemPass: any;
  onOpenModal1(item: any) {
    this.Reason = '';
    this.itemPass = item;
    this.display1 = 'block';
  }
  onOpenModal2() {
    this.Reason2 = '';
    this.display2 = 'block';
  }
  ResignContract() {
    this.subscriptions.push(    this._inquiresService.ResginContract(this.param).subscribe(
      (res) => {
        this.messageService.add({
          severity: res['status'] == 'Success' ? 'success' : 'error',
          summary: res['status'],
          detail: res['message'],
        });
      },
      (error) => {
      }
    ))

  }
  NewPassportsNotValidation() {
    this.subscriptions.push(  this._inquiresService
      .NewPassportsNotValidation(this.itemPass.uuid, false, this.Reason)
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          this.display1 = 'none';
          this.GetRequestDetails();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message[0],
          });
        }
      ))

  }
  NewPassportsValidation(item: any) {
    this.subscriptions.push(    this._inquiresService.NewPassportsValidation(item.uuid, true).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
        this.GetRequestDetails();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message[0],
        });
      }
    ))

  }
  CancelRequest() {
    this.subscriptions.push(this._inquiresService.CancelRequestw(this.param, this.Reason2).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'The Request has Cancelled Successfully',
        });
        this.display2 = 'none';
        this.GetRequestDetails();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'error',
        });
      }
    ))

  }
  isvisable = false;
  ApproveRequest() {
    this.subscriptions.push(    this._inquiresService.ApproveRequest(this.param).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'The Request has Approved Successfully',
        });
        this.isvisable = true;
        this.GetRequestDetails();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${error.error['message']}`,
        });
      }
    ))

  }
  viewImage(image: any) {
    this.inquire_details['apt_thumb_Img'] = image;
  }
  selectedFiles?: FileList;
  currentFile?: File;
  imageList: any = [];
  progress = 0;
  message = '';
  preview = '';
  imageInfos?: any = [];
  chooseFile(files: any) {
    this.imageList.push(files[0]);
  }
  urls = new Array<string>();
  counter = 0;
  selectFile(event: any): void {
    this.ListFiles = null;
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    let files = event.target.files;

    if (files) {
      this.selectedContractImg = files;

      for (let file of files) {
        this.ListFiles = file;
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
    this.UploadReqContract();
  }
  convertFileToFormData(files: any) {
    const formData = new FormData();

    formData.append('Contract', files, files.name);

    return formData;
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

  ListFiles: any = [];
  showPassport() {
    this.showPassportModal = true; // Show-Hide Modal Check
  }
  //Bootstrap Modal Close event
  hidePassport() {
    this.showPassportModal = false;
  }

  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }
















}
