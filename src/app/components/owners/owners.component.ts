import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { OnwerService } from 'src/app/_services/Onwers/onwer.service';
import { EChildernName } from 'src/app/shared/models/childernName';
import { IOnwer } from 'src/app/models/onwer';
import { ITableHeader } from 'src/app/shared/components/table/table/tableHeader';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class OwnersComponent implements OnInit {

  /** childernName */
  childernName: string = EChildernName.OwnersComponent;
  /** showSide  */
  showSide: string = '';
  /** products */
  products!: Array<object>;
  /** fullRespone */
  fullRespone!: Array<object>;
  /** selectedProducts */
  selectedProducts: Array<object> = [];
  /** headerData */
  headerData: Array<any> = [];
  /** loading */
  loading: boolean = true;
  /** search */
  search: boolean = false;
  /** spinner */
  spinner: boolean = false;
  /** pageNumber */
  pageNumber: number = 1;
  /** itemsPerPage */
  itemsPerPage: number = 10;
  /** searchValue */
  searchValue: string = '';
  subscriptions:Subscription[] = [];
  /** listDropDown */
  listDropDown: Array<object> = [{ name: 'All  ' },{ name: 'Today' }, { name: 'Last week' }, { name: 'This month' }, { name: 'This year' }];

  constructor(private messageService: MessageService,private ownerSer: OnwerService,public router: Router) {
  }

  ngOnInit() {
    this.headerData = this.initHeadersData();
    this.getAllOwners(1, this.itemsPerPage, this.searchValue);
    this.checkRole();
  }
  OwnersRole:any
  is_Super:any
  checkRole(){
    const data = localStorage.getItem("user");
     if (data !== null) {

      let parsedData = JSON.parse(data);
       this.is_Super=parsedData.is_Super
      if(parsedData.is_Super==false) {
  for(let i=0; i<parsedData.permissions.length;i++){
    if(parsedData.permissions[i].page_Name=="Owners"){
      this.OwnersRole=parsedData.permissions[i];
    }

  }
  if(this.OwnersRole.p_View==false &&this.is_Super==false) {
    this.gotopage( )
  }
}


    }
  }
  gotopage( ){
    let url: string = "unlegal";
      this.router.navigateByUrl(url);
  }
  /**
   * getAllOwners
   * @returns void
   */
  Date=""
  getAllOwners(PageNumber: number, PageSize: number, search: string): void {
    this.subscriptions.push( this.ownerSer.getAllOnwers(PageNumber, PageSize, search,this.Date).subscribe((res: IOnwer[] | any) => {
      this.products = res.data;
      this.fullRespone = res;
      this.spinner = true;
    }, (error) => {
      this.spinner = true;
      console.error('Error fetching owners:', error);
    }));
  }
  /**
   * deleteOwner
   * @param event
   */
  deleteOwner(event: any): void {
    this.subscriptions.push(this.ownerSer.deleteOwner(event.owner_ID).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${res.message}`,
        });
        this.getAllOwners(this.pageNumber, this.itemsPerPage, this.searchValue);
        ;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${error.error.message}`,
        });
      }
      
      ));
  }
  /**
   * searchInOwner
   * @param event
   */
  searchInOwner(event: any) {
    this.searchValue = event
    this.pageNumber = 1;
    this.getAllOwners(this.pageNumber, this.itemsPerPage, event);
  }

  /**
   * updateDataPerPage
   * @param PageNumber
   */
  updateDataPerPage(PageNumber: any): void {
    this.pageNumber = PageNumber;


    this.getAllOwners(this.pageNumber, this.itemsPerPage, this.searchValue);

  }

  /**
   * addItem
   * @param value string
   * @returns void
   */
  addItem(value: string): void {
    this.showSide = value
  }


  /**
   * addItem
   * @param value string
   * @returns void
   */
  initHeadersData(): Array<ITableHeader> {
    return [
      // { Name: '', SortableColumn: '', tableHeaderCheckbox: true, sortIcon: false },
      //  {Name:" ", SortableColumn: 'owner_Photo'},
      { Name: 'Name', SortableColumn: 'owner_FirstName', sortIcon: true },
      { Name: 'Email Address', SortableColumn: 'owner_Mail', sortIcon: true },
      { Name: 'Phone Number', SortableColumn: 'owner_Phone', sortIcon: true },
      // { Name: 'Gender', SortableColumn: 'gender', sortIcon: false },
      { Name: 'About', SortableColumn: 'owner_About', sortIcon: true },
      { Name: 'Operations', SortableColumn: ' ', sortIcon: false },


    ]
  }

  /**
   * getSeverity
   * @param status
   * @returns string
   */
  getSeverity(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'unknown';
    }
  }
  /**
   * selectedfromDropDown
   * @param $event string
   * @returns void
   */
  selectedfromDropDown(value: any) {
    this.Date=value.name;
    this.getAllOwners(this.pageNumber, this.itemsPerPage, this.searchValue)
    }

    ngOnDestroy() {
      for(let i=0;i<this.subscriptions.length;i++)
      this.subscriptions[i].unsubscribe();
    }
}
