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
  /** t_Name */
  t_Name: string = '';
  /** t_Distance */
  t_Distance: string = '';
  /** apt_UUID */
  apt_UUID: any = '';
  @Input() id: string = '';
  /** n_ofbedroom */
  n_ofbedroom: number = 0;
  /** apt_Toilets */
  apt_Toilets: number = 0;
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
      // this.apt_UUID= localStorage.getItem("apt_UUID");
      //   this.storedImages = JSON.parse(localStorage.getItem("imagesAPT")||'{}');
      this.getAowners();

      this.initFakeData();
      this.bindCreateGeneral();

      this.getArea();
      this.edit = 'EditForm';
      this.getApartmentDetails();
    } else {
      this.edit = '';
      this.apt_UUID = localStorage.getItem('apt_UUID');
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
        this.billinclude = res.general_Info['apt_AllBillsIncludes'];
        this.generalInfoForm
          .get('apt_Imgs')
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
      if (parsedData.apt_types == 'Apartment') {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      this.generalInfoForm.patchValue(parsedData);
      this.generalInfoForm.get('apt_Imgs')?.patchValue(parsedData.apt_Imgs);
      this.apt_imgs = parsedData.apt_Imgs;
      this.bills = parsedData.bills;

      this.billinclude = parsedData.apt_AllBillsIncludes;

      this.generalInfoForm.get('apt_Area')?.setValue(parsedData.apt_Area);
      this.selectedfromDropDownArea(parsedData.apt_Area, 'update');

      // this.localapt_Transports = parsedData.apt_Transports;
      this.Createtransport == parsedData.apt_Transports;
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
    this.apt_UUID = res;
    localStorage.setItem('apt_UUID', this.apt_UUID);
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
    this.generalInfoForm.get('apt_Owner')?.setValue(value.id);
    localStorage.setItem('apt_Owner', value.name);
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
      this.generalInfoForm.get('apt_Area')?.setValue(value);
    } else {
      this.generalInfoForm.get('apt_Area')?.setValue(value.name);
    }
  }

  selectedfromDropDownFloor(value: any): void {
    this.generalInfoForm.get('apt_FloorNo')?.setValue(+value.name);
  }
  selectedfromDropDownApartmentnumber(value: any): void {
    this.generalInfoForm.get('apt_AptNo')?.setValue(+value.name);
  }

  selectedfromDropDownApartmentType(value: any): void {
    this.generalInfoForm.get('apt_types')?.setValue(value.name);
    if (value.name == 'Apartment') {
      this.showNone = false;
      this.generalInfoForm.get('apt_Bedrooms')?.setValue(1);
      this.generalInfoForm.get('apt_Toilets')?.setValue(1);
      this.generalInfoForm.get('apt_Living')?.setValue(1);
    } else if (value.name == 'Studio') {
      this.generalInfoForm.get('apt_Bedrooms')?.setValue(1);
      this.generalInfoForm.get('apt_Toilets')?.setValue(1);
      this.generalInfoForm.get('apt_Living')?.setValue(0);
      this.showNone = true;
    } else {
      this.generalInfoForm.get('apt_Bedrooms')?.setValue(0);
      this.generalInfoForm.get('apt_Toilets')?.setValue(0);
      this.generalInfoForm.get('apt_Living')?.setValue(0);
      this.showNone = true;
    }
  }
  selectedfromDropDownElevator(value: any): void {
    this.generalInfoForm
      .get('apt_Elevator')
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
        this.generalInfoForm.get('apt_Imgs')?.patchValue(this.apt_imgs);
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
      apt_Area: new FormControl('0', [Validators.required]),

      apt_FloorNo: new FormControl('0', [Validators.required]),
      apt_Name: new FormControl('', [Validators.required]),
      apt_AptNo: new FormControl('0', [Validators.required]),
      apt_Price: new FormControl(0, [Validators.required]),
      apt_SecuirtyDep: new FormControl(0, [Validators.required]),
      apt_BillDescirption: new FormControl(''),
      apt_StName: new FormControl('', [Validators.required]),
      apt_BuildingNo: new FormControl('', [Validators.required]),
      apt_CityorPostal: new FormControl('', [Validators.required]),
      apt_SquareMeters: new FormControl(0, [Validators.required]),
      apt_MaxGuest: new FormControl(0, [Validators.required]),
      apt_Imgs: new FormControl(this.apt_imgs, Validators.required),
      apt_Descirpt: new FormControl('', [Validators.required]),
      apt_VideoLink: new FormControl('', [Validators.required]),
      apt_360D: new FormControl('', [Validators.required]),
      apt_MapLink: new FormControl('', [Validators.required]),
      // 'apt_Long': new FormControl('', [Validators.required]),
      //  'UUID': new FormControl(this.id ),
      service_Fees: new FormControl('0', [Validators.required]),

      apt_Bedrooms: new FormControl(0, [Validators.required]),
      apt_Toilets: new FormControl(0, [Validators.required]),
      apt_Living: new FormControl(0, [Validators.required]),
      apt_AllBillsIncludes: new FormControl(true, [Validators.required]), //true
      apt_Elevator: new FormControl(true, [Validators.required]),
      // 'apt_Lat': new FormControl('', [Validators.required]),//0
      // 'apt_Long': new FormControl('', [Validators.required]),//0
      apt_types: new FormControl('Select Type', [Validators.required]),
      apt_Owner: new FormControl('0', [Validators.required]), //string
      apt_Status: new FormControl('', [Validators.required]), //Rented
      apt_ThumbImg: new FormControl('', [Validators.required]),
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
    data.value.apt_AllBillsIncludes = this.billinclude;
    // data.value.apt_Lat = 0
    data.value.apt_Status = 'Rented';

    // this.Createtransport.push({ t_Name: this.t_Name, t_Distance: this.t_Distance });
    localStorage.setItem(
      'Createtransport',
      JSON.stringify(this.Createtransport)
    );

    localStorage.setItem(
      'generalInfoForm',
      JSON.stringify({
        ...this.generalInfoForm.value,
        apt_Transports: this.Createtransport,
        bills: this.bills,
      })
    );

    if (this.addApartment != 'add new apartments') {
      this.subscriptions.push( this._ApartmentService
        .createPostSec1(
          { ...data.value, apt_Transports: this.Createtransport },
          this.idParamterEdit
        )
        .subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `${res?.message}`,
            });
            this.n_ofbedroom = data.value.apt_Bedrooms;
            this.apt_Toilets = data.value.apt_Toilets;
            this.n_ofLiving = data.value.apt_Living;

            this.submitSecondForm();
            this.jumbToNextSteb2n_ofbedroom.emit(this.n_ofbedroom);
            this.jumbToNextSteb2_apt_Toilets.emit(this.apt_Toilets);
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

    } else {
      this.subscriptions.push(this._ApartmentService
        .createPostSec1(
          { ...data.value, apt_Transports: this.Createtransport },
          this.id
        )
        .subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `${res?.message}`,
            });
            this.n_ofbedroom = data.value.apt_Bedrooms;
            this.apt_Toilets = data.value.apt_Toilets;
            this.n_ofLiving = data.value.apt_Living;

            this.submitSecondForm();
            this.jumbToNextSteb2n_ofbedroom.emit(this.n_ofbedroom);
            this.jumbToNextSteb2_apt_Toilets.emit(this.apt_Toilets);
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
    this.generalInfoForm.get('apt_Long')?.setValue(this.display1.lng);
    this.generalInfoForm.get('apt_Lat')?.setValue(this.display1.lat);
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
  counter = 0;
  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    let files = event.target.files;

    if (files) {
      for (let file of files) {
        this.ListFiles.push(file);
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
    this.upload();
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
        this.generalInfoForm.get('apt_Imgs')?.patchValue(this.apt_imgs);
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

  checkValue(event: any, file: any) {
    if (event.target.checked == true) {
      this.generalInfoForm.get('apt_ThumbImg')?.patchValue(file);
    } else {
    }
  }
  isShow = false;
  onChange(deviceValue: any) {
    if (deviceValue == 'Apartment') {
      this.isShow = true;
      this.generalInfoForm.get('apt_Bedrooms')?.setValue(1);
      this.generalInfoForm.get('apt_Toilets')?.setValue(1);
      this.generalInfoForm.get('apt_Living')?.setValue(1);
    } else if (deviceValue == 'Studio') {
      this.isShow = false;
      this.generalInfoForm.get('apt_Bedrooms')?.setValue(1);
      this.generalInfoForm.get('apt_Toilets')?.setValue(1);
      this.generalInfoForm.get('apt_Living')?.setValue(0);
    } else {
      this.isShow = false;
      this.generalInfoForm.get('apt_Bedrooms')?.setValue(0);
      this.generalInfoForm.get('apt_Toilets')?.setValue(0);
      this.generalInfoForm.get('apt_Living')?.setValue(0);
    }
  }
  SetOwnerName(event: any) {
    localStorage.setItem('apt_owner', event.target.selectedOptions[0].text);
  }

  gotopage() {
    let url: string = 'apartments';
    this.router.navigateByUrl(url);
  }

  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }
}
