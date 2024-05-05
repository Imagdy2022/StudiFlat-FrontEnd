import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnwerService } from 'src/app/_services/Onwers/onwer.service';
import { ApartmentService } from 'src/app/_services/apartments/apartment.service';

@Component({
  selector: 'app-inquire-edit',
  templateUrl: './inquire-edit.component.html',
  styleUrls: ['./inquire-edit.component.css']
})
export class InquireEditComponent implements OnInit {
  generalInfoForm!: FormGroup;

  apt_UUID: any;
  subscriptions:Subscription[] = [];

  constructor(public _ApartmentService: ApartmentService, public _ActivatedRoute: ActivatedRoute,
    public _OnwerService :OnwerService,private sanitizer: DomSanitizer,public router: Router)
   {
    this.apt_UUID = _ActivatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.bindCreateGeneral();
    this. getApartmentDetails();
    this.checkRole();
  }
  inquiresRole:any
is_Super:any
checkRole(){
  const data = localStorage.getItem("user");
   if (data !== null) {

    let parsedData = JSON.parse(data);
     this.is_Super=parsedData.is_Super
    if(parsedData.is_Super==false) {
for(let i=0; i<parsedData.permissions.length;i++){
  if(parsedData.permissions[i].page_Name=="Inquiries"){
    this.inquiresRole=parsedData.permissions[i];
  }
}
if(this.inquiresRole.p_Update==false &&this.is_Super==false) {
  this.gotopage( )
}
}


  }
}
gotopage( ){
  let url: string = "unlegal";
    this.router.navigateByUrl(url);
}
  showSide: string = '';

  addItem(value: string): void {
    this.showSide = value
  }
  bindCreateGeneral(): void {
    this.generalInfoForm = new FormGroup({

       'apt_Price': new FormControl('', [Validators.required]),
      'apt_SecuirtyDep': new FormControl('', [Validators.required]),

      'apt_MaxGuest': new FormControl('', [Validators.required]),


    });
  }
  aprt_details:any
  getApartmentDetails() {
    this.subscriptions.push(  this._ApartmentService.getApartDetail(this.apt_UUID).subscribe((res) => {
      this.aprt_details = res["general_Info"]

      this.generalInfoForm.get("apt_Price")?.setValue(res["general_Info"].apt_Price)
      this.generalInfoForm.get("apt_SecuirtyDep")?.setValue(res["general_Info"].apt_SecuirtyDep)
      this.generalInfoForm.get("apt_MaxGuest")?.setValue(res["general_Info"].apt_MaxGuest)

    }))
  }

  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }
}
