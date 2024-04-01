import { Component } from '@angular/core';

@Component({
  selector: 'app-create-new-payment',
  templateUrl: './create-new-payment.component.html',
  styleUrls: ['./create-new-payment.component.scss']
})
export class CreateNewPaymentComponent {
  showSide: string = '';

  addItem(value: string): void {
    this.showSide = value
  }
}
