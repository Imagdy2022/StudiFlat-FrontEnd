import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.scss']
})
export class StatisticsTableComponent {
@Input() listDropDown :Array<object>=[]
@Input() headTableList:Array<string>=[]
@Input() rowDatalist:Array<any>=[]
@Input() headTitle:string=''
selectedfromDropDown(value:any){
 }
}
