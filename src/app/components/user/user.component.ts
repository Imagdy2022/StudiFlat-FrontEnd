import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  home: MenuItem | undefined;
  @ViewChild('closebutton') closebutton: any;

  showSide: string = '';
  products!: Array<object>;
  selectedProducts: Array<object> = [];
  headerData: Array<any> = [];
  subscriptions:Subscription[] = [];
  loading: boolean = true;
  monthButton  : boolean= true;
  weekButton  : boolean= false;
  userId:any;
  // search: boolean = false;
  listDropDown: Array<object> = [{ name: 'All  ' },
    { name: 'Today' },
    { name: 'Last Week' },
    { name: 'This month' },
    { name: 'This year' },
  ];

  constructor(
    public _adminservices: AdminsService,
    private messageService: MessageService,
    public router: Router
  ) {}

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: ['/dashboard'] };

    this.getAllTenants();
    this.checkRole();
  }
  TantsRole: any;
  is_Super: any;
  checkRole() {
    const data = localStorage.getItem('user');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.is_Super = parsedData.is_Super;
      if (parsedData.is_Super == false) {
        for (let i = 0; i < parsedData.permissions.length; i++) {
          if (parsedData.permissions[i].page_Name == 'Users') {
            this.TantsRole = parsedData.permissions[i];
          }
        }
        if (this.TantsRole.p_View == false && this.is_Super == false) {
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
   * selectedfromDropDown
   * @param $event string
   * @returns void
   */
  selectedfromDropDown(value: any) {
    this.Date = value.name;
    this.getAllTenants();
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
  totalofPages = 0;
  disablenext = false;
  disableperv = false;

  Tenants = [];
  numberTenants = 0;
  totalRecords = 0;
  Date: any = 'All';
  getAllTenants() {
    this.Tenants = [];
    this.numberTenants = 0;
    this.subscriptions.push( this._adminservices
      .TenantList(this.pageNumber, this.pagesize, this.Date, this.searchText)
      .subscribe(
        (res: any) => {
          this.Tenants = res['data'];
          this.numberTenants = this.Tenants.length;
          this.totalofPages = res['totalPages'];
          this.totalRecords = res['totalRecords'];
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
        },
        (error) => {
          console.error('Error fetching owners:', error);
        }
      ));

  }
  tiggerPageChange(event: any) {
    const calcPageNumber = Math.floor(event.first / event.rows) + 1;
    this.pageNumber = calcPageNumber;
    this.getAllTenants();
  }
  FilterButtons(value:any){
    this.Date=value;
    if(this.Date == 'This Month'){
      this.monthButton = true;
      this.weekButton = false
    }else{
      this.monthButton = false;
      this.weekButton = true;
    }
    this.getAllTenants()
  }
  DeleteUser() {
    this.subscriptions.push(this._adminservices.DeleteTenant(this.userId).subscribe(
      (res: any) => {
        this.closebutton.nativeElement.click();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${res.message}`,
        });

        this.getAllTenants();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${error.error.message[0]}`,
        });
      }
    ));

  }
  SuspendUser() {
    this.subscriptions.push( this._adminservices.SuspendTenant(this.userId).subscribe(
      (res: any) => {
        this.closebutton.nativeElement.click();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${res.message}`,
        });

        this.getAllTenants();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${error.error.message[0]}`,
        });
      }
    ));
  }
  unSuspendUser() {
    this.subscriptions.push(  this._adminservices.UnSuspendTenant(this.userId).subscribe(
      (res: any) => {
        this.closebutton.nativeElement.click();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${res.message}`,
        });

        this.getAllTenants();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${error.error.message[0]}`,
        });
      }
    ));
  }
  detailperson(event: any, id: any): void {
    this.showEdit = [];
    event.stopPropagation();

    this.showEdit[id] == true
      ? (this.showEdit[id] = false)
      : (this.showEdit[id] = true);
  }

  showEdit: Array<boolean> = [];
  hidecard(id: any) {
    this.showEdit = [];
  }
  searchText: any = '';

  searchKey(data: string) {
    this.searchText = data;
    this.getAllTenants();
  }
  searchTextChange: any;
  searchAction(event: KeyboardEvent) {
    if (this.searchText.trim() === '' && (event.key === 'Backspace' || event.key === ' ')) {
      event.preventDefault();
      return;
  }
    this.getAllTenants();
  }


  display = 'none';
  model1: Boolean = false;
  model2: Boolean = false;
  model3: Boolean = false;
  deleteModal(id: any) {
    this.display = 'block';
    this.display = 'flex';
    this.model1 = true;
    this.model2 = false;
    this.model3 = false;
    this.userId = id;
  }
  SuspendModal(id: any) {
    this.display = 'block';
    this.display = 'flex';
    this.model2 = true;
    this.model1 = false;
    this.model3 = false;
    this.userId = id;
  }
  UnSuspendModal(id: any) {
    this.display = 'block';
    this.display = 'flex';
    this.model3 = true;
    this.model1 = false;
    this.model2 = false;
    this.userId = id;
  }
  onCloseHandled() {
    this.display = 'none';
  }

  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }
}
