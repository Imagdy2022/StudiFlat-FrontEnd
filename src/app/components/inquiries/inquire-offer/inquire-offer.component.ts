import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApartmentService } from 'src/app/_services/apartments/apartment.service';
import { InquiresService } from 'src/app/_services/inquires/inquires.service';

@Component({
  selector: 'app-inquire-offer',
  templateUrl: './inquire-offer.component.html',
  styleUrls: ['./inquire-offer.component.css'],
})
export class InquireOfferComponent implements OnInit {
  Inquires: any = [];
  headerData: Array<any> = [];
  showEdit: Array<boolean> = [];
  InquireID: any;
  numberInquires = 0;
  constructor(
    public _ActivatedRoute: ActivatedRoute,
    private _inquiresService: InquiresService,
    private apartmentSer: ApartmentService,
    public router: Router,
    private messageService: MessageService
  ) {
    this.InquireID = _ActivatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getAllApartment();
    this.checkRole();
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
  messagemessage: any;
  AddtoBest(apt_UUID: any) {
    this.apartmentSer.AddtoBest(apt_UUID).subscribe(
      (res) => {
        this.messagemessage = res['message'];
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${this.messagemessage}`,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${'error'}`,
        });
      }
    );
  }
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
  incrementpage() {
    this.pageNumber += 1;
    if (this.pageNumber < 1) {
      this.pageNumber = 1;
    }
    if (this.pageNumber >= this.totalofPages) {
      this.pageNumber = this.totalofPages;
    }
    this.getAllApartment();
  }
  decreamentPage() {
    this.pageNumber -= 1;
    if (this.pageNumber < 1) {
      this.pageNumber = 1;
    }
    this.getAllApartment();
  }
  apartmentList: any = [];
  getAllApartment(): void {
    this.apartmentList = [];
    this.apartmentSer
      .FilterApartmentsFront('', this.pageNumber, 10, 'All', '')
      .subscribe((res) => {
        this.apartmentList = res['data'];
        this.numberInquires = this.Inquires.length;
        this.totalofPages = res['totalPages'];
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
      });
  }
  // getAllInquires(  statusinquires:any) {
  //   this.Inquires=[]
  //   this.numberInquires=0
  //   this._inquiresService.getAllInquires(statusinquires,this.pageNumber).subscribe((res:any) => {
  //     this.Inquires = res["data"];
  //     this.numberInquires = this.Inquires.length;
  //     this.totalofPages=res["totalPages"]
  //     if(this.totalofPages==this.pageNumber){
  //       this.disablenext=true
  //     }else{
  //       this.disablenext=false

  //     }
  //     if(this.pageNumber==1){
  //       this.disableperv=true
  //     }else{
  //       this.disableperv=false

  //     }

  //    }, (error) => {
  //      console.error('Error fetching owners:', error);
  //   })
  // }
  showSide: string = '';

  addItem(value: string): void {
    this.showSide = value;
  }
  detailperson(id: number): void {
    this.showEdit[id] == true
      ? (this.showEdit[id] = false)
      : (this.showEdit[id] = true);
  }

  display1 = 'none';
  onCloseModal1() {
    this.display1 = 'none';
  }
  openModel1() {
    this.display1 = 'block';
  }
  display2: any = 'none';
  onCloseModal2() {
    this.display2 = 'none';
  }
  apt_UUID1: any;
  OpenModal2(apt_UUID: any) {
    this.apt_UUID1 = apt_UUID;
    this.deposit = 0;
    this.Price = 0;
    this.display2 = 'block';
  }
  deposit: any;
  Price: any;
  messagemessage22: any;
  ServiceFees: any;

  SendOffer() {
    this._inquiresService
      .SendOffer(
        this.InquireID,
        this.apt_UUID1,
        this.Price,
        this.deposit,
        this.ServiceFees
      )
      .subscribe(
        (res) => {
          this.messagemessage22 = res['message'];
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: `${this.messagemessage22}` });
          this.display2 = 'none';
          this.openModel1();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${'error'}`,
          });
        }
      );
  }

  gotopage2() {
    let url: string = 'inquiries';
    this.router.navigateByUrl(url);
  }
}
