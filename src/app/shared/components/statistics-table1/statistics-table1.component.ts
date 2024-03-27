import { Component ,Input } from '@angular/core';

@Component({
  selector: 'app-statistics-table1',
  templateUrl: './statistics-table1.component.html',
  styleUrls: ['./statistics-table1.component.scss']
})
export class StatisticsTable1Component {
  @Input() listDropDown :Array<object>=[]
  @Input() headTableList:Array<string>=[]
  @Input() rowDatalist:Array<any>=[]
  @Input() headTitle:string=''
  @Input() UserreportproblemsTable:Array<any>=[]
  selectedfromDropDown(value:any){

  }

}
