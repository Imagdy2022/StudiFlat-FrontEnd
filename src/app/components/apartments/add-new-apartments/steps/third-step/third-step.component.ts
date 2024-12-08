import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
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
export class ThirdStepComponent implements OnInit, OnDestroy {
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
  subscriptions: Subscription[] = [];

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
    this.subscriptions.push(
      this._ApartmentService.getApartDetail(this.idParamterEdit).subscribe((res) => {
        this.subscriptions.push(
          this._OnwerService.getOwner(res.apartment_Basic_Info['apartment_Owner']).subscribe((res) => {
            // this.nameOwner=res.owner_FirstName +" "+res.owner_LastName;
          })
        );
        this.dataEdit = res;
        this.nameApartment = res.apartment_Basic_Info['apartment_Name'];
        this.nameAddress = res.apartment_Basic_Info['apartment_Location'];
        this.localapt_Transports = res.trasponrts;
        this.afterUploadImage = 'false';

        this.passContract = res.apartment_Contract['contract_Path'];
        this.apt_FloorNo = res.apartment_Basic_Info['apartment_Floor'];
        this.aprt_details_Edit = res.apartment_Check_Rules;
        this.apt_inputfields = res.apartment_Check_Rules['apt_inputfields'];

        this.create_Apart_contract.patchValue(res.apartment_Check_Rules);
        this.create_Apart_contract
          .get('digital_Contract')
          ?.setValue(res.apartment_Contract['digital_Contract']);
        this.create_Apart_contract.get('tenantName')?.setValue('StudiFlats');
        this.create_Apart_contract
          .get('rent_Fees')
          ?.setValue(res.apartment_Contract['rent_Fees']);
        this.create_Apart_contract
          .get('contractDate_Start')
          ?.setValue(new Date(res.apartment_Contract['contractDate_Start']));
        this.create_Apart_contract
          .get('contractDate_End')
          ?.setValue(new Date(res.apartment_Contract['contractDate_End']));
        this.create_Apart_contract
          .get('contract_Path')
          ?.setValue(res.apartment_Contract['contract_Path']);
        this.create_Apart_contract
          .get('trash_pin_image')
          ?.setValue(res.apartment_Check_Rules['tarsh_Pin_Imgs']);
        this.create_Apart_contract.get('checkType')?.setValue(res.apartment_Check_Rules['checkType']);
        this.create_Apart_contract.get('landLord')?.setValue(res.apartment_Contract['landLord']);
        this.nameOwner = res.apartment_Contract['landLord'];

        if (res.apartment_Check_Rules['checkType'] == 'Self_Check_In') {
          this.Createcheckintype = 'self check in';
        } else {
          this.Createcheckintype = 'service check in';
        }

        this.door_Img = res.apartment_Check_Rules['door_Img'];
        this.safe_Img = res.apartment_Check_Rules['safe_Img'];
        this.building_Img = res.apartment_Check_Rules['building_Img'];
        this.apt_roles = res.apartment_Check_Rules['apt_rules'];
        this.contractDetails = res.apartment_Contract['contractDetails'];

        this.issshowdoor = 'door';
        this.issshowbuilding = 'building';
        this.issshowsafe = 'safe';
        if (res.apartment_Contract['digital_Contract'] == true) {
          this.CreateContract = 'Yes';
          this.createcontractpage = true;
        } else {
          this.CreateContract = 'No';
          this.createcontractpage = false;
        }
      })
    );
  }

  bindCreatecontract(): void {

    this.create_Apart_contract = new FormGroup({
      digital_Contract: new FormControl(true),
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
    this.create_Apart_contract.get('digital_Contract')?.setValue(this.createcontractpage);
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

  selectedfromDropDownFloorNumber(value: any): void {}

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
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('fileData', file, file.name);
    if (file) {
      this.subscriptions.push(
        this.uploadService.uploadSingleFile(formData).subscribe(
          (img: any) => {
            if (img && img.length > 0) {
              file.url = URL.createObjectURL(file);
              if (fieldName === 'contract_Path') this.selectedContractImg = file;
              if (fieldName === 'safe_Img') this.selectedSafeImg = file;
              if (fieldName === 'door_Img') this.selectedDoorImg = file;
              if (fieldName === 'building_Img') this.selectedBuildingImg = file;
              if (fieldName === 'safe_Img') this.issshowsafe = '';
              if (fieldName === 'door_Img') this.issshowdoor = '';
              if (fieldName === 'building_Img') this.issshowbuilding = '';



              this.create_Apart_contract.get(fieldName)?.patchValue(img[0].file_Path);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `File uploaded successfully`,
              });
              this.afterUploadImage = 'true';
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `No file uploaded. Please try again.`,
              });
            }
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Please try again`,
            });
          }
        )
      );
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
  nameOwner: any =localStorage.getItem('apartment_Owner');

  getAowners(id: any) {
    this.subscriptions.push(
      this._ApartmentService.getOwnerDropList().subscribe((res) => {
        this.listDropDownPropertyowner = res.list;
        for (let i = 0; i < this.listDropDownPropertyowner.length; i++) {
          if (id == this.listDropDownPropertyowner[i].id) {
            this.nameOwner = this.listDropDownPropertyowner[i].name;
          }
        }
      })
    );
  }

  idwner: any;


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
      this.apt_imgs = parseData.trash_pin_image;
      if (parseData.digital_Contract == true) {
        this.CreateContract = 'Yes';
        this.createcontractpage = true;
      } else {
        this.CreateContract = 'No';
        this.createcontractpage = false;
      }
      this.create_Apart_contract.get('checkType')?.setValue(parseData.checkType);
      if (parseData.checkType == 'Self_Check_In') {
        this.Createcheckintype = 'self check in';
      } else {
        this.Createcheckintype = 'service check in';
      }
      this.contractDetails = parseData.contractDetails;
      this.apt_inputfields = parseData.apt_inputfields;
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

    const payload = {
      ...this.create_Apart_contract.value,
      ...res,
      apartment_ID:JSON.parse(localStorage.getItem('apartmentResponse')!).uuid,
      landLord:localStorage.getItem('apartment_Owner')
    };

    // Log the payload to verify data structure

    localStorage.setItem(
      'contract',
      JSON.stringify({
        ...this.create_Apart_contract.value,
        ...res,
        Createcheckintype: this.Createcheckintype,
        CreateContract: this.CreateContract
      })
    );

    this.subscriptions.push(
      this._ApartmentService.createPostSec3(payload).subscribe(
        (res) => {
          // Log the response for debugging
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${res.message}`,
          });
          this.submitSecondForm();
        },
        (err: any) => {
          // Log the error for debugging

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `An error occurred: ${err.message || err}`,
          });
        }
      )
    );
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

  opencloseModal(photo: any) {
    this.display22 = 'block';
    this.imageSize = photo;
  }

  removeItem(imageName: any) {
    let index2343 = this.apt_imgs.findIndex(
      (element: any) => element.pic_URL == imageName
    );
    this.apt_imgs.splice(index2343, 1);
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

  checkValue(event: any, file: any) {}

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
    this.subscriptions.push(
      this.uploadService.uploadMultiFile(this.convertFileToFormData(this.ListFiles)).subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${'Images Upload Successfully'}`,
        });

        for (let file of data) {

          this.apt_imgs.push({"pic_URL": file.name});
        }
        this.create_Apart_contract.get('trash_pin_image')?.patchValue(this.apt_imgs);
        localStorage.setItem('imagesAPT12', JSON.stringify(this.apt_imgs));
        this.spinner = false;
      })
    );
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
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
