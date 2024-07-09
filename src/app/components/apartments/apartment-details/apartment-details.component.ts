import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApartmentService } from '../../../_services/apartments/apartment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnwerService } from 'src/app/_services/Onwers/onwer.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { Guid } from 'guid-typescript';
import { Reviews } from 'src/app/models/reviews';
import { Subscription } from 'rxjs';

interface ApartmentDetails {
  // apt_ThumbImg?: string;
  apt_Lat?: number;
  apt_Long?: number;
  [key: string]: any;
}

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApartmentDetailsComponent implements OnInit {
  showSide: string = '';
  value: number = 3;
  RentedSuccessfully: boolean = false;
  markAvailable: boolean = false;
  aprt_details: ApartmentDetails = {};
  aprt_Imgs: string[] = [];
  apt_UUID: any;
  subscriptions: Subscription[] = [];
  displayQr: any;
  qrCodeImg!: string;
  qrCode:string;
  aprt: any = {};
  apartmentsEquipment: any = {};
  apartmentsContract: any = {};
  apartmentsCheckRules: any = {};
  roomsBedRoom: any[] = [];
  roomsLiving: any[] = [];
  ApartmentsRole: any;
  is_Super: any;
  isAccordionOpen: boolean = false;
  isContentVisible: any;
  isDepositVisible: any;
  isContractVisible: any;
  isArriveVisible: any;
  isCheckinVisible: any;
  isinsideCheckinVisible: any;
  isidentityVisible: any;
  isPaymentsVisible: any;
  isHandoverVisible: any;
  isRulesVisible: any;
  trasponrts: any[] = [];
  rent_Rules: any;
  features: any;
  facilities: any;
  contract_Main: any;
  bath_Room: any;
  backup_Info: any;
  kitchen_Tools: any[] = [];
  AllReviews: Reviews[] = [];
  tenant: any = {};
  request_code: any;
  rating_total: any;
  rating_count: any;
  owner_contract_file_name: any;
  tenant_contract_file_name: any;
  center: any = {};
  display22: any = 'none';
  imageSize: string = '';

  constructor(
    public _ApartmentService: ApartmentService,
    public _ActivatedRoute: ActivatedRoute,
    private messageService: MessageService,
    public _OnwerService: OnwerService,
    private sanitizer: DomSanitizer,
    public router: Router
  ) {
    this.apt_UUID = _ActivatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getApartmentDetails();
    this.GetApartmentReview();
    this.scrollTop();
    this.checkRole();
  }

  getApartmentDetails() {
    this.subscriptions.push(
      this._ApartmentService.getApartDetail(this.apt_UUID).subscribe(
        (res) => {
          console.log('API response:', res);

          this.aprt = res.apartment_Basic_Info || {};
          this.aprt_details = this.aprt || {};
          this.aprt_Imgs = this.aprt.apartment_Images || [];
          this.trasponrts = this.aprt.apartment_Transports || [];
          this.rent_Rules = res.apartment_Check_Rules?.apt_rules || [];
          this.features = res.apartment_Equipments?.apartment_Features || [];
          this.facilities = res.apartment_Equipments?.apartment_Facilites || [];
          this.contract_Main = res.apartment_Contract || {};
          this.bath_Room = res.apartment_Equipments?.bathroom_Details || [];
          this.backup_Info = res.apartment_Backup_Info || {};
          this.owner_contract_file_name = res.file_Name;
          this.tenant_contract_file_name = res.tenant?.file_Name || '';
          this.center = {
            lat: this.aprt.apartment_Lat || 0,
            lng: this.aprt.apartment_Long || 0,
          };
          this.kitchen_Tools = res.apartment_Equipments?.kitchen_Details || [];
          this.tenant = res.tenant || {};
          this.rating_total = res.rating_Total;
          this.rating_count = res.rating_Count;
          this.request_code = res.request_Code;
          this.transform(this.aprt.apartment_VideoLink || '');

          this.apartmentsEquipment = res.apartment_Equipments || {};
          this.apartmentsContract = res.apartment_Contract || {};
          this.apartmentsCheckRules = res.apartment_Check_Rules || {};

          console.log('Apartment details:', this.aprt);
          console.log( this.aprt_details);

          console.log('Apartment equipment:', this.apartmentsEquipment);
          console.log('Apartment contract:', this.apartmentsContract);
          console.log('Apartment check rules:', this.apartmentsCheckRules);

          if (Array.isArray(this.aprt.apartment_Rooms)) {
            for (let i = 0; i < this.aprt.apartment_Rooms.length; i++) {
              if (this.aprt.apartment_Rooms[i].room_Type === 'Bedroom') {
                this.roomsBedRoom.push(this.aprt.apartment_Rooms[i]);
              } else {
                this.roomsLiving.push(this.aprt.apartment_Rooms[i]);
              }
            }
          } else {
            console.warn('apartment_Rooms is not an array:', this.aprt.apartment_Rooms);
          }

          console.log('Bedrooms:', this.roomsBedRoom);
          console.log('Living rooms:', this.roomsLiving);
        },
        (error) => {
          console.error('Error fetching apartment details:', error);
        }
      )
    );
  }

  GetApartmentReview() {
    this.subscriptions.push(
      this._ApartmentService.GetApartmentReview(this.apt_UUID).subscribe(
        (res) => {
          this.AllReviews = res;
        },
        (error) => {
          console.error('Error fetching apartment reviews:', error);
        }
      )
    );
  }

  onOpenQrModal(imgLink: string, qrCode:string) {
    this.qrCodeImg = imgLink;
    this.displayQr = 'block';
    this.qrCode=qrCode;
  }

  onCloseQrModal() {
    this.qrCodeImg = '';
    this.displayQr = 'none';
  }

  checkRole() {
    const data = localStorage.getItem('user');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.is_Super = parsedData.is_Super;
      if (parsedData.is_Super === false) {
        for (let i = 0; i < parsedData.permissions.length; i++) {
          if (parsedData.permissions[i].page_Name === 'Apartments') {
            this.ApartmentsRole = parsedData.permissions[i];
          }
        }
        if (this.ApartmentsRole.p_View === false && this.is_Super === false) {
          this.gotopage();
        }
      }
    }
  }

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

  toggleContentpass(): void {
    this.isContentVisible = !this.isContentVisible;
  }

  toggleContentdeposit(): void {
    this.isDepositVisible = !this.isDepositVisible;
  }

  toggleContentContract(): void {
    this.isContractVisible = !this.isContractVisible;
  }

  toggleContentArrive(): void {
    this.isArriveVisible = !this.isArriveVisible;
  }

  toggleContentCheckin(): void {
    this.isCheckinVisible = !this.isCheckinVisible;
  }

  toggleContentinsideCheckin(): void {
    this.isinsideCheckinVisible = !this.isinsideCheckinVisible;
  }

  toggleContentidentity(): void {
    this.isidentityVisible = !this.isidentityVisible;
  }

  toggleContentPayments(): void {
    this.isPaymentsVisible = !this.isPaymentsVisible;
  }

  toggleContentHandover(): void {
    this.isHandoverVisible = !this.isHandoverVisible;
  }

  toggleContentRules(): void {
    this.isRulesVisible = !this.isRulesVisible;
  }

  gotopage() {
    let url: string = 'unlegal';
    this.router.navigateByUrl(url);
  }

  transform(videoURL: string) {
    let srclink = videoURL;
    if (srclink?.startsWith('https://www.youtube.com/watch?v=')) {
      let embedlink = srclink?.replace('watch?v=', 'embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedlink);
    } else if (srclink?.startsWith('https://youtu.be')) {
      let embedlink = srclink?.replace('https://youtu.be', 'https://www.youtube.com/embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedlink);
    } else {
      return this.sanitizer.bypassSecurityTrustResourceUrl(srclink);
    }
  }

  transform2(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  addItem(value: any) {
    this.showSide = value;
  }

  scrollTop(): void {
    window.scrollTo(0, 0);
  }

  viewImage(image: any) {
    if (this.aprt_details) {
      this.aprt_details['apt_ThumbImg'] = image;
    }
  }

  viewimageinModel(image: any) {
    this.display22 = 'block';
    this.imageSize = image;
  }

  oncloseModal() {
    this.display22 = 'none';
  }

  DownloadFile(path: any) {
    this.subscriptions.push(
      this._ApartmentService.DownloadFile(path).subscribe(
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
            detail: `${error.message}`,
          });
        }
      )
    );
  }

  MarkRented() {
    this.subscriptions.push(
      this._ApartmentService.MarkRented(this.apt_UUID).subscribe(
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
            detail: `${error.message}`,
          });
        }
      )
    );
  }

  MarkAvaliablePublish() {
    this.subscriptions.push(
      this._ApartmentService.MarkAvaliablePublish(this.apt_UUID).subscribe(
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
            detail: `${error.message}`,
          });
        }
      )
    );
  }

  ApproveReview(id: string, approval: boolean) {
    this.subscriptions.push(
      this._ApartmentService.ApproveReview(id, approval).subscribe(
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
            detail: `${error.message}`,
          });
        }
      )
    );
  }

  MarkDraft() {
    this.subscriptions.push(
      this._ApartmentService.MarkDraft(this.apt_UUID).subscribe(
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
            detail: `${error.message}`,
          });
        }
      )
    );
  }

  downloadImage(url: any) {
    fetch(url, {
      mode: 'no-cors',
    })
      .then((response) => response.blob())
      .then((blob) => {
        let blobUrl = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.download = url.replace(/^.*[\\\/]/, '');
        a.href = blobUrl;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }

  DownloadProfilePic(downloadLink: any) {
    FileSaver.saveAs(downloadLink, 'image.jpg');
  }

  downloadImage2(downloadLink: any) {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(downloadLink);
    a.download = 'cc';
    document.body.appendChild(a);
    a.click();
  }

  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++) this.subscriptions[i].unsubscribe();
  }
}
