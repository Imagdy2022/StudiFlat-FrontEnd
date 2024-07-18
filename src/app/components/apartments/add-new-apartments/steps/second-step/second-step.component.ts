import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApartmentService } from '../../../../../_services/apartments/apartment.service';
import { OnwerService } from 'src/app/_services/Onwers/onwer.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
})
export class SecondStepComponent {
  /**  addApartment */
  @Input() addApartment: string = '';
  /** date */
  date: any;
  /** listDropDownRoom */
  listDropDownRoom: Array<object> = [{ name: 'Bedroom' }, { name: 'Living' }];
  /** contentnewFieldRoomDetails */
  contentnewFieldRoomDetails: string = '';
  /** roomType */
  roomType: Array<any> = [];
  /** arraynewFieldRoomDetails */
  arraynewFieldRoomDetails: Array<any> = [];
  /** arraynewFieldBathroom */
  arraynewFieldBathroom: Array<any> = [];
  /** arraynewFieldLivingRoomDetails */
  arraynewFieldLivingRoomDetails: Array<any> = [];
  /** newFieldkitchen */
  newFieldkitchen: Array<any> = [''];
  /** newFieldSpecialFeatures */
  newFieldSpecialFeatures: Array<any> = [
   ''
  ];
  /** newFieldFacility */
  newFieldFacility: Array<any> = [''];
  /** descriptionOfKitchen */
  descriptionOfKitchen = '';
  /** contentnewFieldBathroom */
  contentnewFieldBathroom: string = '';
  /** contentnewFieldLivingRoomDetails */
  contentnewFieldLivingRoomDetails: string = '';
  /** descriptionOfSpecialFeatures */
  descriptionOfSpecialFeatures: string = '';
  /** descriptionOfFacility */
  descriptionOfFacility: string = '';
  /** ActionButtonFieldRoomDetails */
  ActionButtonFieldRoomDetails: any = false;
  /** ActionButtonFieldBathroom */
  ActionButtonFieldBathroom: any = [false];
  /** ActionButtonLivingRoomDetailField */
  ActionButtonLivingRoomDetailField: any = [false];
  /** ActionButtonFieldkitchen */
  ActionButtonFieldkitchen: any = false;
  /** ActionButtonFieldSpecialFeatures */
  ActionButtonFieldSpecialFeatures: any = false;
  /** ActionButtonFieldFacility */
  ActionButtonFieldFacility: any = false;
  /** listOfBedRooms */
  listOfBedRooms: Array<object> = [];
  /** create_Apart_Equ */
  create_Apart_Equ: any;
  /** room */
  room: Array<object> = [];
  /** bathroom */
  bathroom: Array<object> = [];
  /** livingRoom */
  livingRoom: Array<object> = [];
  /** kitchen */
  kitchen: Array<object> = [];
  /** SpecialFeatures */
  SpecialFeatures: Array<object> = [];
  /** Facility */
  Facility: Array<object> = [];
  /** room_Tools */
  room_Tools: Array<any> = [''];
  /** ActionButtonField */
  ActionButtonField: any = [false];
  /** LabelKitchen */
  LabelKitchen: object = { text1: 'Kitchen Tool 1' };
  /** apt_UUID */
  apt_UUID: string = '';
  /** n_ofbedRoom */
  @Input() n_ofbedRoom = 0;
  // get id
  @Input() id: string = '';
  /** n_ofToilets */
  @Input() n_ofToilets = 0;
  /** n_ofLiving */
  @Input() n_ofLiving = 0;
  /** jumbToNextSteb */
  @Output() jumbToNextSteb = new EventEmitter<void>();
  /** jumbToPrevSteb */
  @Output() jumbToPrevSteb = new EventEmitter<void>();

  constructor(
    public _ApartmentService: ApartmentService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    public router: Router
  ) {}
  idParamterEdit: any = '';
  ngOnInit() {
    this.idParamterEdit = this._ActivatedRoute.snapshot.params['id'];

    /*if(this.n_ofLiving==0||this.n_ofLiving==null){
      this.n_ofLiving=1
    }*/
    if (this.n_ofToilets == 0 || this.n_ofToilets == null) {
      this.n_ofToilets = 1;
    }
    if (this.n_ofbedRoom == 0 || this.n_ofbedRoom == null) {
      this.n_ofbedRoom = 1;
    }
    if (this.addApartment != 'add new apartments') {
      this.bindCreateApart_Equ();
      // this.edit="EditForm"
      this.getApartmentDetails();
    } else {
      this.bindCreateApart_Equ();
      this.drowNumberOfEntries();
      this.getLocalStorage();
    }
  }

  // get  local storage
  aprt_details_Edit: any;
  getApartmentDetails() {
    this._ApartmentService
      .getApartDetail(this.idParamterEdit)
      .subscribe((res) => {
        this.aprt_details_Edit = res.apartment_Basic_Info;
        this.getDataFromEdit(res);
      });
  }
  getLocalStorage(): void {
    if ('create_Apart_Equ' in localStorage) {
      const data = JSON.parse(localStorage.getItem('create_Apart_Equ')!);
      let parsedData = data;
      this.roomType = [];

      // section of room
      this.arraynewFieldRoomDetails = [];
      let arrRoom = [];
      this.arrNamesbedroom = [];
      this.n_ofbedRoom=parsedData?.rooms_Details.length
      for (let i = 0; i < parsedData?.rooms_Details.length; i++) {
          this.arrNamesbedroom.push(parsedData?.rooms_Details[i].room_Name);
          if(parsedData?.rooms_Details[i].room_Details.length>0)
          for (let j = 0; j < parsedData?.rooms_Details[i].room_Details.length; j++) {
            arrRoom.push(
                parsedData?.rooms_Details[i].room_Details
                [j],
            );
          }
          this.arraynewFieldRoomDetails.push(arrRoom);
          arrRoom = [];

      }

       // section of kitchen
       this.newFieldkitchen = [];
       for (let i = 0; i < parsedData.kitchen_Details.length; i++) {
         this.newFieldkitchen.push(parsedData.kitchen_Details[i]);
       }
           // section of Feature
      this.newFieldSpecialFeatures = [];
      for (let i = 0; i < parsedData.apartment_Features.length; i++) {
        this.newFieldSpecialFeatures.push( parsedData.apartment_Features[i]);
      }

      // section of Facility
      this.newFieldFacility = [];
      for (let i = 0; i < parsedData.apartment_Facilites.length; i++) {
        this.newFieldFacility.push(parsedData.apartment_Facilites[i],
        );
      }
 // section of bathroom
 this.arraynewFieldBathroom = [];
 let arrBathroom = [];
 this.n_ofToilets=parsedData?.bathroom_Details.length;
 for (let i = 0; i < parsedData?.bathroom_Details.length; i++) {
  if(parsedData.bathroom_Details[i]?.bathroom_Details.length>0)
   for (
     let j = 0;
     j < parsedData.bathroom_Details[i]?.bathroom_Details.length;
     j++
   ) {

     arrBathroom.push(
      parsedData.bathroom_Details[i]?.bathroom_Details[j]
     );
   }
   this.arraynewFieldBathroom.push({bathroom_Name:parsedData.bathroom_Details[i].bathroom_Name,bathroom_Details:arrBathroom});

   arrBathroom = [];
 }

 // section of living room
 this.arraynewFieldLivingRoomDetails = [];
 let arrLiving = [];
 this.arrNamesLiving = [];
 for (let i = 0; i < parsedData.room_Tools?.length; i++) {
   if (parsedData.room_Tools[i].room_Type == 'living') {
     this.arrNamesLiving.push(parsedData.room_Tools[i].room_Name);

     for (let j = 0; j < parsedData.room_Tools[i].room_Tools?.length; j++) {
       arrLiving.push(
           parsedData.room_Tools[i].room_Tools[j].tool_Name,
       );
     }
     this.arraynewFieldLivingRoomDetails.push(arrLiving);
     arrLiving = [];
   }
 }



    }
    else
    {
      const data = JSON.parse(localStorage.getItem('apartmentResponse')!);
      let parsedData = data;
      this.arraynewFieldRoomDetails = [];
      this.arrNamesbedroom = [];
      this.n_ofbedRoom=parsedData.rooms_Names.length
      for (let i = 0; i < parsedData.rooms_Names.length; i++) {
          this.arrNamesbedroom.push(parsedData.rooms_Names[i]);
      }
      this.n_ofToilets=0;
let numOfBath=Number(JSON.parse(localStorage.getItem('BathroomNo')!))
this.n_ofToilets=numOfBath;
// this.arraynewFieldBathroom.length=this.n_ofToilets;
//  for (let i = 0; i < numOfBath; i++) {
//    this.arraynewFieldBathroom.push({bathroom_Details:[]});
//     }
    }

  }
  getDataFromEdit(data: any) {
    //  const data =JSON.parse(localStorage.getItem("create_Apart_Equ")!);
    let parsedData = data.apartment_Equipments;
    this.roomType = [];
    // section of room
    this.arraynewFieldRoomDetails = [];
    let arrRoom = [];
    this.arrNamesbedroom = [];
    for (let i = 0; i < parsedData?.rooms_Details.length; i++) {
      this.arrNamesbedroom.push(parsedData?.rooms_Details[i].room_Name);
      if(parsedData?.rooms_Details[i].room_Details.length>0)
      for (let j = 0; j < parsedData?.rooms_Details[i].room_Details.length; j++) {
        arrRoom.push(
            parsedData?.rooms_Details[i].room_Details
            [j],
        );
      }
      this.arraynewFieldRoomDetails.push(arrRoom);
      arrRoom = [];

  }
    // section of bathroom
    this.arraynewFieldBathroom = [];
    let arrBathroom = [];
    for (let i = 0; i < parsedData.bathroom_Details.length; i++) {

      for (
        let j = 0;
        j < parsedData.bathroom_Details[i].bathroom_Details.length;
        j++
      ) {

        arrBathroom.push(
         parsedData.bathroom_Details[i].bathroom_Details[j]
        );
      }
      this.arraynewFieldBathroom.push({bathroom_Name:parsedData.bathroom_Details[i].bathroom_Name,bathroom_Details:arrBathroom});
      arrBathroom = [];
    }


    // section of living room
    this.arraynewFieldLivingRoomDetails = [];
    let arrLiving = [];
    this.arrNamesLiving = [];
    for (let i = 0; i < parsedData.rooms_Details.length; i++) {
      // if (
      //   parsedData.rooms[i].room_Type == 'living' ||
      //   parsedData.rooms[i].room_Type == 'Living'
      // ) {
        this.arrNamesLiving.push(parsedData.rooms_Details[i].room_Name);

        for (let j = 0; j < parsedData.rooms_Details[i].room_Details.length; j++) {
          arrLiving.push({
            label: 'room detail' + (j + 1),
            contentnewFieldLivingRoomDetails:
              parsedData.rooms_Details[i].room_Details[j],
          });
        // }
        this.arraynewFieldLivingRoomDetails.push(arrLiving);
        arrLiving = [];
      }
    }

    // section of Feature
    this.newFieldSpecialFeatures = [];
    for (let i = 0; i < parsedData.apartment_Features.length; i++) {
        this.newFieldSpecialFeatures.push( parsedData.apartment_Features[i],
        );
    }

    // section of Facility
    this.newFieldFacility = [];
    for (let i = 0; i < parsedData.apartment_Facilites.length; i++) {
        this.newFieldFacility.push(parsedData.apartment_Facilites[i]);
    }

    // section of kitchen
    this.newFieldkitchen = [];
    for (let i = 0; i < parsedData.kitchen_Details.length; i++) {
        this.newFieldkitchen.push( parsedData.kitchen_Details[i]);
    }
  }

  drowNumberOfEntries() {
    for (let i = 0; i < this.n_ofbedRoom; i++) {
      this.arraynewFieldRoomDetails[i] = [
        { label: 'Room Detail 1', contentnewFieldRoomDetails: '' },
      ];
    }
    for (let i = 0; i < this.n_ofToilets; i++) {
      this.arraynewFieldBathroom[i] = [
        { label: 'Bathroom  Tool 1', contentnewFieldBathroom: '' },
      ];
    }
    for (let i = 0; i < this.n_ofLiving; i++) {
      this.arraynewFieldLivingRoomDetails[i] = [
        { label: 'Living Room Detail 1', contentnewFieldLivingRoomDetails: '' },
      ];
    }
  }
  selectedfromDropDownRoom(value: any, index: number): void {
    this.roomType[index] = value;
  }

  saveActionButtonFieldkitchen(index: any) {
    this.newFieldkitchen.push(index);
  }

  saveActionButtonFieldSpecialFeatures(index: any) {
    this.newFieldSpecialFeatures.push(index);
  }

  saveActionButtonFieldFacility(index: any) {
    this.newFieldFacility.push(index);
  }

  /**
   * submitSecondForm
   * @description Emit an event to the parent component
   * @returns void
   */
  submitSecondForm(): void {
    this.jumbToNextSteb.emit();
  }

  /**
   * PrevPage
   * @description Emit an event to the parent component
   * @returns void
   */
  PrevPage(): void {
    this.jumbToPrevSteb.emit();
  }
  getrange(n: number): number[] {
    return Array.from({ length: n });
  }
  rooms() {
    for (let i = 1; i <= this.n_ofbedRoom; i++) {
      this.listOfBedRooms.push([{}]);
    }
  }
  bindCreateApart_Equ(): void {
    this.create_Apart_Equ = new FormGroup({
      room_Name: new FormControl(''),
      room_Type: new FormControl(''),
      room_Tools: new FormControl(''),
      bath_Name: new FormControl(''),
      bath_Tool: new FormControl(''),
      kitchen_Tools: new FormControl(''),
      apt_Feature: new FormControl(''),
      apt_Facilities: new FormControl(''),
    });
  }
  Create_Apart_Equipment(data: any) {
    this.room = [];
    this.bathroom = [];
    this.livingRoom = [];
    for (let j = 0; j < this.arraynewFieldRoomDetails.length; j++) {
      let obj = {
        room_Name: this.arrNamesbedroom[j],
      };
      let arr: any = [];
     this.arraynewFieldRoomDetails[j].forEach((res: any) => {
        arr.push( res);
      });
      let id=JSON.parse(localStorage.getItem('apartmentResponse')!).rooms_IDs[j]
      this.room.push({
        room_ID:id,
        ...obj,
        room_Details: arr,
      });
    }
    for (let j = 0; j < this.n_ofToilets; j++) {
      let obj = {
        bathroom_Name: 'Bathroom '+ (j+1),
      };
      let arr: any = [];
      if (this.arraynewFieldBathroom[j]?.hasOwnProperty('bathroom_Details'))
      Array.from(this.arraynewFieldBathroom[j].bathroom_Details).forEach((res: any) => {
        arr.push(res);
      });
      this.bathroom.push({
        ...obj,
        bathroom_Details: arr,
      });
    }
    this.livingRoom = [];

    for (let j = 0; j <this.n_ofbedRoom; j++) {
      let name=JSON.parse(localStorage.getItem('apartmentResponse')!).rooms_Names[j]
      let obj = {
        room_Name: name,
      };
      let arr: any = [];
      if (this.arraynewFieldLivingRoomDetails[j]>0)
      Array.from(this.arraynewFieldLivingRoomDetails[j].room_Details).forEach((res: any) => {
        arr.push( res.contentnewFieldLivingRoomDetails );
      });
      // this.livingRoom.push({
      //  living_Tool: arr
      // })
      let id=JSON.parse(localStorage.getItem('apartmentResponse')!).rooms_IDs[j]
      const existingItem = this.room.find((item:any) => item.room_ID === id);
  if (!existingItem) {
      this.room.push({
        room_ID:id,
        ...obj,
        room_Details: arr,
      });
  }

    }

    // this._ApartmentService.AddBathRoomTools(this.bathroom).subscribe(res => { })
    let kitchenDesc: any = [];
    this.newFieldkitchen.forEach((element) => {
      kitchenDesc.push( element);
    });
    // this._ApartmentService.AddKitchenTools(this.kitchen).subscribe(res => { })
    let feature: any = [];
    this.newFieldSpecialFeatures.forEach((element) => {
      feature.push(element);
    });
    // this._ApartmentService.AddFeatures(this.SpecialFeatures).subscribe(res => { })
    let otherFacility: any = [];
    this.newFieldFacility.forEach((element) => {
      otherFacility.push( element);
    });
    kitchenDesc = kitchenDesc.filter((item:any) => item !== '');
    feature = feature.filter((item:any) => item !== '');
    otherFacility = otherFacility.filter((item:any) => item !== '');
    let objectData = {
      apartment_ID:JSON.parse(localStorage.getItem('apartmentResponse')!).uuid,
      rooms_Details: this.room,
      bathroom_Details: this.bathroom,
      // "livigroom":this.livingRoom,
      kitchen_Details: kitchenDesc,
      apartment_Features: feature,
      apartment_Facilites: otherFacility,
    };

    if (this.addApartment != 'add new apartments') {
      this._ApartmentService
        .createPostSec2(objectData)
        .subscribe(
          (res) => {
            localStorage.setItem(
              'create_Apart_Equ',
              JSON.stringify(objectData)
            );

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `${'Success Second Step'}`,
            });
            this.submitSecondForm();
          },
          (err: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${err.error.message[0]}`,
            });
          }
        );
    } else {
      this._ApartmentService.createPostSec2(objectData).subscribe(
        (res) => {
          localStorage.setItem('create_Apart_Equ', JSON.stringify(objectData));

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${'Success Second Step'}`,
          });
          this.submitSecondForm();
        },
        (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${err.error.message[0]}`,
          });
        }
      );
    }
    this.room = [];
    this.bathroom = [];
    this.livingRoom = [];
  }
  savebutton(index: number) {
    this.ActionButtonField[index] = true;
  }

  RemoveActionButton(index: number) {
    this.ActionButtonField[index] = false;
  }
  saveActionButton(index: number) {
    if (!Array.isArray(this.arraynewFieldRoomDetails[index])) {
      this.arraynewFieldRoomDetails[index] = [];
    }
    if (! this.arraynewFieldRoomDetails[index].hasOwnProperty('room_Details')) {
      // If the key doesn't exist, initialize it as an empty array
      this.arraynewFieldBathroom[index] = {
        ... this.arraynewFieldRoomDetails[index],
        room_Details: []
      };
    }
      this.arraynewFieldRoomDetails[index].push( this.contentnewFieldRoomDetails);
    this.contentnewFieldRoomDetails = '';

    this.ActionButtonField[index] = false;
  }
  RemoveLivingRoomDetailsActionButton(index: number) {
    this.ActionButtonLivingRoomDetailField[index] = false;
  }
  saveLivingRoomDetailsActionButton(index: number) {
    if (!Array.isArray(this.arraynewFieldLivingRoomDetails[index])) {
      this.arraynewFieldLivingRoomDetails[index] = [];
    }

    this.arraynewFieldLivingRoomDetails[index].push({
      label: `room detail ${
        this.arraynewFieldLivingRoomDetails[index].length + 1
      }`,
      contentnewFieldLivingRoomDetails: this.contentnewFieldLivingRoomDetails,
    });

    this.contentnewFieldLivingRoomDetails = '';

    this.ActionButtonLivingRoomDetailField[index] = false;
  }
  RemoveActionButtonnewFieldBathroom(index: number) {
    this.ActionButtonFieldBathroom[index] = false;
  }
  saveActionButtonnewFieldBathroom(index: number) {

    // if (!Array.isArray(this.arraynewFieldBathroom[index])) {
    //   this.arraynewFieldBathroom[index] = [];
    // }
    if (! this.arraynewFieldBathroom[index].hasOwnProperty('bathroom_Details')) {
      // If the key doesn't exist, initialize it as an empty array
      this.arraynewFieldBathroom[index] = {
        ... this.arraynewFieldBathroom[index],
        bathroom_Details: []
      };
    }
    this.arraynewFieldBathroom[index].bathroom_Details.push(this.contentnewFieldBathroom);
    this.contentnewFieldBathroom = '';
    this.ActionButtonFieldBathroom[index] = false;
  }
  saveActionButtonnewFieldKitchen() {
    this.newFieldkitchen.push(this.descriptionOfKitchen);
    this.descriptionOfKitchen = '';
    this.ActionButtonFieldkitchen = false;
  }
  saveActionButtonnewFieldSpecialFeatures() {
    this.newFieldSpecialFeatures.push( this.descriptionOfSpecialFeatures,
    );
    this.descriptionOfSpecialFeatures = '';
    this.ActionButtonFieldSpecialFeatures = false;
  }
  saveActionButtonnewFieldSpecialFecility() {
    this.newFieldFacility.push( this.descriptionOfFacility,
    );
    this.descriptionOfFacility = '';
    this.ActionButtonFieldFacility = false;
  }
  arrNamesLiving: any = [];
  modelChanged(inputName: any) {
    this.arrNamesLiving.push(this.Living_name);
  }
  arrNamesbedroom: any = [];
  modelChanged1(inputName: any) {
    this.arrNamesbedroom.push(this.Room_name);
  }
  Room_name: any;
  Living_name: any;
  gotopage() {
    let url: string = 'apartments';
    this.router.navigateByUrl(url);
  }
}
