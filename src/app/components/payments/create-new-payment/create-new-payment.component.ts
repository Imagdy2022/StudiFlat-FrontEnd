import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from 'primeng/api';
import { AdminsService } from "src/app/_services/admins/admins.service";


@Component({
  selector: 'app-create-new-payment',
  templateUrl: './create-new-payment.component.html',
  styleUrls: ['./create-new-payment.component.scss']
})
export class CreateNewPaymentComponent {
  showSide: string = '';
  search:boolean=false
  toType: string = 'Owner';
  allData : any[] =[];
  imgUrl:any;
  imageFile:string='';
 firstIDFound = false;
  secondID:any;

  paymentForm : FormGroup = new FormGroup({
    Pay_To:new FormControl(null),
    Pay_UUID:new FormControl(null),
    Apt_ID:new FormControl(null),
    Pay_To_Type:new FormControl(null),
    Payment_Desc:new FormControl(null),
    Payment_Amount:new FormControl(null),
    Payment_Bouns:new FormControl(null),
    Payment_Notes:new FormControl(null),
    Payment_Attachment:new FormControl(null)

  })

  constructor( public _adminservices:AdminsService ,public router: Router ,private messageService: MessageService) { }

  ngOnInit() {
    this.GetPayToList();
  }

  selectedfromDropDown(value:any){

    this.Date=value.name;
    this.GetPayToList()

  }
  addItem(value: string): void {
    this.showSide = value
  }

  statusTenant:any=""
  pageNumber=1;
  pagesize=10;
  totalofPages=0;;
  disablenext=false;
  disableperv=false;

 totalRecords=0
 tiggerPageChange(event: any) {

      const calcPageNumber = Math.floor(event.first / event.rows) + 1;
      this.pageNumber=calcPageNumber;
      this.GetPayToList(  )
     }
  numberpartners=0;
  Date:any="All"

  itemID1: any;
  itemID2: any;
  selectUser(data:any ){
    Object.keys(data).forEach(key => {
      if (key.toLowerCase().includes('id')) {
        if (!this.firstIDFound) {
          this.itemID1 = data[key];
          this.firstIDFound = true;
        }
        if(key.toLowerCase().includes('id')){
          this.itemID2 = data[key];
        }
      }
    });

  }
  SelectType(e:any){
    this.toType = e.target.value;
    this.GetPayToList();
  }
  GetPayToList(){
    this._adminservices.GetPayToList(this.toType,this.searchText,this.pageNumber, this.pagesize ).subscribe({
      next:(res:any)=>{
        this.allData = res.data
        this.pageNumber = res.pageNumber;
        this.pagesize = res.pageSize
        this.totalofPages = res.totalPages;
        this.totalRecords = res.totalRecords;
        if (this.totalofPages == this.pageNumber) {
          this.disablenext = true;
        } else {
          this.disablenext = false;
        }
        if (this.pageNumber == 1) {
          this.disableperv = true;
        } else {
          this.disableperv = false;
        }
      },
      error:(err)=>{
      }
    })
  }
  getImageFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        this.paymentForm.get('Payment_Attachment')?.setValue(this.imgUrl);
      };
    }
  }
  AddPayment(){
    let data = {
    Pay_To: this.paymentForm.value['Pay_To'],
    Pay_UUID: this.itemID1,
    Apt_ID : this.itemID2,
    Pay_To_Type:this.paymentForm.value['Pay_To_Type'],
    Payment_Desc :this.paymentForm.value['Payment_Desc'],
    Payment_Amount: this.paymentForm.value['Payment_Amount'],
    Payment_Bouns:  this.paymentForm.value['Payment_Bouns'],
    Payment_Notes: this.paymentForm.value['Payment_Notes'],
    Payment_Attachment: this.imgUrl
    }

     this._adminservices.AddPayment(data).subscribe({
      next:(data:any)=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail:"send Success" });
      },
      error:(err)=>{
         this.messageService.add({ severity: 'error', summary: 'Error', detail: "error" });
      }
     })
  }


  searchText: any = '';

  searchAction() {
    this.GetPayToList();
  }
}
