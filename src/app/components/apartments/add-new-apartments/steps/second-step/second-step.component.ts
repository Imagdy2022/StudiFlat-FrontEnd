import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApartmentService } from '../../../../../_services/apartments/apartment.service';
import { OnwerService } from 'src/app/_services/Onwers/onwer.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  newFieldkitchen: Array<any> = [];
  /** newFieldSpecialFeatures */
  newFieldSpecialFeatures: Array<any> = [];
  /** newFieldFacility */
  newFieldFacility: Array<any> = [];
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
  /** rooms_Details */
  rooms_Details: Array<object> = [];
  /** ActionButtonField */
  ActionButtonField: any = [false];
  /** LabelKitchen */
  LabelKitchen: object = { text1: 'Kitchen Tool 1' };
  /** apt_UUID */
  apt_UUID: any;
  subscriptions: Subscription[] = [];
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
  ) {
    this.apt_UUID = localStorage.getItem('Apartment_ID');
  }

  idParamterEdit: any = '';

  ngOnInit() {
    this.idParamterEdit = this._ActivatedRoute.snapshot.params['id'];

    if (this.n_ofToilets == 0 || this.n_ofToilets == null) {
      this.n_ofToilets = 1;
    }
    if (this.n_ofbedRoom == 0 || this.n_ofbedRoom == null) {
      this.n_ofbedRoom = 1;
    }
    if (this.addApartment != 'add new apartments') {
      this.bindCreateApart_Equ();
      this.getApartmentDetails();
    } else {
      this.bindCreateApart_Equ();
      this.drowNumberOfEntries();
      this.getLocalStorage();
    }
  }

  aprt_details_Edit: any;
  getApartmentDetails() {
    this.subscriptions.push(this._ApartmentService
      .getApartDetail(this.idParamterEdit)
      .subscribe((res) => {
        this.aprt_details_Edit = res.general_Info;
        this.getDataFromEdit(res);
      }));

  }

  getLocalStorage(): void {
    if ('apartmentResponse' in localStorage) {
      const data = JSON.parse(localStorage.getItem('apartmentResponse')!);
      this.roomType = [];

      // Section of room
      this.arraynewFieldRoomDetails = [];
      let arrRoom = [];
      this.arrNamesbedroom = [];
      for (let i = 0; i < data.rooms_Names.length; i++) {
        if (data.rooms_Names[i] == 'single') {
          this.arrNamesbedroom.push(data.rooms_Names[i]);
          for (let j = 0; j < data.rooms_IDs.length; j++) {
            arrRoom.push({
              label: 'room detail ' + (j + 1),
              contentnewFieldRoomDetails: data.rooms_IDs[j],
            });
          }
          this.arraynewFieldRoomDetails.push(arrRoom);
          this.roomType[i] = 'bedroom';
          arrRoom = [];
        }
      }

      // Section of bathroom
      // this.arraynewFieldBathroom = [];
      // let arrBathroom = [];
      // for (let i = 0; i < data.bathroom_Details?.length; i++) {
      //   for (let j = 0; j < data.bathroom_Details[i]?.bathroom_Details?.length; j++) {
      //     arrBathroom.push({
      //       label: 'bathroom Tool ' + (j + 1),
      //       contentnewFieldBathroom: data.bathroom_Details[i]?.bathroom_Details[j],
      //     });
      //   }
      //   this.arraynewFieldBathroom.push(arrBathroom);
      //   arrBathroom = [];
      // }

      // // Section of living room
      // this.arraynewFieldLivingRoomDetails = [];
      // let arrLiving = [];
      // this.arrNamesLiving = [];
      // for (let i = 0; i < data.livingRoom_Details.length; i++) {
      //   this.arrNamesLiving.push(data.livingRoom_Details[i].livingRoom_Name);
      //   for (let j = 0; j < data.livingRoom_Details[i].livingRoom_Tools.length; j++) {
      //     arrLiving.push({
      //       label: 'living room detail ' + (j + 1),
      //       contentnewFieldLivingRoomDetails: data.livingRoom_Details[i].livingRoom_Tools[j],
      //     });
      //   }
      //   this.arraynewFieldLivingRoomDetails.push(arrLiving);
      //   arrLiving = [];
      // }

      // // Section of kitchen
      // this.newFieldkitchen = [];
      // for (let i = 0; i < data.kitchen_Details.length; i++) {
      //   this.newFieldkitchen.push(data.kitchen_Details[i]);
      // }

      // // Section of special apartment_Features
      // this.newFieldSpecialFeatures = [];
      // for (let i = 0; i < data.specialFeatures_Details.length; i++) {
      //   this.newFieldSpecialFeatures.push(data.specialFeatures_Details[i]);
      // }

      // // Section of apartment_Facilites
      // this.newFieldFacility = [];
      // for (let i = 0; i < data.facilities_Details.length; i++) {
      //   this.newFieldFacility.push(data.facilities_Details[i]);
      // }
    }
  }

  getDataFromEdit(data: any) {
    let parsedData = data;
    this.roomType = [];
    // Section of room
    this.arraynewFieldRoomDetails = [];
    let arrRoom = [];
    this.arrNamesbedroom = [];
    for (let i = 0; i < parsedData.rooms.length; i++) {
      if (
        parsedData.rooms[i].room_Type == 'bedroom' ||
        parsedData.rooms[i].room_Type == 'Bedroom'
      ) {
        this.arrNamesbedroom.push(parsedData.rooms[i].room_Name);
        for (let j = 0; j < parsedData.rooms[i].rooms_Details.length; j++) {
          arrRoom.push({
            label: 'room detail ' + (j + 1),
            contentnewFieldRoomDetails:
              parsedData.rooms[i].rooms_Details[j],
          });
        }
        this.arraynewFieldRoomDetails.push(arrRoom);
        this.roomType[i] = parsedData.rooms[i].room_Type;
        arrRoom = [];
      }
    }

    // Section of bathroom
    this.arraynewFieldBathroom = [];
    let arrBathroom = [];
    for (let i = 0; i < parsedData.bathroom_Details.length; i++) {
      for (let j = 0; j < parsedData.bathroom_Details[i].bathroom_Details.length; j++) {
        arrBathroom.push({
          label: 'bathroom Tool ' + (j + 1),
          contentnewFieldBathroom:
            parsedData.bathroom_Details[i].bathroom_Details[j],
        });
      }
      this.arraynewFieldBathroom.push(arrBathroom);
      arrBathroom = [];
    }

    // Section of living room
    this.arraynewFieldLivingRoomDetails = [];
    let arrLiving = [];
    this.arrNamesLiving = [];
    for (let i = 0; i < parsedData.rooms.length; i++) {
      if (
        parsedData.rooms[i].room_Type == 'living' ||
        parsedData.rooms[i].room_Type == 'Living'
      ) {
        this.arrNamesLiving.push(parsedData.rooms[i].room_Name);
        for (let j = 0; j < parsedData.rooms[i].rooms_Details.length; j++) {
          arrLiving.push({
            label: 'room detail ' + (j + 1),
            contentnewFieldLivingRoomDetails:
              parsedData.rooms[i].rooms_Details[j],
          });
        }
        this.arraynewFieldLivingRoomDetails.push(arrLiving);
        arrLiving = [];
      }
    }

    // Section of special apartment_Features
    this.newFieldSpecialFeatures = [];
    for (let i = 0; i < parsedData.apartment_Features.length; i++) {
        this.newFieldSpecialFeatures.push(parsedData.apartment_Features[i]);
      }

    // Section of apartment_Facilites
    this.newFieldFacility = [];
    for (let i = 0; i < parsedData.apartment_Facilites.length; i++) {
        this.newFieldFacility.push(parsedData.apartment_Facilites[i]);
    }


    // Section of kitchen
    this.newFieldkitchen = [];
    for (let i = 0; i < parsedData.kitchen_Details.length; i++) {
        this.newFieldkitchen.push(parsedData.kitchen_Details[i]);
    }

  }


  drowNumberOfEntries() {
    for (let i = 0; i < this.n_ofbedRoom; i++) {
      this.arraynewFieldRoomDetails[i] = [
        { label: 'Room Detail 1', contentnewFieldRoomDetails: '' },
      ];
    }
    for (let i = 0; i < this.n_ofToilets; i++) {
      this.arraynewFieldBathroom = [
        { label: 'Bathroom Tool 1' },
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

  submitSecondForm(): void {
    this.jumbToNextSteb.emit();
  }

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
      apartment_ID: new FormControl(''),
      room_Name: new FormControl(''),
      rooms_Details: new FormControl(''),
      bathroom_Name: new FormControl(''),
      bathroom_Details: new FormControl(''),
      kitchen_Details: new FormControl(''),
      apartment_Features: new FormControl(''),
      apartment_Facilites: new FormControl(''),
    });
  }

  Create_Apart_Equipment(data: any) {
    this.room = [];
    this.bathroom = [];
    this.livingRoom = [];
    for (let j = 0; j < this.arraynewFieldRoomDetails.length; j++) {
      let obj = {
        room_Name: this.arrNamesbedroom[j],
        room_Type: 'bedroom',
      };
      let arr: any = [];
      this.arraynewFieldRoomDetails[j].forEach((res: any) => {
        arr.push(res.contentnewFieldRoomDetails);
      });
      this.room.push({
        ...obj,
        rooms_Details: arr,
      });
    }

    for (let j = 0; j < this.arraynewFieldBathroom.length; j++) {
      let obj = {
        bathroom_Name: 'Bathroom Tool',
      };
      let arr: any = [];
      this.arraynewFieldBathroom.forEach((res: any) => {
        arr.push(res.contentnewFieldBathroom);
      });
      this.bathroom.push({
        ...obj,
        bathroom_Details: arr,
      });
    }

    for (let j = 0; j < this.arraynewFieldLivingRoomDetails.length; j++) {
      let obj = {
        room_Name: this.arrNamesLiving[j],
        room_Type: 'living',
      };
      let arr: any = [];
      this.arraynewFieldLivingRoomDetails[j].forEach((res: any) => {
        arr.push(res.contentnewFieldLivingRoomDetails);
      });
      this.room.push({
        ...obj,
        rooms_Details: arr,
      });
    }


    // this.newFieldkitchen.forEach((element) => {
    //   kitchenDesc.push(element);
    // });

  let kitchenDesc: any = [];
    for (let j = 0; j < this.newFieldkitchen.length; j++) {
      let arr: any = [];
      this.newFieldkitchen[j].forEach((res: any) => {
        arr.push(res);
      });
      kitchenDesc.push(arr);
    }

    let feature: any = [];
    this.newFieldSpecialFeatures.forEach((element) => {
      feature.push(element);
    });

    let otherFacility: any = [];
    this.newFieldFacility.forEach((element) => {
      otherFacility.push(element);
    });

    let objectData = {
      apartment_ID : this.apt_UUID,
      rooms_Details: this.room,
      bathroom_Details: this.bathroom,
      kitchen_Details: kitchenDesc,
      apartment_Features: feature,
      apartment_Facilites: otherFacility,
    };

    if (this.addApartment != 'add new apartments') {
      this.subscriptions.push(this._ApartmentService
        .createPostSec2(objectData)
        .subscribe(
          (res) => {
            localStorage.setItem('create_Apart_Equ', JSON.stringify(objectData));

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `${res.message}`,
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
        ));
    } else {
      this.subscriptions.push(this._ApartmentService.createPostSec2(objectData).subscribe(
        (res) => {
          localStorage.setItem('create_Apart_Equ', JSON.stringify(objectData));

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${res.message}`,
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
      ));
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

    this.arraynewFieldRoomDetails[index].push({
      label: `room detail ${this.arraynewFieldRoomDetails[index].length + 1}`,
      contentnewFieldRoomDetails: this.contentnewFieldRoomDetails,
    });

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
      label: `room detail ${this.arraynewFieldLivingRoomDetails[index].length + 1}`,
      contentnewFieldLivingRoomDetails: this.contentnewFieldLivingRoomDetails,
    });

    this.contentnewFieldLivingRoomDetails = '';
    this.ActionButtonLivingRoomDetailField[index] = false;
  }

  RemoveActionButtonnewFieldBathroom(index: number) {
    this.ActionButtonFieldBathroom[index] = false;
  }

  saveActionButtonnewFieldBathroom(index: number) {
    if (!Array.isArray(this.arraynewFieldBathroom[index])) {
      this.arraynewFieldBathroom[index] = [];
    }

    this.arraynewFieldBathroom[index].push({
      label: `room detail ${this.arraynewFieldBathroom[index].length + 1}`,
      contentnewFieldBathroom: this.contentnewFieldBathroom,
    });

    this.contentnewFieldBathroom = '';
    this.ActionButtonFieldBathroom[index] = false;
  }

  saveActionButtonnewFieldKitchen() {
    this.newFieldkitchen.push(this.descriptionOfKitchen);
    this.descriptionOfKitchen = '';
    this.ActionButtonFieldkitchen = false;
  }

  saveActionButtonnewFieldSpecialFeatures() {
    this.newFieldSpecialFeatures.push(this.descriptionOfSpecialFeatures);
    this.descriptionOfSpecialFeatures = '';
    this.ActionButtonFieldSpecialFeatures = false;
  }

  saveActionButtonnewFieldSpecialFecility() {
    this.newFieldFacility.push(this.descriptionOfFacility);
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

  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
