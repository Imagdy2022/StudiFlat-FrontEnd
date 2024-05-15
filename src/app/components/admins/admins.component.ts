import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  home: any;
  headerData: Array<any> = [];
  showEdit: Array<boolean> = [];
  /** search  */
  search: boolean = false;
  /** searchText  */
  searchText: string = '';
  subscriptions: Subscription[] = [];
  /**dropdownOption */
  searchTextChange: EventEmitter<string> = new EventEmitter<string>();

  dropdownOption: Array<any> = [];
  listDropDown: Array<object> = [
    { name: 'All' },
    { name: 'Today' },
    { name: 'Last week' },
    { name: 'This month' },
    { name: 'This year' },
  ];
  Date = 'All';
  admins: any = [];
  showSide: string = '';
  numberadmins = 0;
  display1 = 'none';
  statusAdmin: any;
  adminDataToModel: any;
  display3: string;
  constructor(
    public _adminservices: AdminsService,
    private messageService: MessageService,
    public router: Router
  ) {}

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: ['/dashboard'] };

    this.getAllAdmins();
    this.checkRole();
  }
  AdminRole: any;
  is_Super: any;
  checkRole() {
    const data = localStorage.getItem('user');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.is_Super = parsedData.is_Super;
      if (parsedData.is_Super == false) {
        for (let i = 0; i < parsedData.permissions.length; i++) {
          if (parsedData.permissions[i].page_Name == 'Settings') {
            this.AdminRole = parsedData.permissions[i];
          }
        }
        if (this.AdminRole.p_View == false && this.is_Super == false) {
          this.gotopage();
        }
      }
    }
  }
  gotopage() {
    let url: string = 'unlegal';
    this.router.navigateByUrl(url);
  }
  onCloseModal1() {
    this.display1 = 'none';
  }
  onCloseModal3() {
    this.display3 = 'none';
  }
  idAdmin: any;
  sendToModel1(data: any) {
    this.statusAdmin = data.status;
    this.idAdmin = data.user_ID;

    this.display1 = 'block';
  }

  onSubmitModal1() {
    this.subscriptions.push(
      this._adminservices
        .UpdateADminStatus(this.statusAdmin, this.idAdmin)
        .subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `${res.message}`,
            });
            this.getAllAdmins();
            this.display1 = 'none';
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${error.error.message[0]}`,
            });
          }
        )
    );
  }
  getAllAdmins() {
    this.admins = [];
    this.numberadmins = 0;
    this.subscriptions.push(
      this._adminservices.getAllAdmins(this.searchText, this.Date).subscribe(
        (res) => {
          this.admins = res;
          this.numberadmins = res.length;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${error.error.message[0]}`,
          });
        }
      )
    );
  }
  addItem(value: string): void {
    this.showSide = value;
  }
  onActionSelected(action: any) {
    // Handle the selected action here
  }
  selectedfromDropDown(value: any) {
    this.Date = value.name;
    this.getAllAdmins();
  }
  openDropdown(event: Event) {
    event.stopPropagation(); // Prevents the dropdown from closing when clicking the button
  }

  searchAction(event: KeyboardEvent) {
    if (this.searchText.trim() === '' && (event.key === 'Backspace' || event.key === ' ')) {
      event.preventDefault();
      return;
  }
    this.getAllAdmins();
  }

  detailperson(event: any, id: any) {
    this.showEdit = [];
    event.stopPropagation();

    this.showEdit[id] == true
      ? (this.showEdit[id] = false)
      : (this.showEdit[id] = true);
  }
  hidecard() {
    this.showEdit = [];
  }
  display2 = 'none';
  onCloseModal2() {
    this.display2 = 'none';
  }
  idDeleted: any;
  openModal2(id: any) {
    this.idDeleted = id;
    this.display2 = 'block';
  }
  onSubmitModal2() {
    this.subscriptions.push(
      this._adminservices.DeleteUser(this.idDeleted).subscribe(
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
            detail: `${error.error.message}`,
          });
        }
      )
    );
  }
  paramid3: any;
  faarray: any;
  OpenModal3(id: any) {
    this.paramid3 = id;
    this.subscriptions.push(
      this._adminservices.TFASetup(id).subscribe(
        (res) => {
          this.faarray = res;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${error.error.message[0]}`,
          });
        }
      )
    );
    this.display3 = 'block';
  }
  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++)
      this.subscriptions[i].unsubscribe();
  }
  AuthCode: any;
  onSubmitModal3(email: any) {
    this.subscriptions.push(
      this._adminservices
        .TFAEnable(
          this.faarray.qR_Link,
          email,
          this.AuthCode,
          this.faarray.authenticatorKey,
          this.faarray.formattedKey
        )
        .subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: '2FA Login has Enabled',
            });
            this.getAllAdmins();
            this.display3 = 'none';
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${error.error.message[0]}`,
            });
          }
        )
    );
  }
}
