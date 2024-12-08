import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
})
export class ContractComponent implements OnInit {
  showEdit: Array<boolean> = [];
  showEdit2: Array<boolean> = [];
  home: any;
  showSide: string = '';
  products!: Array<object>;
  selectedProducts: Array<object> = [];
  headerData: Array<any> = [];
  loading: boolean = true;
  search: boolean = false;
  subscriptions: Subscription[] = [];
  listDropDown: Array<object> = [
    { name: 'All  ' },
    { name: 'Today' },
    { name: 'Last Week' },
    { name: 'This month' },
    { name: 'This year' },
  ];
  display23: string;

  constructor(
    public _adminservices: AdminsService,
    public router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: ['/dashboard'] };

    //  this.getAllFAQ(  )
    this.GetAds();
  }

  /**
   * selectedfromDropDown
   * @param $event string
   * @returns void
   */
  selectedfromDropDown(value: any) {
    this.Date = value.name;
    // this.getAllpartners()
  }
  /**
   * addItem
   * @param value string
   * @returns void
   */
  addItem(value: string): void {
    this.showSide = value;
  }

  statusTenant: any = '';
  pageNumber = 1;
  pagesize = 10;
  pagesize2 = 10;

  totalofPages = 0;
  disablenext = false;
  disableperv = false;
  pageNumber2 = 1;
  FAQ = [];
  selectpp: any;
  totalRecords = 0;

  tiggerPageChange2(event: any) {
    const calcPageNumber = Math.floor(event.first / event.rows) + 1;
    this.pageNumber2 = calcPageNumber;
    this.GetAds();
  }
  numberFAQ = 0;
  Date: any = 'All';

  Ads: any = [];
  numberAds = 0;
  totalRecordsAds = 0;
  totalofPagesAds = 0;
  GetAds() {
    this.Ads = [];
    this.numberAds = 0;
    this.subscriptions.push(
      this._adminservices.GetContract().subscribe(
        (res: any) => {
          this.Ads = res;
          this.totalRecordsAds = this.Ads.length;

          this.numberAds = this.Ads.length;
          this.totalofPagesAds = this.Ads.length / 10;
        },
        (error) => {
          console.error('Error fetching owners:', error);
        }
      )
    );
  }
  // DeleteUser(id :any){
  //   this._adminservices.DeleteTenant( id).subscribe((res:any) => {
  //     this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'Deleted Successfuly'}` });

  //     this.getAllpartners( );

  //    }, (error) => {
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: `${'error'}` });
  //   })

  // }
  // SuspendUser(id:any){
  //   this._adminservices.SuspendTenant( id).subscribe((res:any) => {
  //     this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'Suspended Successfuly'}` });

  //     this.getAllpartners( );

  //    }, (error) => {
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: `${'error'}` });
  //   })
  // }

  detailperson2(event: any, id: any): void {
    this.showEdit2 = [];
    event.stopPropagation();

    this.showEdit2[id] == true
      ? (this.showEdit2[id] = false)
      : (this.showEdit2[id] = true);
  }
  hidecard() {
    this.showEdit = [];
  }
  hidecard2() {
    this.showEdit2 = [];
  }

  deletepartner(id: any) {
    this.subscriptions.push(
      this._adminservices.DeleteContract(id).subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Contract Section has Deleted',
          });
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
  DeleteAds(id: any) {
    this.subscriptions.push(
      this._adminservices.DeleteContract(id).subscribe(
        (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res['message'],
          });
          this.GetAds();
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
  Question_title: any = '';
  question_answer: any = '';
  display1: any = 'none';
  openmodelcreatefaq() {
    this.display1 = 'block';
  }
  onCloseModal1() {
    this.display1 = 'none';
  }

  Question_title_update: any = '';
  question_answer_update: any = '';
  display2: any = 'none';
  idfaq_updat: any;

  partnersRole: any;
  is_Super: any;
  checkRole() {
    const data = localStorage.getItem('user');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.is_Super = parsedData.is_Super;
      if (parsedData.is_Super == false) {
        for (let i = 0; i < parsedData.permissions.length; i++) {
          if (parsedData.permissions[i].page_Name == 'partners') {
            this.partnersRole = parsedData.permissions[i];
          }
        }
        if (this.partnersRole.p_View == false && this.is_Super == false) {
          this.gotopage();
        }
      }
    }
  }
  gotopage() {
    let url: string = 'unlegal';
    this.router.navigateByUrl(url);
  }

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  imageInfos?: any = [];
  ListFiles: any;
  urls: any = null;
  counter = 0;
  link_create_ads: any = '';
  removeItem() {
    this.ListFiles = null;
    this.urls = null;
  }
  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    let files = event.target.files;
    this.ListFiles = event.target.files;
    if (files) {
      for (let file of files) {
        this.ListFiles = file;
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
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
  display3: any = 'none';
  openmodel3adds() {
    this.link_create_ads = ' ';
    this.ListFiles = null;
    this.urls = null;

    this.display3 = 'block';
  }
  onCloseModal3() {
    this.display3 = 'none';
    this.link_create_ads = ' ';
    this.ListFiles = null;
    this.urls = null;
  }
  button_name: any = '';
  CreateAds() {
    this.subscriptions.push(
      this._adminservices
        .CreateContract(this.sec_name, this.sec_desc, this.sec_order)
        .subscribe(
          (res: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res['message'],
            });
            this.display3 = 'none';
            this.sec_desc = '';
            this.sec_name = '';
            this.sec_id = '';
            this.sec_order = 0;
            this.urls = null;
            this.ListFiles = null;
            this.GetAds();
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
  sec_name: any = '';
  sec_desc: any = '';
  sec_order: any = 0;
  urls_update: any = null;
  ListFiles2: any = null;
  removeItem2() {
    this.ListFiles2 = null;
    this.urls_update = null;
  }
  selectFile2(event: any): void {
    let files = event.target.files;
    this.ListFiles2 = event.target.files;
    if (files) {
      for (let file of files) {
        this.ListFiles2 = file;
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls_update = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  readFile2(file: File): Observable<string> {
    return new Observable((obs) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        obs.next(reader.result as string);
        obs.complete();
      };
      reader.readAsDataURL(file);
    });
  }
  idads: any = '';
  sec_id: any;
  UpdateContract() {
    this.subscriptions.push(
      this._adminservices
        .UpdateContract(
          this.sec_name,
          this.sec_desc,
          this.sec_order,
          this.sec_id
        )
        .subscribe(
          (res: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res['message'],
            });
            this.sec_desc = '';
            this.sec_name = '';
            this.sec_id = '';
            this.sec_order = 0;
            this.display2 = 'none';
            this.GetAds();
            this.onCloseModal2();
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
  openmodupdateads(item: any) {
    this.sec_id = item.set_C_ID;
    this.sec_name = item.set_C_Name;
    this.sec_desc = item.set_C_Desc;
    this.sec_order = item.set_C_Order;
    this.display2 = 'block';
  }

  opendetailsModal(item: any) {
    this.sec_id = item.sec_id;
    this.sec_name = item.set_C_Name;
    this.sec_desc = item.set_C_Desc;
    this.sec_order = item.set_C_Order;
    this.display23 = 'block';
  }
  onCloseModalDetails() {
    this.display23 = 'none';
  }
  onCloseModal2() {
    this.display2 = 'none';
  }
  searchText: any = '';

  searchKey(data: string) {
    this.searchText = data;
    this.GetAds();
  }
  searchTextChange: any;
  searchAction() {
    // this.searchTextChange.emit(this.searchText);
    this.search = false;
    this.GetAds();
    this.searchText = '';
  }

  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++)
      this.subscriptions[i].unsubscribe();
  }
}
