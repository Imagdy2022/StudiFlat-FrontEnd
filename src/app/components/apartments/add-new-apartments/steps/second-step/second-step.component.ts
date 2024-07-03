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
  newFieldkitchen: Array<any> = [{ label: 'Kitchen Tool 1', description: '' }];
  newFieldkitchenToApi:any[]=[];
  /** newFieldSpecialFeatures */
  newFieldSpecialFeatures: Array<any> = [
    { label: 'Feature 1', description: '' },
  ];
  newFieldSpecialFeaturesToApi:any[]=[]
  /** newFieldFacility */
  newFieldFacility: Array<any> = [{ label: 'Facility 1', description: '' }];
  newFieldFacilityToApi:any[]=[];
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
  apt_UUID: string = '';
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
  ) {}

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
      console.log(data);
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
      this.arraynewFieldBathroom = [];
      let arrBathroom = [];
      for (let i = 0; i < data.bathroom_Details.length; i++) {
        for (let j = 0; j < data.bathroom_Details[i].bathroom_Tools.length; j++) {
          arrBathroom.push({
            label: 'bathroom Tool ' + (j + 1),
            contentnewFieldBathroom: data.bathroom_Details[i].bathroom_Tools[j],
          });
        }
        this.arraynewFieldBathroom.push(arrBathroom);
        arrBathroom = [];
      }

      // Section of living room
      this.arraynewFieldLivingRoomDetails = [];
      let arrLiving = [];
      this.arrNamesLiving = [];
      for (let i = 0; i < data.livingRoom_Details.length; i++) {
        this.arrNamesLiving.push(data.livingRoom_Details[i].livingRoom_Name);
        for (let j = 0; j < data.livingRoom_Details[i].livingRoom_Tools.length; j++) {
          arrLiving.push({
            label: 'living room detail ' + (j + 1),
            contentnewFieldLivingRoomDetails: data.livingRoom_Details[i].livingRoom_Tools[j],
          });
        }
        this.arraynewFieldLivingRoomDetails.push(arrLiving);
        arrLiving = [];
      }

      // Section of kitchen
      this.newFieldkitchen = [];
      for (let i = 0; i < data.kitchen_Details.length; i++) {
        this.newFieldkitchen.push({
          label: 'kitchen tool ' + (i + 1),
          description: data.kitchen_Details[i].description,
        });
        this.newFieldkitchenToApi.push(data.kitchen_Details[i].description)
      }

      // Section of special features
      this.newFieldSpecialFeatures = [];
      this.newFieldSpecialFeaturesToApi=[];
      for (let i = 0; i < data.specialFeatures_Details.length; i++) {
        this.newFieldSpecialFeatures.push({
          label: 'Feature ' + (i + 1),
          description: data.specialFeatures_Details[i].description,
        });
        this.newFieldSpecialFeaturesToApi.push(data.specialFeatures_Details[i].description)

      }

      // Section of facilities
      this.newFieldFacility = [];
      for (let i = 0; i < data.facilities_Details.length; i++) {
        this.newFieldFacility.push({
          label: 'Facility ' + (i + 1),
          description: data.facilities_Details[i].description,
        });
        this.newFieldFacilityToApi.push(data.facilities_Details[i].description)
      }
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
    for (let i = 0; i < parsedData.bath_Room.length; i++) {
      for (let j = 0; j < parsedData.bath_Room[i].bath_Tools.length; j++) {
        arrBathroom.push({
          label: 'bathroom Tool ' + (j + 1),
          contentnewFieldBathroom:
            parsedData.bath_Room[i].bath_Tools[j],
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

    // Section of special features
    this.newFieldSpecialFeatures = [];
    this.newFieldSpecialFeaturesToApi=[];
    for (let i = 0; i < parsedData.features.length; i++) {
      for (let j = 0; j < parsedData.features[i].fet_Names.length; j++) {
        this.newFieldSpecialFeatures.push({
          label: 'Feature ' + (i + 1),
          description: parsedData.features[i].fet_Names[j].description,
        });
        this.newFieldSpecialFeaturesToApi.push(data.specialFeatures_Details[i].description)

      }
    }

    // Section of facilities
    this.newFieldFacility = [];
    for (let i = 0; i < parsedData.facilities.length; i++) {
      for (let j = 0; j < parsedData.facilities[i].fac_Names.length; j++) {
        this.newFieldFacility.push({
          label: 'Facility ' + (i + 1),
          description: parsedData.facilities[i].fac_Names[j].description,
        });
        this.newFieldFacilityToApi.push(data.facilities_Details[i].description)

      }
    }

    // Section of kitchen
    this.newFieldkitchen = [];
    for (let i = 0; i < parsedData.kitchen_Details.length; i++) {
      for (let j = 0; j < parsedData.kitchen_Details[i].kit_tool.length; j++) {
        this.newFieldkitchen.push({
          label: 'kitchen tool ' + (i + 1),
          description: parsedData.kitchen_Details[i].kit_tool[j].description,
        });
        this.newFieldkitchenToApi.push(data.kitchen_Details[i].description)

      }
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
        { label: 'Bathroom Tool 1', contentnewFieldBathroom: '' },
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
      this.arraynewFieldBathroom[j].forEach((res: any) => {
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

    let kitchenDesc: any = [];
    this.newFieldkitchen.forEach((element) => {
      kitchenDesc.push({ description: element.description });
      this.newFieldkitchenToApi.push(element.description);

    });

    let feature: any = [];
    this.newFieldSpecialFeatures.forEach((element) => {
      feature.push({ description: element.description });
      this.newFieldSpecialFeaturesToApi.push(element.description);

    });

    let otherFacility: any = [];
    this.newFieldFacility.forEach((element) => {
      otherFacility.push({ description: element.description });
      this.newFieldFacilityToApi.push(element.description);
    });

    let objectData = {
      rooms_Details: this.room,
      bathroom_Details: this.bathroom,
      kitchen_Details: this.newFieldkitchenToApi,
      apartment_Features:this.newFieldSpecialFeaturesToApi,
      apartment_Facilites: this.newFieldFacilityToApi,
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
    this.newFieldkitchen.push({
      label: `kitchen tool ${this.newFieldkitchen.length + 1}`,
      description: this.descriptionOfKitchen,
    });
    this.descriptionOfKitchen = '';
    this.ActionButtonFieldkitchen = false;
  }

  saveActionButtonnewFieldSpecialFeatures() {
    this.newFieldSpecialFeatures.push({
      label: `Feature ${this.newFieldSpecialFeatures.length + 1}`,
      description: this.descriptionOfSpecialFeatures,
    });
    this.descriptionOfSpecialFeatures = '';
    this.ActionButtonFieldSpecialFeatures = false;
  }

  saveActionButtonnewFieldSpecialFecility() {
    this.newFieldFacility.push({
      label: `Feature ${this.newFieldFacility.length + 1}`,
      description: this.descriptionOfFacility,
    });
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
