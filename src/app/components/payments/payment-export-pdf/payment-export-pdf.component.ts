import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-payment-export-pdf',
  templateUrl: './payment-export-pdf.component.html',
  styleUrls: ['./payment-export-pdf.component.scss']
})
export class PaymentExportPdfComponent {
  headerData: Array<any> = [];
  showSide: string = '';
  payments:any=[ ];
  subscriptions:Subscription[] = [];
  constructor(public router: Router,private messageService: MessageService, public _adminservices: AdminsService,
  ) {

 }
  addItem(value: any) {
    this.showSide = value
  }
  ngOnInit(): void {


  }

  exportAsPDF(divId:any)
  {

      let data = document.getElementById(divId)!;
      html2canvas(data,{useCORS: true}).then(canvas => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('Finance.pdf');
    });
  }


  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++)
    this.subscriptions[i].unsubscribe();
  }
}
