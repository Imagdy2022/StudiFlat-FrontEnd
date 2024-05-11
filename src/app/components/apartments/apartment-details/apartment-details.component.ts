import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApartmentService } from '../../../_services/apartments/apartment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnwerService } from 'src/app/_services/Onwers/onwer.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { Guid } from 'guid-typescript';
import { Reviews } from 'src/app/models/reviews';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApartmentDetailsComponent implements OnInit {
  /** showSide */
  showSide: string = '';
  /** value */
  value: number = 3;
  /** RentedSuccessfully */
  RentedSuccessfully: boolean = false;
  /** markAvailable */
  markAvailable: boolean = false;
  /** aprt_details */
  aprt_details: any;
  /** apt_UUID */
  apt_UUID: any;
  subscriptions: Subscription[] = [];

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
  ApartmentsRole: any;
  is_Super: any;
  checkRole() {
    const data = localStorage.getItem('user');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.is_Super = parsedData.is_Super;
      if (parsedData.is_Super == false) {
        for (let i = 0; i < parsedData.permissions.length; i++) {
          if (parsedData.permissions[i].page_Name == 'Apartments') {
            this.ApartmentsRole = parsedData.permissions[i];
          }
        }
        if (this.ApartmentsRole.p_View == false && this.is_Super == false) {
          this.gotopage();
        }
      }
    }
  }
  gotopage() {
    let url: string = 'unlegal';
    this.router.navigateByUrl(url);
  }
  /**
   * getApartmentDetails
   */
  trasponrts: any = [];
  roomsBedRoom: any = [];
  roomsLiving: any = [];
  roomsLivingTool: any = [];
  roomsBedRoomTool: any = [];
  OwnerDtail: any;
  rent_Rules: any;
  features: any;
  facilities: any;
  contract_Main: any;
  bath_Room: any;
  backup_Info: any;
  kitchen_Tools: any = [];
  AllReviews: Reviews[] = [];
  tenant: any;

  getApartmentDetails() {
    this.subscriptions.push(
      this._ApartmentService.getApartDetail(this.apt_UUID).subscribe((res) => {
        this.subscriptions.push(
          this._OnwerService
            .getOwner(res.general_Info['apt_Owner'])
            .subscribe((res) => {
              this.OwnerDtail = res;
            })
        );
        this.aprt_details = res.general_Info;
        this.trasponrts = res.trasponrts;
        this.rent_Rules = res.rent_Rules;
        this.features = res.features;
        this.facilities = res.facilities;
        this.contract_Main = res.contract_Main;
        this.bath_Room = res.bath_Room;
        this.backup_Info = res.backup_Info;
        this.center = {
          lat: this.aprt_details['apt_Lat'],
          lng: this.aprt_details['apt_Long'],
        };
        this.kitchen_Tools = res.kitchen_Tools;
        this.tenant = res.tenant;
        this.transform(res.general_Info['apt_VideoLink']);
        for (let i = 0; i < res.rooms.length; i++) {
          if (res.rooms[i].room_Type == 'Bedroom') {
            this.roomsBedRoom.push(res.rooms[i]);
          } else {
            this.roomsLiving.push(res.rooms[i]);
          }
        }
      })
    );
  }

  GetApartmentReview() {
    this.subscriptions.push(
      this._ApartmentService
        .GetApartmentReview(this.apt_UUID)
        .subscribe((res) => {
          this.AllReviews = res;
        })
    );
  }
  DownloadTenantContract() {
    let ID = Guid.create();
    let FileName = ID + '.pdf';
    this.subscriptions.push(
      this._ApartmentService
        .CreateContractPDF(this.tenant[0].req_ID)
        .subscribe((data) => saveAs(data, FileName))
    );
  }
  transform(videoURL: string) {
    let srclink = videoURL;

    if (srclink?.startsWith('https://www.youtube.com/watch?v=')) {
      let embedlink = srclink?.replace('watch?v=', 'embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedlink);
    } else if (srclink?.startsWith('https://youtu.be')) {
      let embedlink = srclink?.replace(
        'https://youtu.be',
        'https://www.youtube.com/embed/'
      );
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedlink);
    } else {
      return this.sanitizer.bypassSecurityTrustResourceUrl(srclink);
    }
  }
  transform2(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  /**
   * addItem
   * @param value
   */
  addItem(value: any) {
    this.showSide = value;
  }

  /**
   * scrollTop
   * to make screen scroll to top
   * @return void
   */
  scrollTop(): void {
    window.scrollTo(0, 0);
  }

  display1: any;
  center: any;
  zoom = 10;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display1 = event.latLng.toJSON();
    this.center.lat = this.display1.lat;
    this.center.lng = this.display1.lng;
  }
  imageSize: any;
  viewImage(image: any) {
    this.aprt_details['apt_ThumbImg'] = image;
  }
  viewimageinModel(image: any) {
    this.display22 = 'block';
    this.imageSize = image;
  }
  display22 = 'none';

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
            detail: `${error.message[0]}`,
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
  reviewID: any;
  reviewapproved: any;

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
  // download(){
  //   const a = document.createElement('a');
  //   a.href = URL.createObjectURL(res);
  //   a.download = title;
  //   document.body.appendChild(a);
  //   a.click();
  // }
  DownloadProfilePic(downloadLink: any) {
    FileSaver.saveAs(downloadLink, 'image.jpg');
  }
  downloadImage2(downloadLink: any) {
    const a = document?.createElement('a');
    a.href = window.URL.createObjectURL(downloadLink);
    a.download = 'cc';
    document.body.appendChild(a);
    a.click();
  }
  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++)
      this.subscriptions[i].unsubscribe();
  }
}
