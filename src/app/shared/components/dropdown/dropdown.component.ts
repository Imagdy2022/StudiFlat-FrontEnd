import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent {
  @Input() list: Array<object> = []
  @Input()  holder: any="";
  @Input()  optionV: any="";

  selecteddata: any = null;

  @Output() selected = new EventEmitter<string>();

  selectedData() {
    this.selected.emit(this.selecteddata)
  }

}
