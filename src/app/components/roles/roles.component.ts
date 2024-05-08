import { RolesService } from './../../_services/roles/roles.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toast } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  home: MenuItem | undefined;
  gfg: MenuItem[] | undefined;
  /** roles */
  roles!: Array<any>;
  /** fullRespone */
  fullRespone: any = [];
  /** selectedroles */
  selectedroles: Array<object> = [];
  /** headerData */
  headerData: Array<any> = [];
  /** pagePerson */
  // @Input() pagePerson: string = '';
  /** dataSelectionKey */
  // @Input() dataSelectionKey: string = '';
  /** onPageChange */
  // @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();
  /** searchTextChange */
  searchTextChange: EventEmitter<string> = new EventEmitter<string>();
  /** searchTextChange */
  // @Output() deleteItemDetails: EventEmitter<string> = new EventEmitter<string>();
  /** showEdit */
  showEdit: Array<boolean> = [];
  /** search  */
  search: boolean = false;
  /** searchText  */
  searchText: string = '';
  /**dropdownOption */
  dropdownOption: Array<any> = [];
  subscriptions:Subscription[] = [];
  listDropDown: Array<object> = [
    { name: 'Today' },
    { name: 'Last week' },
    { name: 'This month' },
    { name: 'This year' },
  ];

  spinner: boolean = false;
  numberRoles = 0;
  display1 = 'none';
  display2 = 'none';

  constructor(
    public _rolesService: RolesService,
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
  getAllRolles() {
    this.roles = [];
    this.numberRoles = 0;
    this.subscriptions.push( this._rolesService.getAllRolles().subscribe(
      (res) => {
        this.roles = res;
        this.numberRoles = res.length;
        this.spinner = true;
      },
      (error) => {
        this.spinner = true;
        console.error('Error fetching owners:', error);
      }
    ))

  }
  data: any;
  createRole() {
    this.subscriptions.push(    this._rolesService.createRole(this.data).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${res.message}`,
        });

        this.getAllRolles();
        this.data = '';
        this.display2 = 'none';
      },
      (error) => {
        this.spinner = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${error.error.message[0]}`,
        });
      }
    ))
  }
  DeleteRole(id: any) {
    this.subscriptions.push(this._rolesService.deleteRole(id).subscribe(
      (res) => {
        this.getAllRolles();
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
          detail: `${error.error.message[0]}`,
        });
      }
    ))

  }
  onCloseModal1() {
    this.display1 = 'none';
  }
  onCloseModal2() {
    this.display2 = 'none';
  }
  updataRoleName: any = '';
  UpdateOpenRole(role: any) {
    this.updataRoleName = role.name;

    this.display1 = 'block';
  }
  addOpenRole() {
    this.display2 = 'block';
  }
  selectedfromDropDown(value: any) {
  }
  showSide: string = '';

  addItem(value: string): void {
    this.showSide = value;
  }

  initDropdown() {
    this.dropdownOption = [
      { label: 'Edit', value: 'edit' },
      { label: 'Delete', value: 'delete' },
    ];
  }

  onActionSelected(action: any) {

    // Handle the selected action here
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

  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }
}
