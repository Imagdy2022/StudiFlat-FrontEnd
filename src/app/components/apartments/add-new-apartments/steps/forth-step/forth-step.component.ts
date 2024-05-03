import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApartmentService } from '../../../../../_services/apartments/apartment.service'
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
@Component({
  selector: 'app-forth-step',
  templateUrl: './forth-step.component.html',
  styleUrls: ['./forth-step.component.scss']
})
export class ForthStepComponent {
  /** apartmentCurrentlyExisting */
  apartmentCurrentlyExisting: Array<string> = ['Yes', 'No']
  /** CreateapartmentCurrentlyExisting */
  CreateapartmentCurrentlyExisting: string = 'Yes';
  /** checkedstripe */
  checkedstripe: boolean = true;
  checkedOnline: boolean = true;

  /** checkedPayPal */
  checkedPayPal: boolean = true;
  /** checkedCash */
  checkedCash: boolean = true;
  /** gas_Meter_Cons */
  gas_Meter_Cons: boolean = false
  /** Labelfield */
  Labelfield: any = { text1: 'Input Field Name', text2: 'Input Field Content' };
  /** PostBackupInfo */
  PostBackupInfo!: FormGroup;
  /** inputField */
  inputField: Array<any> = []
  /** selectedContract */
  selectedContract: any;

  /** addApartment */
  @Input() addApartment: string = '';
  /** id */
  @Input() id: string = ''
  /** jumbToNextSteb */
  @Output() jumbToNextSteb = new EventEmitter<void>();
  /** jumbToPrevSteb */
  @Output() jumbToPrevSteb = new EventEmitter<void>();

  constructor(
    public _ApartmentService: ApartmentService,
    private router: Router,
    private messageService: MessageService,
    private uploadService: UploadFileService,
    private _ActivatedRoute: ActivatedRoute

  ) { }

  idParamterEdit:any=""
  ngOnInit() {
    this.idParamterEdit = this._ActivatedRoute.snapshot.params['id']
     if(this.addApartment !="add new apartments" ){
      this.edit="EditForm"
      this.bindCreatePostBackupInfo();
      this.getApartmentDetails();

     }else{
      this.bindCreatePostBackupInfo();
      this.getLocalStorage();
     }

  }
  edit =""
  aprt_details_Edit :any
  wifi:any
  getApartmentDetails() {

    this._ApartmentService.getApartDetail(this.idParamterEdit).subscribe((res) => {

      this.aprt_details_Edit = res.backup_Info
      this.wifi = res.rent_Rules


       this.PostBackupInfo.patchValue(res.backup_Info);
       this.inputField=res.backup_Info["inputFields"]
       if(res.backup_Info["payment_Methods"][0].payment_Method_Name=='false'){
        this.checkedOnline=false
       }else{
        this.checkedOnline=true

       }
       if(res.backup_Info["payment_Methods"][1].payment_Method_Name=='false'){
        this.checkedCash=false
       }else{
        this.checkedCash=true

       }
      // this.checkedOnline = Boolean(res.backup_Info["payment_Methods"][0].payment_Method_Name)
      //  this.checkedPayPal =  Boolean(res.backup_Info["payment_Methods"][1].payment_Method_Name)
     //  this.checkedCash =  Boolean(res.backup_Info["payment_Methods"][1].payment_Method_Name)
     })
  }
  // get  local storage
  getLocalStorage(): void {
    const data = localStorage.getItem("PostBackupInfo");
    this.storedImages =[]

    this.storedImages = JSON.parse(localStorage.getItem("imagesAPT11")||'{}');

    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.PostBackupInfo.patchValue(parsedData);

      this.CreateapartmentCurrentlyExisting = parsedData.CreateapartmentCurrentlyExisting;
      this.selectedContract = { 'url': parsedData.dmgs_Imgs[0].pic_URL }
      // payment till we make finale one
      this.checkedOnline = Boolean(parsedData.payment_Methods[0].payment_Method_Name);
      // this.checkedPayPal = Boolean(parsedData.payment_Methods[1].payment_Method_Name);
      this.checkedCash = Boolean(parsedData.payment_Methods[1].payment_Method_Name);




    }
  }

  DoyouapartmentCurrentlyExisting(value: any) {
    this.CreateapartmentCurrentlyExisting = value.target.value
    let check
    this.CreateapartmentCurrentlyExisting == 'Yes' ? check = true : check = false
    this.PostBackupInfo.get('apt_Exist_Dmg')?.setValue(check);
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
      this.uploadService.uploadSingleFile(formData).subscribe((img: any) => {
        file.url = URL.createObjectURL(file);
        this.selectedContract = file;
        this.PostBackupInfo.get('dmgs_Imgs')?.patchValue(
          [{
            "pic_URL": img[0].file_Path
          }]);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `damage Upload Successfuly` });
      }, (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Please try again` });
      });
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
      "inputFields": this.inputField,
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
      'elec_Meter_Num': new FormControl(''),
      'elec_Meter_Cons': new FormControl(0),
      'water_Meter_Num': new FormControl(''),
      'water_Meter_Cons': new FormControl(0),
      'gas_Meter_Num': new FormControl(''),
      'gas_Meter_Cons': new FormControl(0),
      'apt_Exist_Dmg': new FormControl(true),
      'dmgs_Imgs': new FormControl([]),
      'apt_General_Comments': new FormControl(''),
      'apt_Dmgs_Desc': new FormControl('')
    })


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
    const payloadData: any = {
      ...data.value,
      "inputFields": this.inputField,
      "payment_Methods":
        [
          { "payment_Method_Name": String(this.checkedOnline) },
          // { "payment_Method_Name": String(this.checkedPayPal) },
          { "payment_Method_Name": String(this.checkedCash) }
        ]
    }

    localStorage.setItem("PostBackupInfo", JSON.stringify({ ...payloadData, CreateapartmentCurrentlyExisting: this.CreateapartmentCurrentlyExisting }))
    this.checkValidData()

    this._ApartmentService.createPostSec4(payloadData, this.id).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'Congrats! Success Creation'}` });
      this.router.navigate(['apartments']);
    }, (err: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `${ err.error.message[0]}` });
    })
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
        }
        reader.readAsDataURL(file);
      }
    }
    this.upload()
    this.ListFiles=[]
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


        let index2343 = this.apt_imgs.findIndex((element:any) => element.pic_URL   == imageName);
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

                this.uploadService.uploadMultiFile(this.convertFileToFormData(this.ListFiles)).subscribe(data => {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: `${'Images Upload Successfully'}` });

                  for (let file of data) {
                    this.apt_imgs.push({ 'pic_URL': file.name });
                  }
                  // this.generalInfoForm.get('apt_ThumbImg')?.patchValue(data[0].name);
                  this.PostBackupInfo.get('dmgs_Imgs')?.patchValue(this.apt_imgs);
                  localStorage.setItem("imagesAPT11", JSON.stringify(this.apt_imgs));
                  this.spinner=false;

                });
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
}
