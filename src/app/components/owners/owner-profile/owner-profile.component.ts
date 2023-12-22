import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OnwerService } from 'src/app/_services/Onwers/onwer.service';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.css']
})
export class OwnerProfileComponent implements OnInit{
  /** showSide  */
  showSide: string = '';
  /** available  */
  available: boolean = true;
  /** link  */
  link: Array<boolean> = [true];
  /** cities  */
  cities: Array<object> = [];
  /** param  */
  param: any;
  /** listAnchors  */
  listAnchors: any = [];
  /** createOwner  */
  createOwner!: FormGroup;
  /** id  */
  id: string = '';
  /** selectedCity  */
  selectedCity: any = '';
  /** loadingButton */
  loadingButton: boolean = false;
  // param title page
  pageTitle:any

  ngOnInit() {
    this.initCities();
    this.bindCreateOwner()
  }

  /**
   * constructor
   * @param viewportScroller
   * @param router
   * @param _ActivatedRoute
   * @param _OnwerService
   * @param uploadfile
   */
  constructor(
    private viewportScroller: ViewportScroller,
    private uploadfile: UploadFileService,
    private messageService: MessageService,
    public router: Router,
    public _ActivatedRoute: ActivatedRoute,
    public _OnwerService: OnwerService) {
    this.param = _ActivatedRoute.snapshot.paramMap.get('id');
    this.pageTitle=_ActivatedRoute.snapshot.paramMap.get('page')
    this.scrollTop();
    this.checkPage();
  }

  /**
   * Returns a formatted date string for display in the input element.
   * @returns {string} The formatted date string or an empty string if the value is invalid.
   */
  get formattedDate(): string {
    // Retrieve the 'owner_DOB' value from the form control
    const ownerDOB = this.createOwner.get('owner_DOB')?.value;
    // Check if the 'ownerDOB' value is a valid Date object
    if (ownerDOB instanceof Date) {
      // Extract year, month, and day components from the Date
      const year = ownerDOB.getFullYear();
      const month = String(ownerDOB.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-indexed
      const day = String(ownerDOB.getDate()).padStart(2, '0');
      // Return the formatted date string in "YYYY-MM-DD" format
      return `${year}-${month}-${day}`;
    }
    // Return an empty string if the value is not a valid Date object
    return '';
  }

  checkPage(): void {
       this.id = this.param
      console.log(this.param)
      this._OnwerService.GetOwnerProfile(this.id).subscribe((res) => {
        this.createOwner.patchValue(res);
      })
      this.param = "Owner details";
      this.listAnchors = [
        { id: 'Generalinfo', link: 'General info' },
        { id: 'OtherDetails', link: 'Other Details' },
        { id: 'Ownedapartments', link: 'Owned apartments' },
        { id: 'Bankdetails', link: 'Bank details' },
        { id: 'Paymenthistory', link: 'Payment history' },
      ]


  }
  OwnersRole:any
  is_Super:any
  checkRole(){
    const data = localStorage.getItem("user");
     if (data !== null) {

      let parsedData = JSON.parse(data);
       this.is_Super=parsedData.is_Super
      if(parsedData.is_Super==false) {
  for(let i=0; i<parsedData.permissions.length;i++){
    if(parsedData.permissions[i].page_Name=="Owners"){
      this.OwnersRole=parsedData.permissions[i];
    }
  }
  if(this.OwnersRole.p_Add==false &&this.is_Super==false&&this.param == "owner/create_new") {
    this.gotopage( )
  }
  else if(this.OwnersRole.p_Update==false &&this.is_Super==false&&this.pageTitle== "edit_owner") {
    this.gotopage( )

  }
}


    }
  }
  gotopage( ){
    let url: string = "unlegal";
      this.router.navigateByUrl(url);
  }
  gotopage2( ){
    let url: string = "owners";
      this.router.navigateByUrl(url);
  }
  /**
   * initCities
   * @return void
   */
  initCities(): void {
    this.cities = [
      { country: 'New York', code: 'NY' },
      { country: 'Rome', code: 'RM' },
      { country: 'London', code: 'LDN' },
      { country: 'Istanbul', code: 'IST' },
      { country: 'Paris', code: 'PRS' }
    ];
  }

  /**
   * addItem
   * @param value
   */
  addItem(value: string) {
    this.showSide = value
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
  public selectCountry(value: any) {
    console.log(value)
  }
  changeAnchor(index: number): void {
    this.link = this.link.map(el => el == true ? false : false)
    this.link[index] = true
  }

  CreateOwner(data: any) {
    /** conver number to string while backend fix this */
    data.value.owner_Phone = String(data.value.owner_Phone);
    data.value.owner_WA_Number = String(data.value.owner_WA_Number);
    this.loadingButton = true;
    if (this.param == "Create New") {
      this._OnwerService.createOwner({
        ...data.value, ...this.selectedCity, ...{ "nationality": "AF", "Gender": "UnSpecified", "Country": "UnSpecified", Status: "1" }
      }).subscribe((res) => {
        this.loadingButton = false;
        this.router.navigate(['/owners']);
      }, (err) => {
        this.loadingButton = false;
        console.error('Error fetching CreateOwner:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.title}` });
      })
    }

    else {
      const editData = { ...data.value, ...{ "nationality": "AF", "owner_ID": this.id, "Gender": "UnSpecified", "Country": "UnSpecified" } }

      this._OnwerService.editOwner(this.id, editData).subscribe((res) => {
        this.loadingButton = false;
        this.router.navigate(['/owners'])
      }, (err) => {
        this.loadingButton = false;
        console.error('Error fetching CreateOwner:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.title}` });

      })
    }
  }

  updateUserImage(event: any) {
    this.createOwner.get('owner_Photo')?.setValue(event);

  }
  bindCreateOwner(): void {
    this.createOwner = new FormGroup({
      'owner_FirstName': new FormControl('', [Validators.required]),
      'owner_LastName': new FormControl('', [Validators.required]),
      'owner_Mail': new FormControl('', [Validators.email, Validators.required]),
      'owner_Address': new FormControl('', [Validators.required]),
      'owner_About': new FormControl('', [Validators.required]),
      'owner_DOB': new FormControl('', [Validators.required]),
      'owner_Phone': new FormControl('', [Validators.required]),
      'owner_WA_Number': new FormControl('', [Validators.required]),
      'owner_Bank': new FormControl('', [Validators.required]),
      'owner_BankAccount': new FormControl('', [Validators.required]),
      'owner_BankSwift': new FormControl('', [Validators.required]),
      'owner_Photo': new FormControl('', [Validators.required]),
    });
  }

  /**
   * scrollTop
   * to make screen scroll to top
   * @return void
   */
  scrollTop(): void {
    window.scrollTo(0, 0)
  }
}
