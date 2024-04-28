import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  /**dropdownOption */
  searchTextChange: EventEmitter<string> = new EventEmitter<string>();

  dropdownOption: Array<any> = [];
  listDropDown: Array<object> = [
    { name: 'Today' },
    { name: 'Last week' },
    { name: 'This month' },
    { name: 'This year' },
  ];
  admins: any = [];
  showSide: string = '';
  numberadmins = 0;
  display1 = 'none';
  statusAdmin: any;
  adminDataToModel: any;
  constructor(
    public _adminservices: AdminsService,
    private messageService: MessageService,
    public router: Router
  ) {}

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: ['/dashboard'] };

    this.getAllRolles();
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
  idAdmin: any;
  sendToModel1(data: any) {
    this.statusAdmin = data.status;
    this.idAdmin = data.user_ID;

    this.display1 = 'block';
  }

  onSubmitModal1() {
    this._adminservices
      .UpdateADminStatus(this.statusAdmin, this.idAdmin)
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${'Status of users has been changed successfuly'}`,
          });
          this.getAllRolles();
          this.display1 = 'none';
        },
        (error) => {
          console.error('Error fetching owners:', error);
        }
      );
  }
  getAllRolles() {
    this.admins = [];
    this.numberadmins = 0;
    this._adminservices.getAllAdmins().subscribe(
      (res) => {
        this.admins = res;
        this.numberadmins = res.length;
      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }
  addItem(value: string): void {
    this.showSide = value;
  }
  onActionSelected(action: any) {
    // Handle the selected action here
  }
  selectedfromDropDown(value: any) {

  }
  openDropdown(event: Event) {
    event.stopPropagation(); // Prevents the dropdown from closing when clicking the button
  }

  searchAction() {
    this.searchTextChange.emit(this.searchText);
    this.search = false;
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
    this._adminservices.DeleteUser(this.idDeleted).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${'the item deleted'}`,
        });
      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }
}
