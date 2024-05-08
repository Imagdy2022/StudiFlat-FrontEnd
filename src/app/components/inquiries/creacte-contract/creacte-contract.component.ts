import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { InquiresService } from 'src/app/_services/inquires/inquires.service';

@Component({
  selector: 'app-creacte-contract',
  templateUrl: './creacte-contract.component.html',
  styleUrls: ['./creacte-contract.component.css'],
})
export class CreacteContractComponent implements OnInit {
  mindate: any;
  param: any;
  subscriptions:Subscription[] = [];
  constructor(
    private _inquiresService: InquiresService,
    private _ActivatedRoute: ActivatedRoute,
    private messageService: MessageService,
    public router: Router
  ) {
    this.param = _ActivatedRoute.snapshot.paramMap.get('id');
  }
  date: Date = new Date();

  ngOnInit() {
    this.mindate = new Date();
    this.GetContract();
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
  gotopage() {
    let url: string = 'unlegal';
    this.router.navigateByUrl(url);
  }
  contract_details: any = {};
  showSide: string = '';
  value: any;
  contract_Main: any;
  Reason: any = '';
  Reason2: any = '';

  display1 = 'none';

  GetContract() {
    this.subscriptions.push(    this._inquiresService.GetContract(this.param).subscribe(
      (res) => {
        this.contract_details = res;
      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    ))

  }
  messagemessage22: any;
  CreateAptContract() {
    this.subscriptions.push(  this._inquiresService.CreateAptContract(this.contract_details).subscribe(
      (res) => {
        this.messagemessage22 = res['message'];
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${this.messagemessage22}`,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${error.error.message[0]}`,
        });
      }
    ))


    this.gotopage2();
  }
  addItem(value: string): void {
    this.showSide = value;
  }
  ActionButtonContractSection: boolean = true;

  removeSection(number: any) {
    this.contract_details.rC_Sections.splice(number, 1);
  }
  ActionButtonContractSectionbutton() {
    this.ActionButtonContractSection = true;
    this.contract_details.rC_Sections.push({ sec_Name: '', sec_Desc: '' });
  }
  gotopage2() {
    let url: string = 'inquiries';
    this.router.navigateByUrl(url);
  }

  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }
}
