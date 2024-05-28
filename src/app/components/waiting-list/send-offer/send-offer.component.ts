import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminsService } from 'src/app/_services/admins/admins.service';

@Component({
  selector: 'app-send-offer',
  templateUrl: './send-offer.component.html',
  styleUrls: ['./send-offer.component.scss']
})
export class SendOfferComponent {
  showSide: string = '';
  id:any
  ApartmentsList :any []=[]
  pageNumber=1;
  pagesize=10;
  totalofPages=0;
  totalRecords=0;

  constructor(public router: Router,public _ActivatedRoute: ActivatedRoute,private _checkOutService: AdminsService,){
    this.id = _ActivatedRoute.snapshot.paramMap.get('id');
  }

  OnInit(){
    this.getWaitingListById();
  }

  getWaitingListById(){
    this._checkOutService.getWaitingListById(this.id).subscribe((res:any)=>{
      this.ApartmentsList = res?.suggests_Apartments
    })
  }
  addItem(value: string): void {
    this.showSide = value;
  }

  tiggerPageChange(event: any) {

    const calcPageNumber = Math.floor(event.first / event.rows) + 1;
    this.pageNumber=calcPageNumber;
  }
  onCheckboxChange(event:any){

  }

  sendOffer(){
    let data={}
    this._checkOutService.SendOffer(data).subscribe((res)=>{
      console.log(res)
    })
  }
}
