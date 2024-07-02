import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-add-new-apartments',
  templateUrl: './add-new-apartments.component.html',
  styleUrls: ['./add-new-apartments.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class AddNewApartmentsComponent {


  /** showSide */
  showSide: string = '';
  /** activeIndex */
  activeIndex: number = 0;
  /** param */
  param: any;
  /** date1 */
  date1: any;
  /** items */
  items: MenuItem[] = [];
  /** n_ofbedRoom */
  n_ofbedRoom: number = 0;
  /** apt_Toilets */
  apt_Toilets: number = 0;
  /** n_ofLiving */
  n_ofLiving:number = 0;
  // get id
  UUID: string = ''
   constructor(
    public _ActivatedRoute: ActivatedRoute,
    private messageService: MessageService,public router: Router
  ) {

    this.param = _ActivatedRoute.snapshot.paramMap.get('id');
    this.param == 'add-new-apartments' ? this.param = 'add new apartments' : this.param = 'Edit Apartment Name';
    this.initStpper();
    this.checkRole()
  }

  ApartmentsRole:any
  is_Super:any
  checkRole(){
    const data = localStorage.getItem("user");
     if (data !== null) {

      let parsedData = JSON.parse(data);
       this.is_Super=parsedData.is_Super
      if(parsedData.is_Super==false) {
  for(let i=0; i<parsedData.permissions.length;i++){
    if(parsedData.permissions[i].page_Name=="Apartments"){
      this.ApartmentsRole=parsedData.permissions[i];
    }
  }
  if(this.param=== 'add new apartments'){
    if(this.ApartmentsRole.p_Add==false &&this.is_Super==false) {
      this.gotopage( )
    }
  }else if(this.param=== 'Edit Apartment Name'){
    if(this.ApartmentsRole.p_Update==false &&this.is_Super==false) {
      this.gotopage( )
    }
  }

}


    }
  }
  gotopage( ){
    let url: string = "unlegal";
      this.router.navigateByUrl(url);
  }
  /**
   * addItem
   * @param value
   * @return void
   */
  addItem(value: any): void {
    this.showSide = value
  }

  /**
   * initStpper
   * @returns void
   */
  initStpper(): void {
    this.items = [{
      label: 'General info',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Appartment Equipment Details',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    },
    {
      label: 'Contract And Rental Roles',
      command: (event: any) => {
        this.activeIndex = 2;
      }
    },
    {
      label: 'Backup information',
      command: (event: any) => {
        this.activeIndex = 3;
      }
    }
    ];
  }
  /**
   * changeItem
   * @description change stepper state (number of pages changed)
   * @param index
   */
  changeItem(index: number) {

    this.activeIndex = index;
    scrollTo(0, 0);
  }
  jumbToNextSteb2(value: any) {
    this.n_ofbedRoom = value
  }
  jumbToNextSteb2_apt_Toilets(value: number) {
    this.apt_Toilets = value
  }
  jumbToNextSteb2_n_ofLiving(value: number){
    this.n_ofLiving=value
  }
  id(value: string) {
    this.UUID = value
  }

}
