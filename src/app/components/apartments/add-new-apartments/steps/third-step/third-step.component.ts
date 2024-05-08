import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApartmentService } from '../../../../../_services/apartments/apartment.service';
import { MessageService } from 'primeng/api';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnwerService } from 'src/app/_services/Onwers/onwer.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss'],
})
export class ThirdStepComponent {
  /** date */
  date: any;
  /** CreateContract */
  CreateContract: string = 'Yes';
  /** Createapartmentcurre */
  Createapartmentcurre: string = '';
  /** Createcheckintype */
  Createcheckintype: string = 'self check in';
  /** ActionButtonContractSection */
  ActionButtonContractSection: boolean = true;
  /** listRadiobutton */
  listRadiobutton: Array<string> = ['Yes', 'No'];
  /** checkintypelist */
  checkintypelist: Array<string> = ['self check in', 'service check in'];
  /** listDropDownFloorNumber */
  listDropDownFloorNumber: any = [];
  /** dataRoles */
  dataRoles: Array<number> = [1, 2];
  /** create_Apart_contract */
  create_Apart_contract!: FormGroup;
  apt_imgs: any = [];
  subscriptions:Subscription[] = [];

  /** apt_UUID */
  apt_UUID: string = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
  /** contractDetails */
  contractDetails: Array<object> = [];
  /** size */
  size: number = 3;
  /** apt_inputfields */
  apt_inputfields: Array<any> = [];
  /** apt_roles */
  apt_roles: Array<any> = [];
  /** role_Desc */
  role_Desc: string = '';
  /** ActionButtonapt_roles */
  ActionButtonapt_roles: boolean = false;
  /** descriptionOfrole */
  descriptionOfrole: string = '';
  /** Labelapt_inputfields */
  Labelapt_inputfields: object = {
    text1: 'Input Field Name',
    text2: 'Input Field Content',
  };
  /** selectedContract */
  selectedContractImg: any;
  /** selectedSafeImg */
  selectedSafeImg: any;
  /** selectedDoorImg */
  selectedDoorImg: any;
  /** selectedBuildingImg */
  selectedBuildingImg: any;
  display22 = 'none';
  // get id
  @Input() id: string = '';
  /** createcontractpage */
  @Input() createcontractpage: boolean = true;
  /** addApartment */
  @Input() addApartment: string = '';
  /** jumbToNextSteb */
  @Output() jumbToNextSteb = new EventEmitter<void>();
  /** jumbToPrevSteb */
  @Output() jumbToPrevSteb = new EventEmitter<void>();

  constructor(
    public _ApartmentService: ApartmentService,
    private messageService: MessageService,
    private uploadService: UploadFileService,
    private _ActivatedRoute: ActivatedRoute,
    private _OnwerService: OnwerService,
    public router: Router
  ) {}
  idParamterEdit: any = '';
  afterUploadImage = 'true';
  aprt_details_Edit: any;
  ngOnInit() {
    this.idParamterEdit = this._ActivatedRoute.snapshot.params['id'];
    this.listDropDownFloorNumber = this.rangefrom0to100();
    if (this.addApartment != 'add new apartments') {
      this.bindCreatecontract();
      this.edit = 'EditForm';
      this.pushContractDetails();
      this.initial_apt_rules();
      this.getApartmentDetails();
    } else {
      this.edit = '';

      this.bindCreatecontract();
      this.pushContractDetails();
      // this.initial_apt_inputfields()
      this.initial_apt_rules();
      this.getLocalStorage();
    }
  }
  rangefrom0to100(): Array<object> {
    let list = [];
    for (let i = 0; i <= 100; i++) {
      list.push({ name: `${i}` });
    }
    return Array.from(list);
  }

  nameApartment: any = '';
  nameAddress: any = '';
  apt_FloorNo: any;
  edit: any = '';
  localapt_Transports: any;
  passContract: any = '';
  safe_Img: any;
  door_Img: any;
  building_Img: any;
  issshowdoor: any = '';
  issshowbuilding: any = '';
  issshowsafe: any = '';
  dataEdit: any;
  getApartmentDetails() {
    this.subscriptions.push( this._ApartmentService
      .getApartDetail(this.idParamterEdit)
      .subscribe((res) => {
        this.subscriptions.push(this._OnwerService
          .getOwner(res.general_Info['apt_Owner'])
          .subscribe((res) => {
            // this.nameOwner=res.owner_FirstName +" "+res.owner_LastName;
          }));
        this.dataEdit = res;
        this.nameApartment = res.general_Info['apt_Name'];
        this.nameAddress = res.general_Info['apt_Address'];
        this.localapt_Transports = res.trasponrts;
        this.afterUploadImage = 'false';

        this.passContract = res.contract_Main['contract_Path'];
        this.apt_FloorNo = res.general_Info['apt_FloorNo'];
        this.aprt_details_Edit = res.rent_Rules;
        this.apt_inputfields = res.rent_Rules['apt_inputfields'];

        this.create_Apart_contract.patchValue(res.rent_Rules);
        this.create_Apart_contract
          .get('digital_Contract')
          ?.setValue(res.contract_Main['digital_Contract']);
        // this.create_Apart_contract.get('landLord')?.setValue(localStorage.getItem('apt_owner'));
        this.create_Apart_contract.get('tenantName')?.setValue('StudiFlats');
        this.create_Apart_contract
          .get('rent_Fees')
          ?.setValue(res.contract_Main['rent_Fees']);
        this.create_Apart_contract
          .get('contractDate_Start')
          ?.setValue(new Date(res.contract_Main['contractDate_Start']));
        this.create_Apart_contract
          .get('contractDate_End')
          ?.setValue(new Date(res.contract_Main['contractDate_End']));
        this.create_Apart_contract
          .get('contract_Path')
          ?.setValue(res.contract_Main['contract_Path']);
        this.create_Apart_contract
          .get('trash_pin_image')
          ?.setValue(res.rent_Rules['tarsh_Pin_Imgs']);
        this.create_Apart_contract
          .get('checkType')
          ?.setValue(res.rent_Rules['checkType']);
        this.create_Apart_contract
          .get('landLord')
          ?.setValue(res.contract_Main['landLord']);
        this.nameOwner = res.contract_Main['landLord'];

        if (res.rent_Rules['checkType'] == 'Self_Check_In') {
          this.Createcheckintype = 'self check in';
        } else {
          this.Createcheckintype = 'service check in';
        }

        this.door_Img = res.rent_Rules['door_Img'];
        this.safe_Img = res.rent_Rules['safe_Img'];
        this.building_Img = res.rent_Rules['building_Img'];
        this.apt_roles = res.rent_Rules['apt_rules'];
        this.contractDetails = res.contract_Main['contractDetails'];

        this.issshowdoor = 'door';
        this.issshowbuilding = 'building';
        this.issshowsafe = 'safe';
        if (res.contract_Main['digital_Contract'] == true) {
          this.CreateContract = 'Yes';
          this.createcontractpage = true;
        } else {
          this.CreateContract = 'No';
          this.createcontractpage = false;
        }
      }));

  }
  bindCreatecontract(): void {
    this.create_Apart_contract = new FormGroup({
      digital_Contract: new FormControl(true),
      landLord: new FormControl(localStorage.getItem('apt_owner')),
      tenantName: new FormControl('StudiFlats'),
      contractDate_Start: new FormControl(''),
      contractDate_End: new FormControl(''),
      rent_Fees: new FormControl(0),
      checkType: new FormControl('Self_Check_In'),
      wifi_Name: new FormControl(''),
      wifi_Password: new FormControl(''),
      numof_Doors: new FormControl(0),
      mailBox_Num: new FormControl(0),
      trash_Location: new FormControl(''),
      apt_Location: new FormControl(''),
      safe_Code: new FormControl(''),
      safe_Img: new FormControl(''),
      door_Img: new FormControl(''),
      building_Img: new FormControl(''),
      contract_Path: new FormControl(''),
      trash_pin_image: new FormControl([]),
    });
  }
  DoyouCreateContract(value: any) {
    this.CreateContract = value.target.value;
    this.CreateContract == 'Yes'
      ? (this.createcontractpage = true)
      : (this.createcontractpage = false);
    this.create_Apart_contract
      .get('digital_Contract')
      ?.setValue(this.createcontractpage);
  }
  pushContractDetails(): void {
    for (let i = 0; i < this.size; i++) {
      this.contractDetails.push({ sec_Name: '', sec_Desc: '' });
    }
  }
  oncloseModal() {
    this.display22 = 'none';
  }
  imageSize: any;

  openModelImage(image: any) {
    this.display22 = 'block';
    this.imageSize = image;
  }
  // initial_apt_inputfields():void{
  //   this.apt_inputfields.push({field_Name:'',field_Content:''})
  // }
  initial_apt_rules(): void {
    this.apt_roles.push({ label: 'Rule 1', rule_Desc: '' });
  }
  DoyouCreateacheckintype(value: any) {
    this.Createcheckintype = value.target.value;
    let checkin;
    this.Createcheckintype == 'self check in'
      ? (checkin = 'Self_Check_In')
      : (checkin = 'Service_check_In');
    this.create_Apart_contract.get('checkType')?.setValue(checkin);
  }
  selectedfromDropDownFloorNumber(value: any): void {

  }

  ActionButtonContractSectionbutton() {
    this.ActionButtonContractSection = true;
    this.contractDetails.push({ sec_Name: '', sec_Desc: '' });
  }

  saveActionButtonFieldrole(index: any) {
    this.dataRoles.push(index);
  }

  /**
   * submitThirdForm
   * @description Emit an event to the parent component
   * @returns void
   */
  submitThirdForm(): void {
    this.jumbToNextSteb.emit();
  }

  /**
   * onUploadContract
   * upload photo in single file uploader uploadService
   * @param event
   */
  onUploadContract(event: any, fieldName: string): void {
    // get the file
    const file = event.target.files[0];
    // convert the file to formdata
    const formData = new FormData();
    formData.append('fileData', file, file.name);
    // check if the file has been uploaded
    if (file) {
      // call the onUpload function to get the link to the file
      this.subscriptions.push( this.uploadService.uploadSingleFile(formData).subscribe(
        (img: any) => {
          // create url to preview file
          file.url = URL.createObjectURL(file);
          // check wich file uploaded
          fieldName == 'contract_Path'
            ? (this.selectedContractImg = file)
            : null;
          fieldName == 'safe_Img' ? (this.selectedSafeImg = file) : null;
          fieldName == 'door_Img' ? (this.selectedDoorImg = file) : null;
          fieldName == 'building_Img'
            ? (this.selectedBuildingImg = file)
            : null;
          if (fieldName == 'safe_Img') {
            this.issshowsafe = '';
          }
          if (fieldName == 'door_Img') {
            this.issshowdoor = '';
          }
          if (fieldName == 'building_Img') {
            this.issshowbuilding = '';
          }
          // patch the fieldName in Form
          this.create_Apart_contract
            .get(fieldName)
            ?.patchValue(img[0].file_Path);
            (res :any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${res.message}`,
          });
        }
          this.afterUploadImage = 'true';
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Please try again`,
          });
        }
      ));

    }
  }

  /**
   * PrevPage
   * @description Emit an event to the parent component
   * @returns void
   */
  PrevPage(): void {
    this.jumbToPrevSteb.emit();
  }

  listDropDownPropertyowner: any = [];
  nameOwner: any = '';
  getAowners(id: any) {
    this.subscriptions.push(this._ApartmentService.getOwnerDropList().subscribe((res) => {
      this.listDropDownPropertyowner = res.list;
      for (let i = 0; i < this.listDropDownPropertyowner.length; i++) {
        if (id == this.listDropDownPropertyowner[i].id) {
          this.nameOwner = this.listDropDownPropertyowner[i].name;
        }
      }
    }));

  }
  idwner: any;
  // get  local storage
  getLocalStorage(): void {
    this.storedImages = [];

    this.storedImages = JSON.parse(localStorage.getItem('imagesAPT12') || '{}');
    const data = localStorage.getItem('contract');
    if (data !== null) {
      let parseData = JSON.parse(data);

      this.create_Apart_contract.patchValue(parseData);
      this.create_Apart_contract
        .get('contractDate_Start')
        ?.setValue(new Date(parseData.contractDate_Start));
      this.create_Apart_contract
        .get('contractDate_End')
        ?.setValue(new Date(parseData.contractDate_End));
      // image loading
      this.selectedContractImg = { url: parseData.contract_Path };
      this.selectedSafeImg = { url: parseData.safe_Img };
      this.selectedDoorImg = { url: parseData.door_Img };
      this.selectedBuildingImg = { url: parseData.building_Img };
      if (parseData.digital_Contract == true) {
        this.CreateContract = 'Yes';
        this.createcontractpage = true;
      } else {
        this.CreateContract = 'No';
        this.createcontractpage = false;
      }
      this.create_Apart_contract
        .get('checkType')
        ?.setValue(parseData.checkType);
      if (parseData.checkType == 'Self_Check_In') {
        this.Createcheckintype = 'self check in';
      } else {
        this.Createcheckintype = 'service check in';
      }
      // this.CreateContract = parseData.CreateContract
      // this.Createcheckintype = parseData.Createcheckintype
      //  if there is contractDetails in this question {{Do you want create contract ?}}
      this.contractDetails = parseData.contractDetails;
      //  if there is inputfield in self check in
      this.apt_inputfields = parseData.apt_inputfields;
      // if there is roles in Rental Roles
      for (let i = 0; i < parseData.apt_rules.length; i++) {
        this.apt_roles[i] = {
          label: `Rule ` + (i + 1),
          rule_Desc: parseData.apt_rules[i].rule_Desc,
        };
      }
    }

    const data1 = localStorage.getItem('generalInfoForm');

    if (data1 !== null) {
      let parsedData1 = JSON.parse(data1);
      this.idwner = parsedData1.apt_Owner;
      this.getAowners(this.idwner);
    }
  }

  isContractInLocalStorage(): boolean {
    return 'contract' in localStorage;
  }
  Create_Apart_Contract(data: any) {
    let rules: any = [];
    this.apt_roles.forEach((element) => {
      rules.push({ rule_Desc: element.rule_Desc });
    });
    let res = {
      contractDetails: this.contractDetails,
      apt_inputfields: this.apt_inputfields,
      apt_rules: rules,
    };


    localStorage.setItem(
      'contract',
      JSON.stringify({
        ...this.create_Apart_contract.value,
        ...res,
        Createcheckintype: this.Createcheckintype,
        CreateContract: this.CreateContract,
      })
    );
    if (this.addApartment != 'add new apartments') {
      this.subscriptions.push( this._ApartmentService
        .createPostSec3(
          { ...this.create_Apart_contract.value, ...res },
          this.idParamterEdit
        )
        .subscribe(
          (res) => {
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
      this.subscriptions.push( this._ApartmentService
        .createPostSec3(
          { ...this.create_Apart_contract.value, ...res },
          this.id
        )
        .subscribe(
          (res) => {
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
  }

  /**
   * submitSecondForm
   * @description Emit an event to the parent component
   * @returns void
   */
  submitSecondForm(): void {
    this.jumbToNextSteb.emit();
  }
  pushinputfields(value: any): void {
    this.apt_inputfields.push(value);

  }

  saveActionButtonnewapt_rules() {
    this.apt_roles.push({
      label: `Rule ${this.apt_roles.length + 1}`,
      rule_Desc: this.descriptionOfrole,
    });
    this.descriptionOfrole = '';
    this.ActionButtonapt_roles = false;
  }

  message: any;
  preview: any;
  progress: any;
  selectedFiles?: FileList;
  ListFiles: any = [];
  imageList: any = {};
  urls = new Array<string>();

  // selectFile(event: any): void {

  //   this.message = '';
  //   this.preview = '';
  //   this.progress = 0;
  //   this.selectedFiles = event.target.files;

  //    let files = event.target.files;

  //   if (files) {
  //     for (let file of files) {

  //       this.ListFiles.push(file);
  //        let reader = new FileReader();
  //       reader.onload = (e: any) => {

  //          this.urls.push(e.target.result);
  //       }
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // }
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
  //   display22="none"

  //   oncloseModal() {
  // this.display22="none"

  //   }
  //   imageSize:any
  opencloseModal(photo: any) {
    this.display22 = 'block';
    this.imageSize = photo;
  }
  removeItem(imageName: any) {
    let index2343 = this.apt_imgs.findIndex(
      (element: any) => element.pic_URL == imageName
    );
    this.apt_imgs.splice(index2343, 1);

    //  this.ListFiles.splice(index2343, 1);
    this.urls.splice(index2343, 1);
  }
  //   removeItem(imageName:any){

  //  let index2343 = this.ListFiles.findIndex((element:any) => element.name   == imageName);
  //  this.ListFiles.splice(index2343, 1);
  //  this.urls.splice(index2343, 1);
  //   }
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
    } else {
    }
  }
  isShow = false;
  storedImages: any;

  onChange(deviceValue: any) {
    if (deviceValue == 'Apartment') {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
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
          this.apt_imgs.push({ pic_URL: file.name });
        }
        // this.generalInfoForm.get('apt_ThumbImg')?.patchValue(data[0].name);
        this.create_Apart_contract
          .get('trash_pin_image')
          ?.patchValue(this.apt_imgs);
        localStorage.setItem('imagesAPT12', JSON.stringify(this.apt_imgs));
        this.spinner = false;
      }));
  }
  convertFileToFormData(files: any[]) {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('Files', files[i], files[i].name);
    }

    return formData;
  }
  /** uploadedFiles */
  uploadedFiles: any[] = [];

  removeSection(number: any) {
    this.contractDetails.splice(number, 1);
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
