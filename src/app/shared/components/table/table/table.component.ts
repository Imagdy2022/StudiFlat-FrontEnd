import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { IOnwer } from 'src/app/models/onwer';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class TableComponent implements OnInit, OnChanges {
  /**products */
  @Input() products!: Array<IOnwer>;
  /** selectedProducts */
  @Input() selectedProducts: Array<object> = [];
  /** headerData */
  @Input() headerData: Array<any> = [];
  /** dataSelectionKey */
  @Input() dataSelectionKey: string = '';
  /** childName */
  @Input() childName: string = '';
  /**spinner */
  spinner: boolean = true;

  ngOnInit(): void {
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && changes['products'].currentValue !== changes['products'].previousValue) {
      // Trigger the product has been loaded
      if (this.products.length > 0) {
        this.spinner = false;
      }

    }
  }

  /**
   * getSeverity
   * @param status
   * @returns string
   */
  getSeverity(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'unknown';
    }
  }

  /**
   * GetSelectedItem
   * @returns void
   */
  GetSelectedItem(product: object): void {
  }
}
