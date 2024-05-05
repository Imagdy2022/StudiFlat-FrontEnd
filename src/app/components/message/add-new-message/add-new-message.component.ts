import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminsService } from 'src/app/_services/admins/admins.service';

@Component({
  selector: 'app-add-new-message',
  templateUrl: './add-new-message.component.html',
  styleUrls: ['./add-new-message.component.scss']
})
export class AddNewMessageComponent {

  showSide: string = '';
  headerData: Array<any> = [];
  Tenants = [];
  numberTenants = 0;
  totalRecords = 0;
  Date: any = 'All';
  TantsRole: any;
  is_Super: any;
  pageNumber = 1;
  pagesize = 10;
  totalofPages = 0;
  disablenext = false;
  disableperv = false;
  userSelectId :any;
  checkedUsers: any[] = [];
  selectedUsersIds: number[] = [];

  constructor(
    public _adminservices: AdminsService,
    private messageService: MessageService,
    public router: Router
  ) {
  }
  ngOnInit() {

    this.getAllTenants();
    this.checkRole();
  }

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

  getAllTenants() {
    this.Tenants = [];
    this.numberTenants = 0;
    this._adminservices
      .GetAllAppUsers(this.pageNumber, this.pagesize, this.searchText)
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
      );
  }
  tiggerPageChange(event: any) {
    const calcPageNumber = Math.floor(event.first / event.rows) + 1;
    this.pageNumber = calcPageNumber;
    this.getAllTenants();
  }

  addItem(value: string): void {
    this.showSide = value;
  }

  searchText: any = '';

  searchKey(data: string) {
    this.searchText = data;
    this.getAllTenants();
  }
  searchTextChange: any;
  searchAction() {
    this.getAllTenants();
  }
  selectAll(ev: any) {
    if (ev.target.checked) {
      this.checkedUsers = [];
      this.Tenants.forEach((user : any) => {
        document.getElementById(`selectedUser-${user.tenant_ID}`)?.setAttribute('checked', 'true');
        this.checkedUsers.push(user);
        this.selectedUsersIds.push(user.tenant_ID);
      });
    }
    else {
      this.Tenants.forEach((user:any) => {
        document
          .getElementById(`selectedUser-${user.tenant_ID}`)
          ?.removeAttribute('checked');
      });
      this.checkedUsers = [];
    }
  }
  onCheckboxChange(e: any) {
    if(e.target.checked){
      this.userSelectId = e.target.value
    }
    }

}
