 import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApartmentService } from '../../../_services/apartments/apartment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnwerService } from 'src/app/_services/Onwers/onwer.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { Guid } from 'guid-typescript';
import { Reviews } from 'src/app/models/reviews';
import { Subscription } from 'rxjs';


import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';



interface ApartmentDetails {
  // apt_ThumbImg?: string;
  apt_Lat?: number;
  apt_Long?: number;
  [key: string]: any;
}

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApartmentDetailsComponent implements OnInit {
  currentImage: string;
  currentIndex: number = 0;

  showSide: string = '';
  value: number = 3;
  bedNumber: number = 0;
  RentedSuccessfully: boolean = false;
  markAvailable: boolean = false;
  aprt_details: ApartmentDetails = {};
  aprt_Imgs: string[] = [];
  apt_UUID: any;
  subscriptions: Subscription[] = [];
  displayQr: any;
  qrCodeImg!: string;
  qrCode: string;
  roomType: string;
  aprtCode: string;
  aprt: any = {};
  apartmentsEquipment: any = {};
  apartmentsContract: any = {};
  apartmentsCheckRules: any = {};
  roomsBedRoom: any[] = [];
  roomsLiving: any[] = [];
  ApartmentsRole: any;
  is_Super: any;
  isAccordionOpen: boolean = false;
  isContentVisible: any;
  isDepositVisible: any;
  isContractVisible: any;
  isArriveVisible: any;
  isCheckinVisible: any;
  isinsideCheckinVisible: any;
  isidentityVisible: any;
  isPaymentsVisible: any;
  isHandoverVisible: any;
  isRulesVisible: any;
  trasponrts: any[] = [];
  rent_Rules: any;
  features: any;
  facilities: any;
  contract_Main: any;
  bath_Room: any;
  backup_Info: any;
  kitchen_Tools: any[] = [];
  AllReviews: Reviews[] = [];
  tenant: any = {};
  request_code: any;
  rating_total: any;
  rating_count: any;
  owner_contract_file_name: any;
  tenant_contract_file_name: any;
  center: any = {};
  display22: any = 'none';
  imageSize: string = '';
  noAllbed:number;

  constructor(
    public _ApartmentService: ApartmentService,
    public _ActivatedRoute: ActivatedRoute,
    private messageService: MessageService,
    public _OnwerService: OnwerService,
    private sanitizer: DomSanitizer,
    public router: Router
  ) {
    this.apt_UUID = _ActivatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.images = [
      {
        itemImageSrc: 'https://via.placeholder.com/150?text=Image+1',
        thumbnailImageSrc: 'https://via.placeholder.com/150?text=Image+1',
        alt: 'Image 1',
        title: 'Image 1'
      },
      {
        itemImageSrc: 'https://via.placeholder.com/150?text=Image+2',
        thumbnailImageSrc: 'https://via.placeholder.com/150?text=Image+2',
        alt: 'Image 2',
        title: 'Image 2'
      },
      {
        itemImageSrc: 'https://via.placeholder.com/150?text=Image+3',
        thumbnailImageSrc: 'https://via.placeholder.com/150?text=Image+3',
        alt: 'Image 3',
        title: 'Image 3'
      },
      {
        itemImageSrc: 'https://via.placeholder.com/150?text=Image+4',
        thumbnailImageSrc: 'https://via.placeholder.com/150?text=Image+4',
        alt: 'Image 4',
        title: 'Image 4'
      },

    ];

    // Initialize columns
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ];

    // Initialize products data
    this.products = [
      { code: 'P001', name: 'Product 1', category: 'Category 1', quantity: 10 },
      { code: 'P002', name: 'Product 2', category: 'Category 2', quantity: 15 },
      { code: 'P003', name: 'Product 3', category: 'Category 3', quantity: 25 },
      { code: 'P004', name: 'Product 4', category: 'Category 1', quantity: 50 }
    ];

    this.getApartmentDetails();
    this.GetApartmentReview();
    this.scrollTop();
    this.checkRole();
    this.currentImage = this.aprt_Imgs[0]?.includes('https') ? this.aprt_Imgs[0] : '../../../assets/images/apartmentImages/default_apartment.jpg';

  }
  get displayedThumbnails() {
    return this.aprt_Imgs.slice(this.currentIndex, this.currentIndex + 5);
  }

  changeMainImage(img: string) {
    this.currentImage = img.includes('https') ? img : '../../../assets/images/apartmentImages/default_apartment.jpg';
  }

  next() {
    if (this.currentIndex + 5 < this.aprt_Imgs.length) {
      this.currentIndex += 1;
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
  }

  currentImagee: string | null = null;

  openImagePopup(imageUrl: string) {
    this.currentImagee = imageUrl;
  }

  closePopup() {
    this.currentImagee = null;
  }
  bedsPrice:number=0;
  showRoomDesign :boolean;
  allResponse:any;
  getApartmentDetails() {
    this.subscriptions.push(
      this._ApartmentService.getApartDetail(this.apt_UUID).subscribe(
        (res) => {
          console.log(res)
          this.allResponse=res;
          this.aprt = res.apartment_Basic_Info || {};
          // if(this.aprt.apartment_Type==='Studio'){
          //   this.showRoomDesign=false;
          // }else{
          //   this.showRoomDesign=true;
          // }
          this.aprt_details = this.aprt || {};
          this.aprt_Imgs = this.aprt.apartment_Images || [];
          this.trasponrts = this.aprt.apartment_Transports || [];
          this.rent_Rules = res.apartment_Check_Rules?.apt_rules || [];
          this.features = res.apartment_Equipments?.apartment_Features || [];
          this.facilities = res.apartment_Equipments?.apartment_Facilites || [];
          this.contract_Main = res.apartment_Contract || {};
          this.bath_Room = res.apartment_Equipments?.bathroom_Details || [];
          this.backup_Info = res.apartment_Backup_Info || {};
          this.owner_contract_file_name = res.file_Name;
          this.tenant_contract_file_name = res.tenant?.file_Name || '';
          this.center = {
            lat: this.aprt.apartment_Lat || 0,
            lng: this.aprt.apartment_Long || 0,
          };
          this.kitchen_Tools = res.apartment_Equipments?.kitchen_Details || [];
          this.tenant = res.tenant || {};
          this.rating_total = res.rating_Total;
          this.rating_count = res.rating_Count;
          this.request_code = res.request_Code;
          this.transform(this.aprt.apartment_VideoLink || '');

          this.apartmentsEquipment = res.apartment_Equipments || {};
          this.apartmentsContract = res.apartment_Contract || {};
          this.apartmentsCheckRules = res.apartment_Check_Rules || {};
          this.currentImage = this.aprt_Imgs[0].includes('https') ? this.aprt_Imgs[0] : '../../../assets/images/apartmentImages/default_apartment.jpg';
          if (Array.isArray(this.aprt.apartment_Rooms)) {
            let bedno = 0;

            for (let i = 0; i < this.aprt.apartment_Rooms.length; i++) {
              // if (this.aprt.apartment_Rooms[i].room_Type === 'Bedroom') {
              // bedno++;
              // this.roomsBedRoom.push(this.aprt.apartment_Rooms[i]);
              // } else {
              //   this.roomsLiving.push(this.aprt.apartment_Rooms[i]);
              // }

              if (!this.aprt.apartment_Rooms[i].room_Type.includes('Shared Area')) {

                this.roomsBedRoom.push(this.aprt.apartment_Rooms[i]);
                for (let x = 0; x < this.roomsBedRoom[i].room_Beds.length; x++) {
                  bedno++;

                  this.roomsBedRoom[i].room_Beds[x] = { ...this.roomsBedRoom[i].room_Beds[x], "bed_number": bedno };

                }
              } else {

                for (let x = 0; x < this.aprt.apartment_Rooms[i].room_Beds.length; x++) {
                  bedno++;
                  this.aprt.apartment_Rooms[i].room_Beds[x] = { ...this.aprt.apartment_Rooms[i].room_Beds[x], "bed_number": bedno };
                }
                this.roomsLiving.push(this.aprt.apartment_Rooms[i]);
              }
            }
            this.noAllbed=bedno;

          //   for(let i=0; i< this.aprt.apartment_Rooms.length ; i++){

          //     for(let x=0; x< this.aprt.apartment_Rooms[i].room_Beds.length ; x++){

          //       this.bedsPrice += this.aprt.apartment_Rooms[i]?.room_Beds[x]?.bed_Price;

          //   }

          // }
          if (this.aprt && this.aprt.apartment_Rooms) {
            for (let i = 0; i < this.aprt.apartment_Rooms.length; i++) {

                  this.bedsPrice += this.aprt.apartment_Rooms[i].bed_Price * this.aprt.apartment_Rooms[i].beds_No ?? 0;

            }
          }


          } else {
            console.warn('apartment_Rooms is not an array:', this.aprt.apartment_Rooms);
          }


          if(this.aprt.apartment_Type==='Studio'){
            this.showRoomDesign=false;
          }else{
            this.showRoomDesign=true;
          }
        },
        (error) => {
          console.error('Error fetching apartment details:', error);
        }
      )
    );
  }

  GetApartmentReview() {
    this.subscriptions.push(
      this._ApartmentService.GetApartmentReview(this.apt_UUID).subscribe(
        (res) => {
          this.AllReviews = res;
        },
        (error) => {
          console.error('Error fetching apartment reviews:', error);
        }
      )
    );
  }
  roomNo:any;
  onOpenQrModal(imgLink: string, qrCode: string, roomType: string, apartCode: string ,roomNo:any)  {
    this.qrCodeImg = imgLink;
    this.displayQr = 'block';
    this.qrCode = qrCode;
    this.roomType = roomType.substring(0, 1);
    this.aprtCode = apartCode;
    this.roomNo=roomNo;
  }

  onCloseQrModal() {
    this.qrCodeImg = '';
    this.displayQr = 'none';
  }

  checkRole() {
    const data = localStorage.getItem('user');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.is_Super = parsedData.is_Super;
      if (parsedData.is_Super === false) {
        for (let i = 0; i < parsedData.permissions.length; i++) {
          if (parsedData.permissions[i].page_Name === 'Apartments') {
            this.ApartmentsRole = parsedData.permissions[i];
          }
        }
        if (this.ApartmentsRole.p_View === false && this.is_Super === false) {
          this.gotopage();
        }
      }
    }
  }

  toggleContent(): void {
    const detailsContent = document.getElementById("details-content");
    const bookingProcess = document.getElementById("booking-process");
    const moreDetails = document.getElementById("more-details");

    if (detailsContent && bookingProcess && moreDetails) {
      if (detailsContent.style.display === "none") {
        detailsContent.style.display = "block";
        bookingProcess.style.display = "block";
        moreDetails.style.display = "block";
      } else {
        detailsContent.style.display = "none";
        bookingProcess.style.display = "none";
        moreDetails.style.display = "none";
      }
    }
  }

  toggleContentpass(): void {
    this.isContentVisible = !this.isContentVisible;
  }

  toggleContentdeposit(): void {
    this.isDepositVisible = !this.isDepositVisible;
  }

  toggleContentContract(): void {
    this.isContractVisible = !this.isContractVisible;
  }

  toggleContentArrive(): void {
    this.isArriveVisible = !this.isArriveVisible;
  }

  toggleContentCheckin(): void {
    this.isCheckinVisible = !this.isCheckinVisible;
  }

  toggleContentinsideCheckin(): void {
    this.isinsideCheckinVisible = !this.isinsideCheckinVisible;
  }

  toggleContentidentity(): void {
    this.isidentityVisible = !this.isidentityVisible;
  }

  toggleContentPayments(): void {
    this.isPaymentsVisible = !this.isPaymentsVisible;
  }

  toggleContentHandover(): void {
    this.isHandoverVisible = !this.isHandoverVisible;
  }

  toggleContentRules(): void {
    this.isRulesVisible = !this.isRulesVisible;
  }

  gotopage() {
    let url: string = 'unlegal';
    this.router.navigateByUrl(url);
  }

  transform(videoURL: string) {
    let srclink = videoURL;
    if (srclink?.startsWith('https://www.youtube.com/watch?v=')) {
      let embedlink = srclink?.replace('watch?v=', 'embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedlink);
    } else if (srclink?.startsWith('https://youtu.be')) {
      let embedlink = srclink?.replace('https://youtu.be', 'https://www.youtube.com/embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedlink);
    } else {
      return this.sanitizer.bypassSecurityTrustResourceUrl(srclink);
    }
  }

  transform2(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  addItem(value: any) {
    this.showSide = value;
  }

  scrollTop(): void {
    window.scrollTo(0, 0);
  }

  viewImage(image: any) {
    if (this.aprt_details) {
      this.aprt_details['apt_ThumbImg'] = image;
    }
  }

  viewimageinModel(image: any) {
    this.display22 = 'block';
    this.imageSize = image;
  }

  oncloseModal() {
    this.display22 = 'none';
  }

  DownloadFile(path: any) {
    this.subscriptions.push(
      this._ApartmentService.DownloadFile(path).subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${res.message}`,
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${error.message}`,
          });
        }
      )
    );
  }

  MarkRented() {
    this.subscriptions.push(
      this._ApartmentService.MarkRented(this.apt_UUID).subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${res.message}`,
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${error.message}`,
          });
        }
      )
    );
  }

  MarkAvaliablePublish() {
    this.subscriptions.push(
      this._ApartmentService.MarkAvaliablePublish(this.apt_UUID).subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${res.message}`,
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${error.message}`,
          });
        }
      )
    );
  }

  ApproveReview(id: string, approval: boolean) {
    this.subscriptions.push(
      this._ApartmentService.ApproveReview(id, approval).subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${res.message}`,
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${error.message}`,
          });
        }
      )
    );
  }

  MarkDraft() {
    this.subscriptions.push(
      this._ApartmentService.MarkDraft(this.apt_UUID).subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${res.message}`,
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${error.message}`,
          });
        }
      )
    );
  }


  downloadImage(url: any) {
    fetch(url, {
      mode: 'no-cors',
    })
      .then((response) => response.blob())
      .then((blob) => {
        let blobUrl = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.download = url.replace(/^.*[\\\/]/, '');
        a.href = blobUrl;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }

  // printDiv(divId: string) {
  //   const printContents = document.getElementById(divId)?.innerHTML;
  //   const originalContents = document.body.innerHTML;

  //   if (printContents) {
  //     document.body.innerHTML = printContents;
  //     window.print();
  //     document.body.innerHTML = originalContents;
  //   } else {
  //     console.error('Div not found');
  //   }
  // }

  printDiv(divId: string) {
    const printContents = document.getElementById(divId)?.innerHTML;


    if (printContents) {
      const newWindow = window.open('', '_blank', 'height=600,width=800');
      if (newWindow) {
        newWindow.document.write('<html><head> ');
        newWindow.document.write('  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"><style>@media print { body * { visibility: hidden; } #qrToPdf, #qrToPdf * { visibility: visible; } #qrToPdf { position: absolute; left: 0; top: 0 ;bottom:0; width: 100%; height:100% ; page-break-inside: avoid; page-break-before: avoid; page-break-after: avoid; font-size:50px; font-weight:800;  } #qrToPdf img { max-width: 100%; height: 70%; margin-bottom:15px; } }</style>');
        newWindow.document.write('</head><body>');
        newWindow.document.write(`<div id="qrToPdf">${printContents}</div>`);
        newWindow.document.write('</body></html>');
        newWindow.document.close();

        // Wait for the content to load and then print
        newWindow.onload = () => {
          newWindow.focus();
          newWindow.print();
          newWindow.close();
        };
      } else {
        console.error('Failed to open new window');
      }
    } else {
      console.error('Div not found');
    }
  }





  qrToPdf() {
    // Example HTML content
    const html = document.getElementsByClassName("qrToPdf");

    const elements = document.getElementsByClassName('qrToPdf');
    if (elements.length > 0) {
      const html = elements[0].innerHTML;
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      // Convert the HTML to a PDFMake document definition
      const pdfMakeDocDefinition = {
        content: htmlToPdfmake(html)
      };

      // Generate the PDF and download it
      pdfMake.createPdf(pdfMakeDocDefinition).download('document.pdf');
    } else {
      console.error('No element found with the specified class.');
    }

  }

  async convertHtmlToPdf(url: any) {
    try {
      // Fetch and convert the QR code image to base64
      const imgElement = document.getElementById('qr_image_e') as HTMLImageElement;
       const base64Image = await this.convertImageToBase64(`${url}`);

      imgElement.src = base64Image;

      // Fetch the HTML content from the DOM
      const element = document.getElementById('qrToPdf');
      if (element) {
        const html = element.innerHTML;

        // Convert the HTML to a PDFMake document definition
        const pdfMakeContent = htmlToPdfmake(html);
        const docDefinition = {
          content: pdfMakeContent
        };

        // Generate the PDF and download it
        pdfMake.createPdf(docDefinition).download('document.pdf');
      } else {
        console.error('No element found with the specified ID.');
      }
    } catch (error) {
      console.error('Error fetching and converting image:', error);
    }
  }

  private async convertImageToBase64(url: string): Promise<string> {
    const response = await fetch(url , {mode: "no-cors"});
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          if (!base64data.startsWith('data:image/')) {
            reject(new Error('Unknown image format.'));
          } else {
            resolve(base64data);
          }
        };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }


  // downloadImage(url: any) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('GET', url, true);
  //   xhr.responseType = 'blob';

  //   xhr.onload = function() {
  //     if (xhr.status === 200) {
  //       const blob = xhr.response;
  //       const blobUrl = URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = blobUrl;
  //       a.download = url.split('/').pop()  ;
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //       URL.revokeObjectURL(blobUrl);
  //     } else {
  //       console.error('Failed to download image. Status: ' + xhr.status);
  //     }
  //   };

  //   xhr.onerror = function() {
  //     console.error('An error occurred while trying to download the image.');
  //   };

  //   xhr.send();
  // }






  //   downloadImageV()  {
  //     const url = 'https://devapi.studiflats.com/Uploads/QR983874.png'; // Replace with your local image URL
  //     const filename = 'downloaded_image.jpg';

  //     fetch(url, {
  //           mode: 'no-cors',
  //         })
  //         .then(response => {
  //             if (!response.ok) {
  //                 throw new Error('Network response was not ok');
  //             }
  //             return response.blob();
  //         })
  //         .then(blob => {
  //             const blobUrl = URL.createObjectURL(blob);
  //             const a = document.createElement('a');
  //             a.href = blobUrl;
  //             a.download = filename;
  //             document.body.appendChild(a);
  //             a.click();
  //             document.body.removeChild(a);
  //             URL.revokeObjectURL(blobUrl);
  //         })
  //         .catch(err => console.error('Download failed:', err));
  // }



  DownloadProfilePic(downloadLink: any) {
    FileSaver.saveAs(downloadLink, 'image.jpg');
  }

  downloadImage2(downloadLink: any) {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(downloadLink);
    a.download = 'cc';
    document.body.appendChild(a);
    a.click();
  }











  ////////////////update more details/////////////
  images: any[] = [];
  displayCustom: boolean = false;
  activeIndex: number = 0;

  responsiveOptions: any[] = [];
  // Method to open the gallery in fullscreen mode when an image is clicked
  onImageClick(item: any) {
    const index = this.images.findIndex(i => i.itemImageSrc === item.itemImageSrc);
    this.activeIndex = index; // Set the clicked image as active
    this.displayCustom = true; // Open the gallery in full-screen
  }
  onValueChange(event: any) {
    console.log('Galleria value changed', event);
    // You can update the images or handle any other changes here
  }

  products: any[] = []; // Array to hold the product data
  cols: any[] = [];
  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++) this.subscriptions[i].unsubscribe();
  }
}
