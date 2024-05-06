import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { AdminsService } from 'src/app/_services/admins/admins.service';

@Component({
  selector: 'app-add-new-message',
  templateUrl: './add-new-message.component.html',
  styleUrls: ['./add-new-message.component.scss']
})
export class AddNewMessageComponent {

  showSide: string = '';
  headerData: Array<any> = [];
  Tenants :any[] = [];
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
  subscriptions:Subscription[] = [];
  reply_Desc:any="";
  apt_imgs:any;
  isAllUser :boolean = false;

  constructor(
    public _adminservices: AdminsService,
    private messageService: MessageService,
    public router: Router,
    public _ticketService:AdminsService,
    private uploadService: UploadFileService,
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
    this.subscriptions.push( this._adminservices
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
      ))

  }
  tiggerPageChange(event: any) {
    const calcPageNumber = Math.floor(event.first / event.rows) + 1;
    this.pageNumber = calcPageNumber;
    this.getAllTenants();
  }

  addItem(value: string): void {
    this.showSide = value;
  }
  convertFileToFormData(files: any ) {
    const formData = new FormData();

       formData.append('fileData', files , files.name);


    return formData;
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
        this.isAllUser = true;
      });
    }
    else {
      this.Tenants.forEach((user:any) => {
        document
          .getElementById(`selectedUser-${user.tenant_ID}`)
          ?.removeAttribute('checked');
      });
      this.checkedUsers = [];
      this.isAllUser = false;
    }
  }
  onCheckboxChange(e: any) {
    this.checkedUsers = [];
    if (e.target.checked) {
      let user = this.Tenants.find(
        (sc) => sc.tenant_ID == e.target.value
      );
      if (user) {
        this.checkedUsers.push(user);
        this.selectedUsersIds.push(user.tenant_ID);
      }
    }
    else {
      let index = this.checkedUsers.findIndex(sc => sc.tenant_ID == e.target.value);
          this.checkedUsers.splice(index, 1);
          this.selectedUsersIds.splice(index, 1);
    }
  }
    display1:any;
    onOpenModal1( ) {
       this.display1 = 'block';
    }
    onCloseModal1() {
      this.display1 = 'none';
    }
    ListFiles:any=[];
    urls = new Array<string>();
    selectedFiles?: FileList;
    currentFile?: File ;selectedContractImg:any;
    message = '';preview = '';progress = 0;
    selectFile(event: any): void {
      this.ListFiles=null
      this.message = '';
      this.preview = '';
      this.progress = 0;
      this.selectedFiles = event.target.files;

       let files = event.target.files;

      if (files) {
        this.selectedContractImg = files  ;

        for (let file of files) {

          this.ListFiles=file;
           let reader = new FileReader();
          reader.onload = (e: any) => {

             this.urls.push(e.target.result);
          }
          reader.readAsDataURL(file);
        }
      }
     this.upload();
    }

    upload(): void {
      this.subscriptions.push( this.uploadService.uploadSingleFile(this.convertFileToFormData(this.ListFiles )).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'attach Upload Successfully'}` });
          this.apt_imgs= data[0].file_Path  ;
      }))

            }

    SendMsgtoMultiUsers() {
      let data = {
        users_IDs: this.selectedUsersIds,
        msg_Body: this.reply_Desc,
        msg_Attachement: this.apt_imgs,
        is_All : this.isAllUser
      }
      this.subscriptions.push( this._ticketService.SendMsgtoMultiUsers(data).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail:"send Success" });

      }, (error) => {
       this.messageService.add({ severity: 'error', summary: 'Error', detail: "error" });
     }))

    }
    NextButtons(){
      if(this.selectedUsersIds.length > 1)
        this.onOpenModal1();
      else
      this.router.navigate([`/messages/user-message/${this.selectedUsersIds[0]}`])

    }

    ngOnDestroy() {
      for(let i=0;i<this.subscriptions.length;i++)
      this.subscriptions[i].unsubscribe();
    }

}
