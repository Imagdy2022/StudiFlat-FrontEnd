import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent {

  /** products */
  @Input() products!: Array<any>;
  /** fullRespone */
  @Input() fullRespone: any = [];
  /** selectedProducts */
  @Input() selectedProducts: Array<object> = [];
  /** headerData */
  @Input() headerData: Array<any> = [];
  /** pagePerson */
  @Input() pagePerson: string = '';
  /** dataSelectionKey */
  @Input() dataSelectionKey: string = '';
  /** onPageChange */
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();
  /** searchTextChange */
  @Output() searchTextChange: EventEmitter<string> = new EventEmitter<string>();
  /** searchTextChange */
  @Output() deleteItemDetails: EventEmitter<string> = new EventEmitter<string>();
  /** showEdit */
  showEdit: Array<boolean> = [];
  /** search  */
  search: boolean = false;
  /** searchText  */
  searchText: string = '';
  /**dropdownOption */
  dropdownOption: Array<any> = [];
  disablenext = false;
  disableperv = false;


  constructor(public confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.checkRole()
    // console.log(this.headerData);
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
      console.log("Hello", this.OwnersRole)
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
      // this.router.navigateByUrl(url);
  }
  initDropdown() {
    this.dropdownOption = [
      { label: 'Edit', value: 'edit' },
      { label: 'Delete', value: 'delete' },
    ]
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

  /**
   * tiggerPageChange
   * @description calculate the page number and update the onpage change emitter
   * @param event
   */
  tiggerPageChange(event: any) {

    const calcPageNumber = Math.floor(event.first / event.rows) + 1;
    this.onPageChange.emit(calcPageNumber);
  }

  /**
  * GetSelectedItem
  * @returns void
  */
  GetSelectedItem(): void {

  }

  /**
  * show dropdown edit or delet button
  * @param id:number
  * @returns void
  */
  detailperson(event:any,id: any): void {
    this.showEdit=[]
    event.stopPropagation()
    this.showEdit[id] == true ? this.showEdit[id] = false : this.showEdit[id] = true
   }

   hidecard( ){
      this.showEdit=[]

   }
  /**
   * confirmDelte
   * @param event
   */
  confirmDelete(event: any, product: any) {


    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure you want to delete this?',
      icon: 'pi pi-trash', // Change the icon to a trash icon or another suitable delete icon
      accept: () => {
        // Delete action
        this.deleteItem(product);
      },
      reject: () => {
        // Cancel or reject action
      }
    });
  }

  /**
   * deleteItem
   * @param product
   */
  private deleteItem(product: string): void {
    this.deleteItemDetails.emit(product);
  }

}
