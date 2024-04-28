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
  searchText:any=""
  search:boolean=false
  toType: string = 'Owner';
  allData : any[] =[];
  imgUrl:any;
  imageFile:string='';

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
    this.GetPayToList(  )
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
  incrementpage(){

    this.pageNumber+=1;
    if(this.pageNumber<1){
      this.pageNumber=1;

    }
    if(this.pageNumber>= this.totalofPages){
      this.pageNumber=this.totalofPages;

    }
    // this.getAllpartners( );
  }
  decreamentPage(){
    this.pageNumber-=1;
    if(this.pageNumber<1){
      this.pageNumber=1;

    }
    // this.getAllpartners( );

  }
 partners=[]
 totalRecords=0
 tiggerPageChange(event: any) {

      const calcPageNumber = Math.floor(event.first / event.rows) + 1;
      this.pageNumber=calcPageNumber;
      this.GetPayToList(  )
     }
  numberpartners=0;
  Date:any="All"


  searchAction() {
    // this.search = false;
    this.GetPayToList()
      // this.searchText =""
  }
  itemID: any;
  selectUser(data:any ){
    Object.keys(data).forEach(key => {
      if (key.toLowerCase().includes('id')) {
        this.itemID= data[key]
      }
    });
    console.log(this.itemID)

  }
  SelectType(e:any){
    this.toType = e.target.value;
    this.GetPayToList();
  }
  GetPayToList(){
    this._adminservices.GetPayToList(this.toType, this.searchText ).subscribe({
      next:(res:any)=>{
        this.allData = res
      },
      error:(err)=>{
        console.log(err)
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
    // const formData = new FormData();
    // formData.append('Pay_To', this.paymentForm.value['Pay_To']);
    // formData.append('Pay_UUID',this.itemID);
    // formData.append('Apt_ID', this.paymentForm.value['Apt_ID']);
    // formData.append('Pay_To_Type', this.paymentForm.value['Pay_To_Type']);
    // formData.append('Payment_Desc', this.paymentForm.value['Payment_Desc']);
    // formData.append('Payment_Amount', this.paymentForm.value['Payment_Amount']);
    // formData.append('Payment_Bouns', this.paymentForm.value['Payment_Bouns']);
    // formData.append('Payment_Notes',this.paymentForm.value['Payment_Notes']);
    // formData.append('Payment_Attachment', this.paymentForm.value['Payment_Attachment']);

    let data = {
    Pay_To: this.paymentForm.value['Pay_To'],
    Pay_UUID: this.itemID,
    Apt_ID :this.paymentForm.value['Apt_ID'],
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
}
