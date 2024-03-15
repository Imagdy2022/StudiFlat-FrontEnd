import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import saveAs from 'file-saver';
import { Guid } from 'guid-typescript';
import { MenuItem, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { InquiresService } from 'src/app/_services/inquires/inquires.service';

@Component({
  selector: 'app-view-cancel',
  templateUrl: './view-cancel.component.html',
  styleUrls: ['./view-cancel.component.css']
})
export class ViewCancelComponent implements OnInit{
  home: MenuItem | undefined;
  gfg: MenuItem[] | undefined;
  showPassportModal: any;

  param: any;
  constructor(
    private _inquiresService: InquiresService,
    private _ActivatedRoute: ActivatedRoute,
    private messageService: MessageService,

    public router: Router
  ) {
    this.param = _ActivatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    
    this.GetRequestDetails()
   }
  inquiresRole: any;
  is_Super: any;
  
  gotopage() {
    let url: string = 'unlegal';
    this.router.navigateByUrl(url);
  }
  inquire_details: any={};
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
  GetRequestDetails() {
    this._inquiresService.GetTerminationDetails(this.param).subscribe(
      (res) => {
        this.inquire_details = res;
         this.prop_imgs = res.apt_Imgs;
       },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }
  
  TerminationApproval() {
    this._inquiresService.TerminationApproval(this.param,true,this.Reason).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res['message'],
        });
        // this.gotoListCancel();
        this.display2 = 'none';

        this.display3 = 'block';

         },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }
  TerminationNotApproval() {
    this._inquiresService.TerminationApproval(this.param,false,this.Reason).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res['message'],
        });
        this.display1 = 'none';

        this.display4 = 'block';
      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }
  gotoListCancel(){
    let url: string = "cancel-inquire";
    this.router.navigateByUrl(url);
  }
  viewImage(image: any) {
    this.inquire_details['apt_thumb_Img'] = image;
  }
 
  onCloseModal1() {
    this.display1 = 'none';
  }
  onCloseModal2() {
    this.display2 = 'none';
  }
  
  display2 = 'none';
   onOpenModal1( ) {
    this.Reason = '';
     this.display1 = 'block';
  }
  onOpenModal2() {
    this.Reason2 = '';
    this.display2 = 'block';
  }
  display3:any="none"
  onCloseModal3() {
    this.display3 = 'none';
  }

  display4:any="none"
  onCloseModal4() {
    this.display4 = 'none';
  }
}

