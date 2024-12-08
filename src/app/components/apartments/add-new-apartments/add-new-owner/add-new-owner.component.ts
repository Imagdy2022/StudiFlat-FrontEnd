import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OnwerService } from 'src/app/_services/Onwers/onwer.service';
import { FailedToStartTransportError } from '@microsoft/signalr/dist/esm/Errors';

@Component({
  selector: 'app-add-new-owner',
  templateUrl: './add-new-owner.component.html',
  styleUrls: ['./add-new-owner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddNewOwnerComponent {
  @Output() dataEvent = new EventEmitter<boolean>();

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
  pageTitle: any;
  subscriptions: Subscription[] = [];
  subTitle: string = 'Upload owner photo and enter details.';

  ngOnInit() {
    this.initCities();
    this.bindCreateOwner();
    this.GetCountries();
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
    public _OnwerService: OnwerService
  ) {
    this.param = _ActivatedRoute.snapshot.paramMap.get('id');
    this.pageTitle = _ActivatedRoute.snapshot.paramMap.get('page');
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
  selectedCountry: any;
  Countries: any = [];
  GetCountries() {
    this.subscriptions.push(
      this._OnwerService.GetCountries().subscribe(
        (res) => {
          this.Countries = res;
        },
        (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${err.error.message[0]}\n`,
          });
        }
      )
    );
  }
  checkPage(): void {
    if (this.pageTitle == 'owner_details') {
      this.id = this.param;
      this.subscriptions.push(
        this._OnwerService.getOwner(this.id).subscribe((res: any) => {
          this.createOwner.patchValue(res);
        })
      );
      this.param = 'Owner details';
      this.listAnchors = [
        { id: 'Generalinfo', link: 'General info' },
        { id: 'OtherDetails', link: 'Other Details' },
        { id: 'Ownedapartments', link: 'Owned apartments' },
        { id: 'Bankdetails', link: 'Bank details' },
        { id: 'Paymenthistory', link: 'Payment history' },
      ];
    } else if (this.pageTitle == 'edit_owner') {
      this.id = this.param;
      this.subscriptions.push(
        this._OnwerService.getOwner(this.id).subscribe((res: any) => {
          this.createOwner.patchValue(res);
        })
      );

      this.param = 'edit owner name details';
      this.listAnchors = [
        { id: 'Generalinfo', link: 'General info' },
        { id: 'OtherDetails', link: 'Other Details' },
        { id: 'Bankdetails', link: 'Bank details' },
      ];
    } else if (this.param == 'create_new') {
      this.param = 'Create New';
      this.listAnchors = [
        { id: 'Generalinfo', link: 'General info' },
        { id: 'OtherDetails', link: 'Other Details' },
        { id: 'Bankdetails', link: 'Bank details' },
      ];
    } else {
    }
  }
  OwnersRole: any;
  is_Super: any;
  checkRole() {
    const data = localStorage.getItem('user');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.is_Super = parsedData.is_Super;
      if (parsedData.is_Super == false) {
        for (let i = 0; i < parsedData.permissions.length; i++) {
          if (parsedData.permissions[i].page_Name == 'Owners') {
            this.OwnersRole = parsedData.permissions[i];
          }
        }
        if (
          this.OwnersRole.p_Add == false &&
          this.is_Super == false &&
          this.param == 'owners/create_new'
        ) {
          this.gotopage();
        } else if (
          this.OwnersRole.p_Update == false &&
          this.is_Super == false &&
          this.pageTitle == 'edit_owner'
        ) {
          this.gotopage();
        }
      }
    }
  }
  gotopage() {
    let url: string = 'unlegal';
    this.router.navigateByUrl(url);
  }
  gotopage2() {
    this.dataEvent.emit(false);
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
      { country: 'Paris', code: 'PRS' },
    ];
  }

  /**
   * addItem
   * @param value
   */
  addItem(value: string) {
    this.showSide = value;
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
  public selectCountry(value: any) {}
  changeAnchor(index: number): void {
    this.link = this.link.map((el) => (el == true ? false : false));
    this.link[index] = true;
  }
  onCountrySelected(event: any) {
    this.CountryName = event.value.description;
    this.CountryValue = event.value.name;
    //this.CountryName = event.target.value.description;
    // this.CountryValue = event.target.value.value; // look in the console to get the properties
    // look in the console to get the properties
  }
  CountryName: any;
  CountryValue: any;
  CreateOwner(data: any) {
    /** conver number to string while backend fix this */
    data.value.owner_Phone = String(data.value.owner_Phone);
    data.value.owner_WA_Number = String(data.value.owner_WA_Number);
    data.value.nationalityString = this.CountryValue;
    data.value.nationality = this.CountryValue;

    this.loadingButton = true;

    this.subscriptions.push(
      this._OnwerService
        .createOwner({
          ...data.value,
          ...this.selectedCountry,
          ...{
            Gender: 'UnSpecified',
            Nationality: this.CountryValue,
            Country: this.CountryValue,
            Status: '1',
          },
        })
        .subscribe(
          (res) => {
            this.loadingButton = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `${res.message}`,
            });
            this.dataEvent.emit(false);
          },
          (err) => {
            this.loadingButton = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${err.error.message[0]}`,
            });
          }
        )
    );
  }

  updateUserImage(event: any) {
    this.createOwner.get('owner_Photo')?.setValue(event);
  }
  bindCreateOwner(): void {
    this.createOwner = new FormGroup({
      owner_FirstName: new FormControl('', [Validators.required]),
      owner_LastName: new FormControl('', [Validators.required]),
      owner_Mail: new FormControl('', [Validators.email, Validators.required]),
      owner_Address: new FormControl('', [Validators.required]),
      owner_About: new FormControl('', [Validators.required]),
      owner_DOB: new FormControl('', [Validators.required]),
      owner_Phone: new FormControl('', [Validators.required]),
      owner_WA_Number: new FormControl(''),
      owner_Bank: new FormControl('', [Validators.required]),
      owner_BankAccount: new FormControl('', [Validators.required]),
      owner_BankSwift: new FormControl('', [Validators.required]),
      owner_Photo: new FormControl('', [Validators.required]),
    });
  }

  /**
   * scrollTop
   * to make screen scroll to top
   * @return void
   */
  scrollTop(): void {
    window.scrollTo(0, 0);
  }
  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++)
      this.subscriptions[i].unsubscribe();
  }
}
