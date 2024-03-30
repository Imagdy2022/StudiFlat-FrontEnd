import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-header-table',
  templateUrl: './header-table.component.html',
  styleUrls: ['./header-table.component.scss']
})
export class HeaderTableComponent {
@Input() headTitle:string=''
@Input() listDropDown:Array<object>=[]

selectedfromDropDown(value:any){

}
}
