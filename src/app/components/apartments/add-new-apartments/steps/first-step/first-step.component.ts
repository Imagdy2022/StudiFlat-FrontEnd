import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApartmentService } from '../../../../../_services/apartments/apartment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IOnwer } from 'src/app/models/onwer';
import { MessageService } from 'primeng/api';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { FileUpload } from 'primeng/fileupload';
import { Observable, Subscription, concatMap, map, range } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FirstStepComponent implements OnInit {
  /** CreateContract */
  CreateContract: string = '';
  /** Createapartmentcurre */
  Createapartmentcurre: string = '';
  /** bills */
  bills: string = 'Yes';
  billinclude: any = true;
  /** listRadiobutton */
  listRadiobutton: Array<string> = ['Yes', 'No'];
  apartmentSharedArea: Array<string> = ['Yes', 'No'];
  sleepingArea: Array<string> = ['No sleeping area', 'Bed','Sofa bed'];
  defaultSleepingArea="No sleeping area";
  defaultapartmentSharedArea="Yes";
  SharedAreaInclude: any = true;
  /** listDropDownArea */
  listDropDownArea: any = [];
  /** selectedOwner */
  selectedOwner: IOnwer | any = null;
  /** listDropDownFloor */
  listDropDownFloor: any = [];
  /** listDropDownApartmentnumber */
  listDropDownApartmentnumber: any = [];
  /** listDropDownPropertyowner */
  listDropDownPropertyowner: Array<any> = [];
  /** listDropDownApartmentType */
  listDropDownApartmentType: any = [];
  /** listDropDownElevator */
  listDropDownElevator: any = [];
  NoOfBedrooms:number = 0;
  /** LabelTransport */
  LabelTransport: object = {
    text1: 'Transport name',
    text2: 'Transport distance',
  };
  /**  addApartment */
  @Input() addApartment: string = '';
  /**  jumbToNextSteb */
  @Output() jumbToNextSteb = new EventEmitter<void>();
  // get Id
  @Output() getId = new EventEmitter<string>();
  /**  jumbToPrevSteb */
  @Output() jumbToPrevSteb = new EventEmitter<void>();
  /** data of general info in form*/
  @Output() jumbToNextSteb2n_ofbedroom = new EventEmitter<number>();
  /** jumbToNextSteb2_apt_Toilets */
  @Output() jumbToNextSteb2_apt_Toilets = new EventEmitter<number>();
  /** jumbToNextSteb2_n_ofLiving */
  @Output() jumbToNextSteb2_n_ofLiving = new EventEmitter<number>();
  /** generalInfoForm */
  generalInfoForm!: FormGroup;
  /**  data of transport in form */
  Createtransport: Array<any> = [];
  bedrooms: number[] = [];
  /** transport_Name */
  transport_Name: string = '';
  /** transport_Distance */
  transport_Distance: string = '';
  Bedrooms:string;
  /** apartment_ID */
  apartment_ID: any = '';
  @Input() id: string = '';
  /** n_ofbedroom */
  n_ofbedroom: number = 0;
  /** apartment_BathroomNo */
  apartment_BathroomNo: number = 0;
  /** n_ofLiving */
  n_ofLiving: number = 0;
  /** apt_imgs */
  apt_imgs: any = [];
  /** uploadedFiles */
  uploadedFiles: any[] = [];
  subscriptions:Subscription[] = [];
  // transport in local storage
  localapt_Transports: Array<any> = [];
  // show none dropdown
  showNone: boolean = false;
  holder: any = '';
  selectArea = 'Select Area';
  selectFloor = 'Select Floor';
  Apartmentnumber = ' Select Apartment number';
  Propertyowner = 'Select Property owner';
  apartmenttype = 'Select apartment type';
  Elevator = 'Select Elevator';
  display = 'none';
  idParamterEdit: any = '';
  edit: any = '';
  storedImages: any;
  display11:boolean=false;
  constructor(
    private _ApartmentService: ApartmentService,
    private uploadService: UploadFileService,
    private messageService: MessageService,
    private _ActivatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.idParamterEdit = this._ActivatedRoute.snapshot.params['id'];

    if (this.addApartment != 'add new apartments') {
      // this.apartment_ID= localStorage.getItem("apartment_ID");
      //   this.storedImages = JSON.parse(localStorage.getItem("imagesAPT")||'{}');
      this.getAowners();

      this.initFakeData();
      this.bindCreateGeneral();

      this.getArea();
      this.edit = 'EditForm';
      this.getApartmentDetails();
    } else {
      this.edit = '';
      this.apartment_ID = localStorage.getItem('apartment_ID');
      this.storedImages = JSON.parse(localStorage.getItem('imagesAPT') || '{}');
      // this.apt_imgs= JSON.parse(localStorage.getItem("imagesAPT")||'{}');
      this.initFakeData();
      this.bindCreateGeneral();
      this.getAowners();

      this.getArea();

      if (this.id == null || this.id == '') {
        this.getApartmentCode();
        this.storedImages = [];
      } else {
        this.getLocalStorage();
      }
    }
  }
  Address: any = '';
  aprt_details_Edit: any = {};
  apt_types_show: any = '';
  getApartmentDetails() {
    this.subscriptions.push(this._ApartmentService
      .getApartDetail(this.idParamterEdit)
      .subscribe((res) => {
        this.aprt_details_Edit = res.general_Info;
        this.apt_imgs = res.general_Info['property_Imgs'];
        this.billinclude = res.general_Info['apartment_All_Bill_Included'];
        this.generalInfoForm
          .get('apartment_Images')
          ?.patchValue(res.general_Info['property_Imgs']);
          this.subscriptions.push(this._ApartmentService.getOwnerDropList().subscribe((res) => {
            this.listDropDownPropertyowner = res.list;
          }))

        this.generalInfoForm.patchValue(res.general_Info);
        this.Address = res.general_Info['apt_Address'];
        //  this.localapt_Transports=res.trasponrts

        this.Createtransport = res.trasponrts;
      }));

  }
  // get  local storage
  getLocalStorage(): void {
    const data = localStorage.getItem('generalInfoForm');
    const data2 = localStorage.getItem('Createtransport');

    if (data !== null) {
      let parsedData = JSON.parse(data);
      if (parsedData.apartment_Type == 'Apartment') {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      this.generalInfoForm.patchValue(parsedData);
      this.generalInfoForm.get('apartment_Images')?.patchValue(parsedData.apartment_Images);
      this.apt_imgs = parsedData.apartment_Images;
      this.bills = parsedData.bills;

      this.billinclude = parsedData.apartment_All_Bill_Included;

      this.generalInfoForm.get('apartment_Area')?.setValue(parsedData.apartment_Area);
      this.selectedfromDropDownArea(parsedData.apartment_Area, 'update');

      // this.localapt_Transports = parsedData.apartment_Transports;
      this.Createtransport == parsedData.apartment_Transports;
    }
    if (data2 !== null) {
      let parsedData2 = JSON.parse(data2);
      this.Createtransport = parsedData2;
    }
  }
  /**
   * getApartmentCode
   */
  getApartmentCode() {
   this.subscriptions.push(  this._ApartmentService.getApartmentcode().subscribe((res) => {
    this.apartment_ID = res;
    localStorage.setItem('apartment_ID', this.apartment_ID);
  }));

  }

  /**
   * getAowners
   */
  getAowners() {
    this.subscriptions.push(this._ApartmentService.getOwnerDropList().subscribe((res) => {
      this.listDropDownPropertyowner = res.list;
    }));
  }

  /**
   * selectedfromDropDownPropertyowner
   * @param value
   */
  selectedfromDropDownPropertyowner(value: any): void {
    this.generalInfoForm.get('apartment_Owner')?.setValue(value.id);
    localStorage.setItem('apartment_Owner', value.name);
  }

  /**
   * getArea
   */
  getArea() {
    this.subscriptions.push(this._ApartmentService.getAreaDropList().subscribe((res) => {
      this.listDropDownArea = res.list;
    }))

  }

  /**
   * selectedfromDropDownArea
   * @param value
   */
  selectedfromDropDownArea(value: any, ifUpdaa: any): void {
    if (ifUpdaa == 'update') {
      this.generalInfoForm.get('apartment_Area')?.setValue(value);
    } else {
      this.generalInfoForm.get('apartment_Area')?.setValue(value.name);
    }
  }

  selectedfromDropDownFloor(value: any): void {
    this.generalInfoForm.get('apartment_Floor')?.setValue(+value.name);
  }
  selectedfromDropDownApartmentnumber(value: any): void {
    this.generalInfoForm.get('apartment_No')?.setValue(+value.name);
  }

  selectedfromDropDownApartmentType(value: any): void {
    this.generalInfoForm.get('apartment_Type')?.setValue(value.name);
    if (value.name == 'Apartment') {
      this.showNone = false;
      this.generalInfoForm.get('apartment_BedRoomsNo')?.setValue(1);
      this.generalInfoForm.get('apartment_BathroomNo')?.setValue(1);
    } else if (value.name == 'Studio') {
      this.generalInfoForm.get('apartment_BedRoomsNo')?.setValue(1);
      this.generalInfoForm.get('apartment_BathroomNo')?.setValue(1);
      this.showNone = true;
    } else {
      this.generalInfoForm.get('apartment_BedRoomsNo')?.setValue(0);
      this.generalInfoForm.get('apartment_BathroomNo')?.setValue(0);
      this.showNone = true;
    }
  }
  selectedfromDropDownElevator(value: any): void {
    this.generalInfoForm
      .get('apartment_Elevator')
      ?.setValue(value.name == 'yes' ? true : false);
  }
  /**
   * onUploadMulti
   */
  onUploadMulti(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  onCloseModalal() {
    this.display = 'none';
  }
  /**
   * onUpload
   * @param event
   */
  onUpload(event: any): void {
    this.uploadedFiles = event.files;
    this.convertFileToFormData(this.uploadedFiles);
    this.subscriptions.push( this.uploadService
      .uploadMultiFile(this.convertFileToFormData(this.uploadedFiles))
      .subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${'Images Upload Successfully'}`,
        });

        for (let file of data) {
          this.apt_imgs.push({ apt_imgs: file.name });
        }
        this.generalInfoForm.get('apt_ThumbImg')?.patchValue(data[0].name);
        this.generalInfoForm.get('apartment_Images')?.patchValue(this.apt_imgs);
      }));
  }

  /**
   * convertFileToFormData
   * @param files
   * @returns FormData
   */
  convertFileToFormData(files: any[]) {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('Files', files[i], files[i].name);
    }

    return formData;
  }

  DoyouCreateContract(value: any) {
    this.CreateContract = value.target.value;
  }
  DoyouCreateapartmentcurre(value: any) {
    this.Createapartmentcurre = value.target.value;
  }

  DoyouCreatebills(value: any) {
    console.log(value.target.value)

    this.bills = value.target.value;
    this.billinclude = value.target.value == 'Yes' ? true : false;
  }

  /**
   * submitFirstForm
   * @description Emit an event to the parent component
   * @returns void
   */
  submitFirstForm(): void {
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

  /**
   * initFakeData
   * @returns void
   */
  initFakeData(): void {
    this.listRadiobutton = ['Yes', 'No'];
    this.apartmentSharedArea = ['Yes', 'No'];
    this.sleepingArea = ['No sleeping area', 'Bed','Sofa bed'];
    this.listDropDownFloor = this.rangefrom0to100();
    this.listDropDownApartmentnumber = this.rangefrom0to100();
    this.listDropDownApartmentType = [
      { name: 'Select Type' },
      { name: 'Apartment' },
      { name: 'Studio' },
    ];
    this.listDropDownElevator = [
      {
        name: 'yes',
      },
      { name: 'no' },
    ];
    this.LabelTransport = {
      text1: 'Transport name',
      text2: 'Transport distance',
    };
  }

  rangefrom0to100(): Array<object> {
    let list = [];
    for (let i = 0; i <= 100; i++) {
      list.push({ name: `${i}` });
    }
    return Array.from(list);
  }

  bindCreateGeneral(): void {
    this.generalInfoForm = new FormGroup({
      apartment_Area: new FormControl('0', [Validators.required]),

      apartment_Floor: new FormControl('0', [Validators.required]),
      apartment_Name: new FormControl('', [Validators.required]),
      apartment_Code: new FormControl(''),
      apartment_No: new FormControl('0', [Validators.required]),
      apartment_Price: new FormControl(0, [Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
      // apt_SecuirtyDep: new FormControl(1, [Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
      apartment_Bill_Descirption: new FormControl(''),
      apartment_StreetName: new FormControl('', [Validators.required]),
      apartment_BuildingName: new FormControl('', [Validators.required]),
      apartment_City: new FormControl('', [Validators.required]),
      apartment_Area_Square: new FormControl(0, [Validators.required]),
      apartment_Images: new FormControl(this.apt_imgs, Validators.required),
      apartment_Description: new FormControl('', [Validators.required]),
      apartment_VideoLink: new FormControl('', [Validators.required]),
      apartment_360DLink: new FormControl('', [Validators.required]),
      apartment_GoogleLocation: new FormControl('', [Validators.required]),
      //  'UUID': new FormControl(this.id ),
      // service_Fees: new FormControl(1, [Validators.required,Validators.pattern(/^[1-9]\d*$/)]),

      apartment_BedRoomsNo: new FormControl(0, [Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
      apartment_BathroomNo: new FormControl(0, [Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
      apartment_All_Bill_Included: new FormControl(true, [Validators.required]), //true
      apartment_Elevator: new FormControl(true, [Validators.required]),
      // 'apartment_Lat': new FormControl('', [Validators.required]),//0
      // 'apartment_Long': new FormControl('', [Validators.required]),//0
      apartment_Type: new FormControl('Select Type', [Validators.required]),
      apartment_Owner: new FormControl('0', [Validators.required]), //string
      apartment_Manager: new FormControl('0', [Validators.required]), //string
      // apt_Status: new FormControl('', [Validators.required]), //Rented
      // apt_ThumbImg: new FormControl('', [Validators.required]),
      apartment_RentBy_Apartment: new FormControl(true, [Validators.required]), //true
      apartment_RentBy_Bed: new FormControl(true, [Validators.required]), //true
      apartment_SharedArea: new FormControl(true, [Validators.required]), //true
      apartment_SleepingArea: new FormControl(null), //string
      apartment_Rooms: new FormControl(null),
        room_Type: new FormControl(null),
        beds_No: new FormControl(0, [Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
        bed_Price: new FormControl(0, [Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
        bed_SecuirtyDeposit: new FormControl(0, [Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
        bed_Service_Fees: new FormControl(0, [Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
        apartment_Transports: new FormControl(null),
        transport_Name: new FormControl(null),
        transport_Distance:new FormControl(null),
    });
  }

  checkValidData() {
    if (this.generalInfoForm.invalid) {
      Object.values(this.generalInfoForm.controls).forEach((control) => {
        control.markAsTouched();
      });

      this.generalInfoForm.setErrors({ required: true });
      return;
    }
  }
  Create_Apart_General(data: any) {
    // this.checkValidData()
    // if(data.value.apt_ThumbImg==''||data.value.apt_ThumbImg==null||data.value.apt_ThumbImg==undefined){
    //      this.generalInfoForm.get('apt_ThumbImg')?.patchValue(this.apt_imgs[0].apt_imgs);
    //      data.value.apt_ThumbImg=this.apt_imgs[0].apt_imgs;
    // }

  let apartment = {
    apartment_ID: this.generalInfoForm.value['apartment_ID'] ?? 0,
    apartment_Area: this.generalInfoForm.value['apartment_Area'],
    apartment_Floor:this.generalInfoForm.value['apartment_Floor'],
    apartment_Name: this.generalInfoForm.value['apartment_Name'],
    apartment_Code: this.generalInfoForm.value['apartment_Code'],
    apartment_Price: this.generalInfoForm.value['apartment_Price'],
    apartment_All_Bill_Included: this.generalInfoForm.value['apartment_All_Bill_Included'],
    apartment_Bill_Descirption: this.generalInfoForm.value['apartment_Bill_Descirption'],
    apartment_StreetName: this.generalInfoForm.value['apartment_StreetName'],
    apartment_BuildingName: this.generalInfoForm.value['apartment_BuildingName'],
    apartment_City: this.generalInfoForm.value['apartment_City'],
    apartment_Area_Square:this.generalInfoForm.value['apartment_Area_Square'],
    apartment_No: this.generalInfoForm.value['apartment_No'],
    apartment_Manager: this.generalInfoForm.value['apartment_Manager'],
    apartment_Owner: this.generalInfoForm.value['apartment_Owner'],
    apartment_Transports:[
      {
        transport_Name: this.generalInfoForm.value['transport_Name'],
        transport_Distance: this.generalInfoForm.value['transport_Distance']
      }],
    apartment_RentBy_Apartment: this.generalInfoForm.value['apartment_RentBy_Apartment'],
    apartment_RentBy_Bed: this.generalInfoForm.value['apartment_RentBy_Bed'],
    apartment_Description: this.generalInfoForm.value['apartment_Description'],
    apartment_Images: this.apt_imgs,
    apartment_VideoLink: this.generalInfoForm.value['apartment_VideoLink'],
    apartment_GoogleLocation: this.generalInfoForm.value['apartment_GoogleLocation'],
    apartment_Lat:  this.center.lat,
    apartment_Long:  this.center.lng,
    apartment_360DLink: this.generalInfoForm.value['apartment_360DLink'],
    apartment_SharedArea:this.generalInfoForm.value['apartment_SharedArea'],
    apartment_SleepingArea: this.generalInfoForm.value['apartment_SleepingArea'],
    apartment_Elevator: this.generalInfoForm.value['apartment_Elevator'],
    apartment_Type: this.generalInfoForm.value['apartment_Type'],
    apartment_BedRoomsNo:this.generalInfoForm.value['apartment_BedRoomsNo'],
    apartment_BathroomNo: this.generalInfoForm.value['apartment_BathroomNo'],
     apartment_Rooms : [
      {
        room_Type: this.generalInfoForm.value['room_Type'],
        beds_No: this.generalInfoForm.value['beds_No'],
        bed_Price: this.generalInfoForm.value['bed_Price'],
        bed_SecuirtyDeposit:this.generalInfoForm.value['bed_SecuirtyDeposit'],
        bed_Service_Fees: this.generalInfoForm.value['bed_Service_Fees'],
      }
    ]
  };

    // data.value.apartment_All_Bill_Included = this.billinclude;
    // data.value.apartment_Lat = 0
    // data.value.apt_Status = 'Rented';

    // this.Createtransport.push({ transport_Name: this.transport_Name, transport_Distance: this.transport_Distance });
    localStorage.setItem(
      'Createtransport',
      JSON.stringify(this.Createtransport)
    );

    localStorage.setItem(
      'generalInfoForm',
      JSON.stringify({
        ...this.generalInfoForm.value,
        apartment_Transports: this.Createtransport,
        bills: this.bills,
      })
    );

    if (this.addApartment != 'add new apartments') {
      this.subscriptions.push( this._ApartmentService
        .createPostSec1(
          { apartment },
        )
        .subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `${res?.message}`,
            });
            this.n_ofbedroom = data.value.apartment_BedRoomsNo;
            this.apartment_BathroomNo = data.value.apartment_BathroomNo;

            this.submitSecondForm();
            this.jumbToNextSteb2n_ofbedroom.emit(this.n_ofbedroom);
            this.jumbToNextSteb2_apt_Toilets.emit(this.apartment_BathroomNo);
            this.jumbToNextSteb2_n_ofLiving.emit(this.n_ofLiving);
            this.getId.emit(res.uuid);
          },
          (err: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err,
            });
          }
        ));

    } else {
      this.subscriptions.push(this._ApartmentService
        .createPostSec1(
          { apartment},
        )
        .subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `${res?.message}`,
            });
            this.n_ofbedroom = data.value.apartment_BedRoomsNo;
            this.apartment_BathroomNo = data.value.apartment_BathroomNo;

            this.submitSecondForm();
            this.jumbToNextSteb2n_ofbedroom.emit(this.n_ofbedroom);
            this.jumbToNextSteb2_apt_Toilets.emit(this.apartment_BathroomNo);
            this.jumbToNextSteb2_n_ofLiving.emit(this.n_ofLiving);
            this.getId.emit(res.uuid);
          },
          (err: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${err?.error?.message[0]}`,
            });
          }
        ));

    }
  }

  /**
   * submitSecondForm
   * @description Emit an event to the parent component
   * @returns void
   */
  submitSecondForm(): void {
    this.jumbToNextSteb.emit();
  }

  transport(value: any): void {
    this.Createtransport.push(value);
  }
  RemoveActionButton(index: number) {
    this.Createtransport.slice(0, index);
  }
  index = 0;
  openModelLocation() {
    this.display = 'block';
  }

  display1: any;
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555,
  };
  zoom = 6;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display1 = event.latLng.toJSON();
    this.center.lat = this.display1.lat;
    this.center.lng = this.display1.lng;
    this.generalInfoForm.get('apartment_Long')?.setValue(this.display1.lng);
    this.generalInfoForm.get('apartment_Lat')?.setValue(this.display1.lat);
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display1 = event.latLng.toJSON();
  }

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  imageInfos?: any = [];
  chooseFile(files: any) {
    this.imageList.push(files[0]);
  }
  urls = new Array<string>();
  counter: number = 0;
  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    let files = event.target.files;

    if (files) {
      if (this.counter + files.length > 4) {
        this.message = 'Only a maximum of 4 files are allowed.';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${this.message}`,
        });
      } else {
        for (let file of files) {
          this.ListFiles.push(file);
          this.counter += 1;
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.urls.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
        this.upload();
      }
    }
    this.ListFiles = [];
  }
  readFile(file: File): Observable<string> {
    return new Observable((obs) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        obs.next(reader.result as string);
        obs.complete();
      };
      reader.readAsDataURL(file);
    });
  }

  ListFiles: any = [];
  imageList: any = {};
  spinner: boolean = false;

  upload(): void {
    this.spinner = true;
    this.subscriptions.push( this.uploadService
      .uploadMultiFile(this.convertFileToFormData(this.ListFiles))
      .subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${'Images Upload Successfully'}`,
        });

        for (let file of data) {
          this.apt_imgs.push({ apt_imgs: file.name });
        }
        // this.generalInfoForm.get('apt_ThumbImg')?.patchValue(data[0].name);
        this.generalInfoForm.get('apartment_Images')?.patchValue(this.apt_imgs);
        localStorage.setItem('imagesAPT', JSON.stringify(this.apt_imgs));
        this.spinner = false;
      }));

  }

  display22 = 'none';

  oncloseModal() {
    this.display22 = 'none';
  }
  imageSize: any;
  opencloseModal(photo: any) {
    this.display22 = 'block';
    this.imageSize = photo;
  }
  removeItem(imageName: any) {
    let index2343 = this.apt_imgs.findIndex(
      (element: any) => element.apt_imgs == imageName
    );
    this.apt_imgs.splice(index2343, 1);

    //  this.ListFiles.splice(index2343, 1);
    this.urls.splice(index2343, 1);
  }
  isSelected = true;
  selected(flie: any, sel: any) {
    if (sel == 'select') {
      this.isSelected = false;
    } else {
      this.isSelected = true;
    }
  }

  onChangeNoOfBedrooms(event:any){
    const selectedValue = parseInt(event.target.value, 10);
    this.bedrooms = Array(selectedValue).fill(0).map((x, i) => i);

  }
  showBedSection:boolean = false;
  sectionName:string ="";

  onChangesArea(event:any){
    this.defaultapartmentSharedArea = event.target.value;
    this.SharedAreaInclude = event.target.value == 'Yes' ? true : false;

    console.log(this.defaultapartmentSharedArea)

  }

  onChangesleepingArea(event: any): void {
    const selectedValue = event.target.value;
    this.sectionName = selectedValue;

    this.showBedSection = (this.sectionName === 'Bed' || this.sectionName === 'Sofa bed');
}



  checkValue(event: any, file: any) {
    if (event.target.checked == true) {
      this.generalInfoForm.get('apt_ThumbImg')?.patchValue(file);
    } else {
    }
  }
  isShow = false;
  studioShow = false;
  onChange(deviceValue: any) {
    if (deviceValue == 'Apartment') {
      this.isShow = true;
      this.studioShow = false;
      this.generalInfoForm.get('apartment_BedRoomsNo')?.setValue(1);
      this.generalInfoForm.get('apartment_BathroomNo')?.setValue(1);
    } else if (deviceValue == 'Studio') {
      this.isShow = false;
      this.studioShow = true;
      this.generalInfoForm.get('apartment_BedRoomsNo')?.setValue(1);
      this.generalInfoForm.get('apartment_BathroomNo')?.setValue(1);
    } else {
      this.isShow = false;
      this.studioShow = false;
      this.generalInfoForm.get('apartment_BedRoomsNo')?.setValue(0);
      this.generalInfoForm.get('apartment_BathroomNo')?.setValue(0)
    }
  }
  SetOwnerName(event: any) {
    localStorage.setItem('apartment_Owner', event.target.selectedOptions[0].text);
  }

  gotopage() {
    let url: string = 'apartments';
    this.router.navigateByUrl(url);
  }
  openOwnersModal()
  {
    this.display11=true;

  }
  closeOwnersModal()
  {
  this.getAowners();
this.display11=false
  }
  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }
}
