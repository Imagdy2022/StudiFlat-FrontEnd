import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApartmentService } from '../../../../../_services/apartments/apartment.service'
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { Subscription } from 'rxjs';
import { Guid } from 'guid-typescript';

interface Room {
  room_ID: string;
  room_Name: string;
  room_Devices: [];
}
@Component({
  selector: 'app-forth-step',
  templateUrl: './forth-step.component.html',
  styleUrls: ['./forth-step.component.scss']
})
export class ForthStepComponent {
  Qdamage:boolean=true;
  onDescriptionChange(description: string): void {
    this.Qdamage = description.length===0;
  }
  /** apartmentCurrentlyExisting */
  apartmentCurrentlyExisting: Array<string> = ['Yes', 'No']
  /** CreateapartmentCurrentlyExisting */
  CreateapartmentCurrentlyExisting: string = 'Yes';
  /** checkedstripe */
  checkedstripe: boolean = true;
  checkedOnline: boolean = true;
  checkSecurityDeposit :boolean = true

  /** checkedPayPal */
  checkedPayPal: boolean = true;
  /** checkedCash */
  checkedCash: boolean = true;
  /** apartment_Gas_Meter_Consumption */
  apartment_Gas_Meter_Consumption: boolean = false
  /** Labelfield */
  Labelfield: any = { text1: 'Input Field Name', text2: 'Input Field Content' };
  /** PostBackupInfo */
  PostBackupInfo!: FormGroup;
  /** inputField */
  inputField: Array<any> = []
  /** selectedContract */
  selectedContract: any;
  subscriptions:Subscription[] = [];
  romeDetails : any

  /** addApartment */
  @Input() addApartment: string = '';
  /** id */
  @Input() id: string = ''
  /** jumbToNextSteb */
  @Output() jumbToNextSteb = new EventEmitter<void>();
  /** jumbToPrevSteb */
  @Output() jumbToPrevSteb = new EventEmitter<void>();

  apt_UUID: any;
 Rooms_Devices : any;
 Devices: Array<any> = [];
 selectedRooms: any;

  constructor(
    public _ApartmentService: ApartmentService,
    private router: Router,
    private messageService: MessageService,
    private uploadService: UploadFileService,
    private _ActivatedRoute: ActivatedRoute

  ) {
    this.apt_UUID = localStorage.getItem('Apartment_ID');
    const data = localStorage.getItem('generalInfoForm');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.selectedRooms = parsedData.apartment_BedRoomsNo
    }


   }


  idParamterEdit:any=""
  ngOnInit() {
    this.idParamterEdit = this._ActivatedRoute.snapshot.params['id']

     if(this.addApartment !="add new apartments" ){
      this.edit="EditForm"
      this.bindCreatePostBackupInfo();
      this.getApartmentDetails();
      this.initializeRooms();

     }else{
      this.bindCreatePostBackupInfo();
      this.getLocalStorage();
      this.initializeRooms();
     }

     this.Qdamage=true;

  }
  edit =""
  aprt_details_Edit :any
  wifi:any
  getApartmentDetails() {
    this.subscriptions.push(this._ApartmentService.getApartDetail(this.idParamterEdit).subscribe((res) => {
console.log(res)
      this.aprt_details_Edit = res.apartment_Backup_Info
      this.wifi = res.rent_Rules
      this.selectedRooms=res.apartment_Basic_Info.apartment_Rooms.length
       this.PostBackupInfo.patchValue(res.apartment_Backup_Info);
       this.inputField=res.apartment_Backup_Info["apartment_Addons_Fields"]

      //  if(res.backup_Info["payment_Methods"][0].payment_Method_Name=='false'){
      //   this.checkedOnline=false
      //  }else{
      //   this.checkedOnline=true

      //  }
      //  if(res.backup_Info["payment_Methods"][1].payment_Method_Name=='false'){
      //   this.checkedCash=false
      //  }else{
      //   this.checkedCash=true

      //  }
      // this.checkedOnline = Boolean(res.backup_Info["payment_Methods"][0].payment_Method_Name)
      //  this.checkedPayPal =  Boolean(res.backup_Info["payment_Methods"][1].payment_Method_Name)
     //  this.checkedCash =  Boolean(res.backup_Info["payment_Methods"][1].payment_Method_Name)
     }))


  }
  // get  local storage
  getLocalStorage(): void {
    const data = localStorage.getItem("PostBackupInfo");
    this.romeDetails = JSON.parse(localStorage.getItem('apartmentResponse')!);
    this.storedImages =[]


    this.storedImages = JSON.parse(localStorage.getItem("imagesAPT11")||'{}');

    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.PostBackupInfo.patchValue(parsedData);

      this.CreateapartmentCurrentlyExisting = parsedData.CreateapartmentCurrentlyExisting;
      this.selectedContract = { 'url': parsedData.apartment_Damages_Imgs[0] }
      // payment till we make finale one
      this.checkedOnline = Boolean(parsedData.apartment_Is_Online_Payment);
      this.checkSecurityDeposit = Boolean(parsedData.apartment_Is_Security_Payment);
      this.checkedCash = Boolean(parsedData.apartment_Is_Cash_Payment);




    }
  }

  DoyouapartmentCurrentlyExisting(value: any) {
    this.CreateapartmentCurrentlyExisting = value.target.value
    let check
    this.CreateapartmentCurrentlyExisting == 'Yes' ? check = true : check = false
    this.PostBackupInfo.get('apartment_has_Damages')?.setValue(check);
  }

  /**
   * onUploadContract
   * upload photo in single file uploader uploadService
   * @param event
   */
  onUploadContract(event: any): void {
    const file = event.target.files[0];

    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('fileData', selectedFile, selectedFile.name);

    if (file) {
      this.subscriptions.push( this.uploadService.uploadSingleFile(formData).subscribe((img: any) => {
        file.url = URL.createObjectURL(file);
        this.selectedContract = file;
        this.PostBackupInfo.get('apartment_Damages_Imgs')?.patchValue(
          [ img[0].file_Path]);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `damage Upload Successfuly` });
      }, (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Please try again` });
      }));

    }
  }

  /**
   * submitForthForm
   * @description Emit an event to the parent component
   * @returns void
   */
  submitForthForm(): void {
    this.jumbToNextSteb.emit();
  }

  /**
 * PrevPage
 * @description Emit an event to the parent component
 * @returns void
 */
  PrevPage(): void {
    this.jumbToPrevSteb.emit();


    const payloadData: any = {
      ...this.PostBackupInfo.value,
      "apartment_Addons_Fields": this.inputField,
      "payment_Methods":
        [
          { "payment_Method_Name": String(this.checkedOnline) },
          // { "payment_Method_Name": String(this.checkedPayPal) },
          { "payment_Method_Name": String(this.checkedCash) }
        ]
    }

    localStorage.setItem("PostBackupInfo", JSON.stringify({ ...payloadData, CreateapartmentCurrentlyExisting: this.CreateapartmentCurrentlyExisting }))

  }
  bindCreatePostBackupInfo(): void {
    this.PostBackupInfo = new FormGroup({
      'apartment_ID':new FormControl(JSON.parse(localStorage.getItem('apartmentResponse')!).uuid),
      'apartment_Electricity_Meter_No': new FormControl(''),
      'apartment_Electricity_Meter_Consumption': new FormControl(''),
      'apartment_Water_Meter_No': new FormControl(''),
      'apartment_Water_Meter_Consumption': new FormControl(''),
      'apartment_Gas_Meter_No': new FormControl(''),
      'apartment_Gas_Meter_Consumption': new FormControl(''),
      'apartment_has_Damages': new FormControl(true),
      'apartment_Damages_Imgs': new FormControl([]),
      'apartment_General_Description': new FormControl(''),
      'apartment_Description': new FormControl(''),
      'apartment_Is_Online_Payment': new FormControl(true),
      'apartment_Is_Security_Payment': new FormControl(true),
      'apartment_Is_Cash_Payment': new FormControl(true)
    })


  }
  room_Devices : any[] = [];
  rooms: any[] = [];
  public roomIndexValue :any;


  initializeRooms() {

    this._ApartmentService.getRoomDevices(JSON.parse(localStorage.getItem('apartmentResponse')!).uuid).subscribe({
      next:(res)=>{
        console.log(res)
      //  this.Rooms_Devices=res;
       const kitchen = {
        room_ID: Guid.create().toString(),
        room_Name: 'Kitchen',
        room_Devices: [
          { device_Name: 'Fridge', is_Checked: false, device_Description: '' },
          { device_Name: 'Oven ', is_Checked: false, device_Description: '' },
          { device_Name: 'Microwave', is_Checked: false, device_Description: '' },
          { device_Name: 'kitchen cabinet', is_Checked: false, device_Description: '' },

        { device_Name: 'Mold', is_Checked: false, device_Description: '' },
        { device_Name: 'Devices', is_Checked: false, device_Description: '' },
        { device_Name: 'Walls', is_Checked: false, device_Description: 'mold' },

        { device_Name: 'Floor', is_Checked: false, device_Description: '' },
        { device_Name: 'Cleaning', is_Checked: false, device_Description: '' }
        ]
      };
      const Bathroom = {
        room_ID: Guid.create().toString(),
        room_Name: 'Bathroom',
        room_Devices: [
          { device_Name: 'Sink', is_Checked: false, device_Description: '' },
        { device_Name: 'Toilet', is_Checked: false, device_Description: '' },
        { device_Name: 'Shower', is_Checked: false, device_Description: '' },
        { device_Name: 'Mirror', is_Checked: false, device_Description: '' },
        { device_Name: 'Towel Rack', is_Checked: false, device_Description: '' },

        { device_Name: 'Mold', is_Checked: false, device_Description: '' },
        { device_Name: 'Devices', is_Checked: false, device_Description: '' },
        { device_Name: 'Walls', is_Checked: false, device_Description: 'mold' },

        { device_Name: 'Floor', is_Checked: false, device_Description: '' },
        { device_Name: 'Cleaning', is_Checked: false, device_Description: '' }
        ]
      };
      if(this.addApartment !="add new apartments" ){

        this.Rooms_Devices=res;

       }else{

        this.Rooms_Devices=[...res,kitchen,Bathroom];
       }


      }
    })
  }
  addRoom(roomName: string): void {
    if(roomName==='Kitchen'){
      this.Rooms_Devices.push({
        room_ID: Guid.create().toString(),
        room_Name: 'Kitchen',
        room_Devices: [
          { device_Name: 'Fridge', is_Checked: false, device_Description: '' },
          { device_Name: 'Oven ', is_Checked: false, device_Description: '' },
          { device_Name: 'Microwave', is_Checked: false, device_Description: '' },
          { device_Name: 'kitchen cabinet', is_Checked: false, device_Description: '' },

        { device_Name: 'Mold', is_Checked: false, device_Description: '' },
        { device_Name: 'Devices', is_Checked: false, device_Description: '' },
        { device_Name: 'Walls', is_Checked: false, device_Description: 'mold' },

        { device_Name: 'Floor', is_Checked: false, device_Description: '' },
        { device_Name: 'Cleaning', is_Checked: false, device_Description: '' }
        ]
      });
    }else if(roomName==='Bathroom'){
      this.Rooms_Devices.push({
      room_ID: Guid.create().toString(),
      room_Name: 'Bathroom',
      room_Devices: [
        { device_Name: 'Sink', is_Checked: false, device_Description: '' },
      { device_Name: 'Toilet', is_Checked: false, device_Description: '' },
      { device_Name: 'Shower', is_Checked: false, device_Description: '' },
      { device_Name: 'Mirror', is_Checked: false, device_Description: '' },
      { device_Name: 'Towel Rack', is_Checked: false, device_Description: '' },

      { device_Name: 'Mold', is_Checked: false, device_Description: '' },
      { device_Name: 'Devices', is_Checked: false, device_Description: '' },
      { device_Name: 'Walls', is_Checked: false, device_Description: 'mold' },

      { device_Name: 'Floor', is_Checked: false, device_Description: '' },
      { device_Name: 'Cleaning', is_Checked: false, device_Description: '' }
      ]
    });
    }

  }

   shouldDisplay(): boolean {
    const roomNames = this.Rooms_Devices.map((room:Room) => room.room_Name);
    return !roomNames.includes('Kitchen') || !roomNames.includes('Bathroom');
  }

  toggleSelectAll(event: any, roomIndex: number) {
    const checked = event.target.checked;
    this.Rooms_Devices[roomIndex].room_Devices.forEach((item: any) => {
      item.is_Checked = checked;
      if (checked) {
        if (!this.Devices.find((device: any) => device.item === item && device.roomIndex === roomIndex)) {
          this.Devices.push({ roomIndex: roomIndex, item: item });
        }
      }
    });
  }


  updateCheckedItems(item: any, roomIndex: number,deviceIndex:number) {
    if (!item.is_Checked) {
      this.Rooms_Devices[roomIndex].room_Devices[deviceIndex].is_Checked=false;
      this.Rooms_Devices[roomIndex].room_Devices[deviceIndex].device_Description='';
    }
  }


  updateSelectedItems(roomIndex: number) {
    this.Rooms_Devices[roomIndex].room_Devices = this.Rooms_Devices[roomIndex].room_Devices.filter((item: any) => item.is_Checked);
  }


  createNewField(roomIndex: number) {
    const newItem: any = { device_Name: 'New Field', device_Description: '' };
    this.Rooms_Devices[roomIndex].room_Devices.push(newItem);
  }


  removeField(roomIndex: number, itemIndex: number) {
    const removedItem = this.Rooms_Devices[roomIndex].room_Devices.splice(itemIndex, 1)[0];
    this.Devices = this.Devices.filter((device: any) => !(device.item === removedItem && device.roomIndex === roomIndex));
  }


  checkValidData() {
    if (this.PostBackupInfo.invalid) {
      Object.values(this.PostBackupInfo.controls).forEach(control => {
        control.markAsTouched();
      });

      this.PostBackupInfo.setErrors({ 'required': true });
      return
    }
  }
  Create_PostBackupInfo(data: any) {
//     this.Rooms_Devices=[];
//     for(let i=0;i<this.rooms.length;i++)
//     {
//       let itemDevices=[];
//       for(let j=0;j<this.Devices.length;j++)
//       {if(this.Devices[j]?.roomIndex===i)
//       {
//         let device=this.Devices[j]?.item;
//         itemDevices.push(device) }
//       }
//     this.Rooms_Devices.push({
//       room_ID:JSON.parse(localStorage.getItem('apartmentResponse')!).rooms_IDs[i],
//       room_Name: JSON.parse(localStorage.getItem('apartmentResponse')!).rooms_Names[i],
//       room_Devices: itemDevices
//       });
//       itemDevices=[]
//     }


    const payloadData: any = {
      ...data.value,
      "apartment_Addons_Fields": this.inputField,
      "apartment_Rooms_Devices": this.Rooms_Devices
    }

    localStorage.setItem("PostBackupInfo", JSON.stringify({ ...payloadData, CreateapartmentCurrentlyExisting: this.CreateapartmentCurrentlyExisting }))
    this.checkValidData()

    this.subscriptions.push( this._ApartmentService.createPostSec4(payloadData).subscribe((res) => {
      localStorage.removeItem('create_Apart_Equ');
      localStorage.removeItem('BathroomNo');
      localStorage.removeItem('apartmentResponse');
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${res.message}` });
      this.router.navigate(['apartments']);
    }, (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `${ err.error.message[0]}` });
    }));

  }
  saveInputField(value: any): void {
    this.inputField.push(value)
  }
  message:any
  preview:any
  progress:any
  selectedFiles?: FileList;
  ListFiles:any=[]
  imageList:any={}
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

  display22="none"

  oncloseModal() {
this.display22="none"

  }
  imageSize:any
  opencloseModal(photo:any) {
    this.display22="block"
   this.imageSize=photo
      }
      openModelImage(photo:any) {
        this.display22="block"
       this.imageSize=photo
          }
      removeItem(imageName:any){


        let index2343 = this.apt_imgs.findIndex((element:any) => element   == imageName);
        this.apt_imgs.splice(index2343, 1);

       //  this.ListFiles.splice(index2343, 1);
        this.urls.splice(index2343, 1);
         }
isSelected=true;
      selected(flie:any,sel:any){
        if(sel=="select"){
          this.isSelected=false;

        }else{
          this.isSelected=true;
        }
      }

      checkValue(event: any,file:any){

          if(event.target.checked==true){

          }else{

          }
         }
isShow=false;
storedImages:any

         onChange(deviceValue:any) {
          if(deviceValue=="Apartment"){
              this.isShow=true
          }
          else{
            this.isShow=false

          }
       }
       spinner: boolean = false;

       upload(): void {
        this.spinner=true;

        this.subscriptions.push(  this.uploadService.uploadMultiFile(this.convertFileToFormData(this.ListFiles)).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'Images Upload Successfully'}` });

          for (let file of data) {
            this.apt_imgs.push( file.name);
          }
          // this.generalInfoForm.get('apt_ThumbImg')?.patchValue(data[0].name);
          this.PostBackupInfo.get('apartment_Damages_Imgs')?.patchValue(this.apt_imgs);
          localStorage.setItem("imagesAPT11", JSON.stringify(this.apt_imgs));
          this.spinner=false;

        }));

              }
              convertFileToFormData(files: any[]) {
                const formData = new FormData();

                for (let i = 0; i < files.length; i++) {
                  formData.append('Files', files[i], files[i].name);
                }

                return formData;
              }
              apt_imgs: Array<any> = [];
              /** uploadedFiles */
              uploadedFiles: any[] = [];

              ngOnDestroy() {
                for(let i=0;i<this.subscriptions.length;i++)
                this.subscriptions[i].unsubscribe();
              }
}
