import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { ApartmentService } from 'src/app/_services/apartments/apartment.service';
import { InquiresService } from 'src/app/_services/inquires/inquires.service';

@Component({
  selector: 'app-send-offer',
  templateUrl: './send-offer.component.html',
  styleUrls: ['./send-offer.component.scss']
})
export class SendOfferComponent {
  showSide: string = '';
  wait_id:any;
  apt_id:any
  ApartmentsList :any []=[];
  subscriptions:Subscription[] = [];
  pageNumber=1;
  pagesize=10;
  totalofPages=0;
  totalRecords=0;
  first: number = 1;
  rows: number = 10;

  constructor(public router: Router,
    public _ActivatedRoute: ActivatedRoute,
    private _checkOutService: AdminsService,
    private messageService: MessageService,
    private apartmentSer: ApartmentService)
    {
    this.getAllApartment()
    this.wait_id = _ActivatedRoute.snapshot.paramMap.get('id');
  }

  OnInit(){

  }

  getAllApartment() {
    this.subscriptions.push( this.apartmentSer
      .FilterApartmentsFront('', this.pageNumber, 10, 'All', '')
      .subscribe((res) => {
        this.ApartmentsList = res.data
        this.totalofPages = res.totalPages;
        this.pageNumber=res.pageNumber
        this.totalRecords = res.totalRecords;

      }))

  }

  addItem(value: string): void {
    this.showSide = value;
  }

  tiggerPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    let calcPageNumber = Math.floor(this.first / this.rows) + 1;
    this.pageNumber = calcPageNumber;
    this.getAllApartment();
  }
  selectAppartment(id: number): void {
    this.apt_id = id;
  }

  sendOffer(){
    let data={
      Wait_ID: this.wait_id,
      Apt_ID: this.apt_id
    }
    this._checkOutService.SentWaitListOffer(data).subscribe(
      (res:any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        })
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message[0],
        });
      }
     )
  }

  searchText:any=""

  searchTextChange:any
  searchAction(event: KeyboardEvent) {
    if (this.searchText.trim() === '' && (event.key === 'Backspace' || event.key === ' ')) {
      event.preventDefault();
      return;
  }
    this.getAllApartment()

  }

  imageSize: any;
  display22 = 'none';

  opencloseModal(photo: any) {
    this.display22 = 'block';
    this.imageSize = photo;
  }

  oncloseModal() {
    this.display22 = 'none';
  }
}
