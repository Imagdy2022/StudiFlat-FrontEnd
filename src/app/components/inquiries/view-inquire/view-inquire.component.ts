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
  bookingId: number;
  booking: any;

  isConfirmDisabled = false;
  isRejectDisabled = false;
  // isConfirmDisabledp = false;
  isRejectDisabledp = false;
  isConfirmDisableds = false;
  isRejectDisableds = false;

  beds: any[] = [];
  status: { [key: number]: 'loading' | 'pending' | 'approved' | 'rejected' } = {};
  statusSelfi: { [key: number]: 'loading' | 'pending' | 'approved' | 'rejected' } = {};

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
    this.fetchPassportStatuses();
    // this.loadButtonState();
    // this.loadButtonStatesPass();



  }


  /****888888888 */

  // acceptBooking() {
  //   this.setButtonState(true);
  // }

  // rejectBooking() {
  //   this.setButtonState(true);
  // }

  // setButtonState(state: boolean) {
  //   localStorage.setItem(`booking-${this.bookingId}`, JSON.stringify(state));
  // }

  // isDisabled(): boolean {
  //   return JSON.parse(localStorage.getItem(`booking-${this.bookingId}`) || 'false');
  // }

  // loadButtonState() {
  //   if (!localStorage.getItem(`booking-${this.bookingId}`)) {
  //     this.setButtonState(false);
  //   }
  // }
  // acceptBooking() {
  //   this.setButtonState('accept', true);

  // }

  // rejectBooking() {
  //   this.setButtonState('reject', true);

  // }

  setButtonState(action: string, state: boolean) {
    localStorage.setItem(`booking-${this.bookingId}-${action}`, JSON.stringify(state));
  }
  // statusfb:boolean=false;
  // isAcceptDisabled(status:string,statusfb:boolean): boolean {
  //    if (status==="Approved"||statusfb===true){

  //     return true;
  //    }else{

  //     return false;

  //    }

  // }

  isAcceptDisabled(status:string ): boolean {
    if (status==="Approved" ){
    //  this.inquire_details.booking_Status='Rejected';
     return true;
    }else{

     return false;

    }

 }

  isRejectDisabledd(status:string): boolean {
    if (status==="Approved"){
      return false;
     }else{
      return true;
     }
    // return JSON.parse(localStorage.getItem(`booking-${this.bookingId}-reject`) || 'false');
  }

  loadButtonState() {
    if (!localStorage.getItem(`booking-${this.bookingId}-accept`)) {
      this.setButtonState('accept', false);
    }
    if (!localStorage.getItem(`booking-${this.bookingId}-reject`)) {
      this.setButtonState('reject', false);
    }
  }


  /**passport accept or reject */

// acceptPassport(bedId: any, tenantId: any) {
//   this.setButtonStatePass(bedId, tenantId, 'accept', true);

// }

rejectPassport(bedId: any, tenantId: any) {
  this.setButtonStatePass(bedId, tenantId, 'reject', true);

}

setButtonStatePass(bedId: number, tenantId: number, action: string, state: boolean) {
  localStorage.setItem(`booking-${this.bookingId}-bed-${bedId}-tenant-${tenantId}-${action}`, JSON.stringify(state));
}
// statusfp:boolean=false;
// isAcceptDisabledPass(status:boolean,statusfp:boolean): boolean {
//   if (status===true||statusfp===true){
//     return true;
//    }else{
//     return false;
//    }

// }
isAcceptDisabledPass(status:boolean): boolean {
  if (status===true ){
    return true;
   }else{
    return false;
   }

}

isRejectDisabledPass(status:boolean): boolean {
  if (status===true){
    return false;
   }else{
    return true;
   }
  // return JSON.parse(localStorage.getItem(`booking-${this.bookingId}-bed-${bedId}-tenant-${tenantId}-reject`) || 'false');
}
// statusfs:boolean=false;
// isAcceptDisabledSelfi(status:string,statusfs:boolean): boolean {
//   if (status==="Completed"||statusfs===true){
//     return true;
//    }else{
//     return false;
//    }

// }
isAcceptDisabledSelfi(status:string ): boolean {
  if (status==="Completed" ){
    return true;
   }else{
    return false;
   }

}

isRejectDisabledSelfi(status:string): boolean {
  if (status==="Completed"){
    return false;
   }else{
    return true;
   }
  // return JSON.parse(localStorage.getItem(`booking-${this.bookingId}-bed-${bedId}-tenant-${tenantId}-reject`) || 'false');
}

loadButtonStatesPass() {
  this.beds.forEach(bed => {

      if (!localStorage.getItem(`booking-${this.bookingId}-bed-${bed.bed_ID}-tenantPass-${bed.guest_Passport?.passport_ID}-accept`)) {
        this.setButtonStatePass(bed.bed_ID, bed.guest_Passport?.passport_ID, 'accept', false);
      }
      if (!localStorage.getItem(`booking-${this.bookingId}-bed-${bed.bed_ID}-tenantPass-${bed.guest_Passport?.passport_ID}-reject`)) {
        this.setButtonStatePass(bed.bed_ID, bed.guest_Passport?.passport_ID, 'reject', false);
      }

  });
}
  /**passport accept or reject */


  // saveButtonState() {
  //   localStorage.setItem('isConfirmDisabled', JSON.stringify(this.isConfirmDisabled));
  //   localStorage.setItem('isRejectDisabled', JSON.stringify(this.isRejectDisabled));
  //   localStorage.setItem('isConfirmDisabledp', JSON.stringify(this.isConfirmDisabledp));
  //   localStorage.setItem('isRejectDisabledp', JSON.stringify(this.isRejectDisabledp));
  //   localStorage.setItem('isConfirmDisableds', JSON.stringify(this.isConfirmDisableds));
  //   localStorage.setItem('isRejectDisableds', JSON.stringify(this.isRejectDisableds));
  // }

  // loadButtonState() {
  //   const confirmState = localStorage.getItem('isConfirmDisabled');
  //   const rejectState = localStorage.getItem('isRejectDisabled');
  //   const confirmStatep = localStorage.getItem('isConfirmDisabledp');
  //   const rejectStatep = localStorage.getItem('isRejectDisabledp');
  //   const confirmStates = localStorage.getItem('isConfirmDisableds');
  //   const rejectStates = localStorage.getItem('isRejectDisableds');

  //   if (confirmState !== null) {
  //     this.isConfirmDisabled = JSON.parse(confirmState);
  //   }

  //   if (rejectState !== null) {
  //     this.isRejectDisabled = JSON.parse(rejectState);
  //   }

  //   if (confirmStatep !== null) {
  //     this.isConfirmDisabledp = JSON.parse(confirmStatep);
  //   }

  //   if (rejectStatep !== null) {
  //     this.isRejectDisabledp = JSON.parse(rejectStatep);
  //   }

  //   if (confirmStates !== null) {
  //     this.isConfirmDisableds = JSON.parse(confirmStates);
  //   }

  //   if (rejectStates !== null) {
  //     this.isRejectDisableds = JSON.parse(rejectStates);
  //   }
  // }

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
  bedId:any;
  index:any
  showConfirmPass(action: string,passID:any,bedId:any,index:any) {
    this.currentActionP = action;
    if (action === 'confirm') {
      this.showConfirmDialogP = true;
      this.passID=passID;
      this.bedId=bedId;
      this.index=index;
    } else if (action === 'reject') {
      this.showRejectReasonDialogP = true;
      this.passID=passID;
      this.bedId=bedId;
      this.index=index;
    }
  }
  indexselfi:any;
  showConfirmSelfi(action: string,indexselfi:any) {
    this.currentActionS = action;
    this.indexselfi=indexselfi;
    if (action === 'confirm') {
      this.showConfirmDialogS = true;
    } else if (action === 'reject') {
      this.showRejectReasonDialogS = true;
    }
  }

  // confirmApproval() {

  //   this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Approval confirmed' });
  //   this.showConfirmDialog = false;
  // }


  confirmApproval() {
    this._inquiresService.requestApproval(this.reqId, true).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Approval confirmed' });
        this.showConfirmDialog = false;

        this.isConfirmDisabled = true;

        // this.saveButtonState();
      // this.acceptBooking()
      // this.statusfb=true;

        this.inquire_details.booking_Status='Approved';



      },
      error => {
        console.error('Error confirming approval', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Approval confirmation failed' });
      }
    );
  }

  // rejectApproval() {

  //   this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: `Approval rejected with reason: ${this.rejectReason}` });
  //   this.showRejectReasonDialog = false;
  // }


  rejectApproval() {
    this._inquiresService.requestApproval(this.reqId, false, this.rejectReason).subscribe(
      response => {
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: `Approval rejected with reason: ${this.rejectReason}` });
        this.showRejectReasonDialog = false;

        this.isRejectDisabled = true;
        // this.saveButtonState();
        // this.rejectBooking();
        // this.statusfb=false;
        this.inquire_details.booking_Status='Rejected';
      },
      error => {
        console.error('Error rejecting approval', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Approval rejection failed' });
      }
    );
  }

  onCloseRejectDialog() {
    this.showRejectReasonDialog = false;
    this.showRejectReasonDialogP = false;
    this.showRejectReasonDialogS = false;
  }

  onCloseConfirmDialog() {
    this.showConfirmDialog = false;
    this.showConfirmDialogP = false;
    this.showConfirmDialogS = false;
  }
 /****888888888 */
fixdisable:any;

 handleAction(reqId:any,isValid: boolean, id:string,bedId:any,index:any) {
  console.log(index)
  let rejectReason = '';
  if (!isValid) {
    rejectReason = this.rejectReasonP;
  }

  this._inquiresService.validatePassport(reqId, id, isValid, rejectReason).subscribe(
    response => {
      console.log(this.beds[index])
      if (isValid) {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Approval confirmed' });

        this.showConfirmDialogP = false;
        this.inquire_details.booking_Beds[index]['guest_Passport'].status='Approved';

        console.log(this.beds[index].guest_Passport)
        // this.status[bedId] = 'approved';
        // this.passApproved[bedId]=true;
        // this.saveStatus(bedId);
        // console.log(this.passApproved)
        // this.isConfirmDisabledp = true;
        // this.saveButtonState();
      //  this. acceptPassport(bedId, id);

      //  this.fetchPassportStatuses();
      //  this.statusfp=true;
      // this.showConfirmDialog = false;

      // this.isConfirmDisabled = true;


      } else {
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: `Approval rejected with reason: ${this.rejectReasonP}` });

        this.showRejectReasonDialogP = false;
        this.inquire_details.booking_Beds[index]['guest_Passport'].status='Rejected';
        console.log(this.beds[index].guest_Passport.status)
        // this.status[bedId] = 'rejected';
        // this.passApproved[bedId]=false;

        // this.saveStatus(bedId);
        // console.log(this.passApproved)

        // this.isRejectDisabledp = true;
        // this.saveButtonState();
        // this.rejectPassport(bedId, id);
        // this.fetchPassportStatuses();


        // this.statusfp=false;
      }
    },
    error => {
      console.error('Error processing request', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Request failed' });
    }
  );
}


handleActionSelfi(isApproved: boolean, bookingId: string, guestId: any,indexselfi:any) {
  let rejectReason = '';
  if (!isApproved) {
    rejectReason = this.rejectReasonS;
  }

  this._inquiresService.validateSelfie(bookingId, guestId, isApproved, rejectReason).subscribe(
    response => {
      if (isApproved) {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Selfie approval confirmed' });
        this.showConfirmDialogS = false;
       this.isConfirmDisableds = true;
      //  this.saveButtonState();
      this.inquire_details.booking_Beds[indexselfi].check_In_Process.confirm_Identity.status="Completed";
      //  this.statusfs=true;

      //  this.statusSelfi[guestId] = 'approved';

      } else {
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: `Selfie approval rejected with reason: ${this.rejectReasonS}` });
        this.showRejectReasonDialogS = false;
        this.inquire_details.booking_Beds[indexselfi].check_In_Process.confirm_Identity.status="Not Completed";
        this.isRejectDisableds = true;
        // this.saveButtonState();
        // this.showConfirmDialogS = false;
        this.showRejectReasonDialogS = false;
        // this.statusfs=false;
        // this.statusSelfi[guestId] = 'rejected';
      }
    },
    error => {
      console.error('Error processing request', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Request failed' });
    }
  );
}


// resignContract(bookingID: string, signID: string) {
//   this._inquiresService.resignContract(bookingID, signID).subscribe(response => {
//     console.log('Resign contract response:', response);

//   }, error => {
//     console.error('Error re-signing contract:', error);

//   });
// }
resignContract(bookingID: string, signID: string,index:any) {
  this._inquiresService.resignContract(bookingID, signID).subscribe(response => {
    console.log('Resign contract response:', response);
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Contract resigned successfully.' });
    this.inquire_details.booking_Beds[index].contract.status='Not Completed';

  }, error => {
    console.error('Error re-signing contract:', error);
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Request failed.' });

  });
}




 /**888888888 */
 displayQr: any;
  qrCodeImg!: string;
  qrCode: string;
  roomType: string;
  aprtCode: string;
  displaymodal:boolean=false;
 onOpenQrModal(imgLink: string, qrCode: string, roomType: string,apartCode:string) {
  this.qrCodeImg = imgLink;
  this.displayQr = 'block';
  this.qrCode = qrCode;
  this.roomType = roomType.substring(0, 1);
  this.displaymodal=true;
  this.aprtCode = apartCode;
}

onCloseQrModal() {
  this.qrCodeImg = '';
  this.displayQr = 'none';
  this.displaymodal=false;
}


printDiv(divId: string) {
  const printContents = document.getElementById(divId)?.innerHTML;


  if (printContents) {
    const newWindow = window.open('', '_blank', 'height=600,width=800');
    if (newWindow) {
      newWindow.document.write('<html><head> ');
      newWindow.document.write('  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"><style>@media print { body * { visibility: hidden; } #qrToPdf, #qrToPdf * { visibility: visible; } #qrToPdf { position: absolute; left: 0; top: 0 ;bottom:0; width: 100%; height:100% ; page-break-inside: avoid; page-break-before: avoid; page-break-after: avoid; font-size:50px; font-weight:800;  } #qrToPdf img { max-width: 100%; height: 70%; margin-bottom:15px; } }</style>');
      newWindow.document.write('</head><body>');
      newWindow.document.write(`<div id="qrToPdf">${printContents}</div>`);
      newWindow.document.write('</body></html>');
      newWindow.document.close();

      // Wait for the content to load and then print
      newWindow.onload = () => {
        newWindow.focus();
        newWindow.print();
        newWindow.close();
      };
    } else {
      console.error('Failed to open new window');
    }
  } else {
    console.error('Div not found');
  }
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

        // this.inquire_details = res[0];
        // this.selectedContractImg = res[0].contract_Path;
        // this.prop_imgs = res[0].apt_Imgs;
        // this.hidepassport = res[0].paid;

        this.reqId=res.booking_ID ||'';
        this.bookingId=res.booking_ID;
        // this.passportId=res.booking_Beds.guest_Passport.
        this.inquire_details = res;
        this.currentImage = this.inquire_details.apartment_Pictures[0].includes('https') ? this.inquire_details.apartment_Pictures[0] : '../../../assets/images/apartmentImages/default_apartment.jpg';
        this.selectedContractImg = res.apartment_Pictures[0];
        this.prop_imgs = res.apartment_Pictures;
        this.hidepassport = res.booking_Beds[0]?.guest_Passport?.passport_Approved;
        this.value = res.apartment_Rating;
        for(let i=0; i< res.booking_Beds.length ; i++){
            this.bookingPrice += res?.booking_Beds[i]?.bed_Price;
            if(res.booking_Beds[i].guest_Passport?.passport_Photo===null && res.booking_Beds[i].guest_Passport?.passport_Approved===false){
              this.statuspending=true;

          }

        }


        // setTimeout(() => {
        //   this.beds =res.booking_Beds;

        //   this.loadStatuses();
        //   this.fetchPassportStatuses();
        // }, 1000);





      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    ))

  }
  // passApproved: { [key: number]: any } = {};
  // statusapprove:boolean=false;
  // statusreject:boolean=false;
  statuspending:boolean=false;
  // selfiApproved: { [key: number]: any } = {};
  fetchPassportStatuses() {
    this.beds.forEach(bed => {
      // if (this.status[bed.bed_ID] !== 'rejected') {
      //   this.status[bed.bed_ID] = bed.guest_Passport.passport_Approved ? 'approved' : 'pending';
      //   this.passApproved[bed.bed_ID]=bed.guest_Passport.passport_Approved ;
      //   this.saveStatus(bed.bed_ID);
      // }

      // this.passApproved[bed.bed_ID]=bed.guest_Passport.passport_Approved ;

      // this.saveStatus(bed.bed_ID);
      // if(bed.guest_Passport?.passport_Photo===null && bed.guest_Passport?.passport_Approved===false){
      //     this.statuspending=true;
      //     this.statusapprove=false;
      //     this.statusreject=false;
      // }else if(bed.guest_Passport?.passport_Photo!= null && bed.guest_Passport?.passport_Approved===true){
      //   this.statusapprove=true;
      //   this.statuspending=false;
      //   this.statusreject=false;
      // }else if(bed.guest_Passport?.passport_Photo!= null && bed.guest_Passport?.passport_Approved===false){
      //   this.statusreject=true;
      //   this.statuspending=false;
      //   this.statusapprove=false;
      // }
    });
    // console.log(this.passApproved)
  }


  // loadStatuses() {
  //   this.beds.forEach(bed => {
  //     const savedStatus = localStorage.getItem(`passportStatus_${bed.bed_ID}`);
  //     const savedpass = localStorage.getItem(`passbool_${bed.bed_ID}`);
  //     if (savedStatus) {
  //       this.status[bed.bed_ID] = savedStatus as 'pending' | 'approved' | 'rejected';

  //     } else {
  //       this.status[bed.bed_ID] = 'loading';

  //     }
  //     this.passApproved[bed.bed_ID] =savedpass ;
  //   });

  // }

  // saveStatus(bedId: number) {
  //   localStorage.setItem(`passportStatus_${bedId}`, this.status[bedId]);
  //   localStorage.setItem(`passbool_${bedId}`, this.passApproved[bedId]);
  // }


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
