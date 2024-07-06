




import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApartmentService } from 'src/app/_services/apartments/apartment.service';
import { IApartments } from 'src/app/models/apartment';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ApartmentsComponent implements OnInit {







  showSide: string = '';
  apartmentFillterLists: Array<any> = [];
  apartmentFillterSelected: Array<any> = [];
  available: boolean = true;
  spinner: boolean = true;
  listDropDown: Array<object> = [];
  apartmentList: IApartments['data'] = [];
  subscriptions: Subscription[] = [];
  first: number = 1;
  rows: number = 10;
  monthButton: boolean = true;
  weekButton: boolean = false;
  constructor(private apartmentSer: ApartmentService, public router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getAllApartment();
    this.initFakeData();
    this.clearAllCookie();
    this.checkRole();
  }

  ApartmentsRole: any;
  is_Super: any;

  checkRole() {
    const data = localStorage.getItem("user");
    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.is_Super = parsedData.is_Super;
      if (parsedData.is_Super == false) {
        for (let i = 0; i < parsedData.permissions.length; i++) {
          if (parsedData.permissions[i].page_Name == "Apartments") {
            this.ApartmentsRole = parsedData.permissions[i];
          }
        }
        if (this.ApartmentsRole.p_View == false && this.is_Super == false) {
          this.gotopage();
        }
      }
    }
  }

  gotopage() {
    let url: string = "unlegal";
    this.router.navigateByUrl(url);
  }

  clearAllCookie() {
    const keysToRemove = ['generalInfoForm', 'PostBackupInfo', 'create_Apart_Equ', 'contract', 'imagesAPT', 'imagesAPT12', 'imagesAPT11'];
    for (const key of keysToRemove) {
      localStorage.removeItem(key);
    }
  }

  Date = "All";

  selectedfromDropDown(value: any) {
    this.Date = value.name;
    this.getAllApartment();
  }

  initFakeData(): void {
    this.apartmentFillterLists = [
      { id: 0, name: "All" },
      { id: 1, name: "Rented Apartment" },
      { id: 2, name: "Available Apartment" },
      { id: 3, name: "Pending" },
      { id: 4, name: "Draft" },
      { id: 5, name: "Rent EndSoon" },
    ];
    this.apartmentFillterSelected = [true];
    this.listDropDown = [{ name: 'All' }, { name: 'Today' }, { name: 'Last week' }, { name: 'This month' }, { name: 'This year' }];
  }

  fullRespone: IApartments; // تعديل هنا
  pageNumber: number = 1;
  filterStatus: any = "All";
  itemsPerPage: number = 10;
  pagesize = 8;
  totalofPages = 0;
  totalRecords = 0;
  disablenext = false;
  disableperv = false;
  messagemessage: any;

/////////////////////////////////
  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getAllApartment();
    }
  }

  nextPage() {
    if (this.pageNumber < this.totalofPages) {
      this.pageNumber++;
      this.getAllApartment();
    }
  }
  ///////////////////////////////////

  AddtoBest(apt_UUID: any) {
    this.subscriptions.push(this.apartmentSer.AddtoBest(apt_UUID).subscribe((res) => {
      this.messagemessage = res["message"];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${this.messagemessage}` });
      this.getAllApartment();
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `${'error'}` });
    }));
  }

  messagemessage2: any;

  RemoveBest(apt_UUID: any) {
    this.subscriptions.push(this.apartmentSer.RemoveBest(apt_UUID).subscribe((res) => {
      this.messagemessage2 = res["message"];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${this.messagemessage2}` });
      this.getAllApartment();
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.error.message[0]}` });
    }));
  }

  DeleteApartment(apt_UUID: any) {
    this.subscriptions.push(this.apartmentSer.DeleteApartment(apt_UUID).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res["message"] });
      this.getAllApartment();
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.error.message[0]}` });
    }));
  }
//////////////////////
  getAllApartment(): void {
    this.apartmentList = [];
    this.spinner = true;
    this.subscriptions.push(
      this.apartmentSer.FilterApartmentsFront(this.Date, this.pageNumber, this.itemsPerPage, this.filterStatus, this.searchText).subscribe((res) => {

        this.fullRespone = res;
        if(res.data[0]!=null)
        this.apartmentList = res.data;
        this.totalofPages = res.totalPages;
        this.totalRecords = res.totalRecords
        this.disablenext = this.totalofPages === this.pageNumber;
        this.disableperv = this.pageNumber === 1;
        this.spinner = false;
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load apartments' });
        this.spinner = false;
      })
    );
  }
  //////////////////

  tiggerPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    let calcPageNumber = Math.floor(this.first / this.rows) + 1;
    this.pageNumber = calcPageNumber;
    this.getAllApartment();
  }

  addItem(value: any) {
    this.showSide = value;
  }

  checkindex=0;
  clickApartmentList(index:any){
    this.checkindex=index?.target?.value;
    this.apartmentFillterSelected = this.apartmentFillterSelected.map((data) => data == true ? false : false)

    this.apartmentFillterSelected[index?.target?.value] = true
    if(index?.target?.value == 0){
      this.filterStatus = "All";
      this.getAllApartment();
    }
   else if(index?.target?.value == 1){
      this.filterStatus = "Rented";
      this.getAllApartment();
    }
   else if(index?.target?.value == 2){
      this.filterStatus = "Available";
      this.getAllApartment();
    }
   else if(index?.target?.value == 3){
      this.filterStatus = "Pending";
      this.getAllApartment();
    }
   else if(index?.target?.value == 4){
      this.filterStatus = "Draft";
      this.getAllApartment();
    }
   else if(index?.target?.value == 5){
      this.filterStatus = "RentEndSoon";
      this.getAllApartment();
    }
  }

  xx: any;
  showEdit: Array<boolean> = [];
  detailperson(event: any, id: any): void {
    this.xx = id;
    this.showEdit = [];
    event.stopPropagation();
    this.showEdit[id] = !this.showEdit[id];
  }

  hidecard() {
    this.xx = "";
    this.showEdit = [];
  }
    searchText: any = '';

  searchKey(data: string) {
    this.searchText = data;
    this.getAllApartment();
  }

  searchTextChange: any;

  searchAction(event: KeyboardEvent) {
    if (this.searchText.trim() === '' && (event.key === 'Backspace' || event.key === ' ')) {
      event.preventDefault();
      return;
    }
    this.getAllApartment();
  }

  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}

