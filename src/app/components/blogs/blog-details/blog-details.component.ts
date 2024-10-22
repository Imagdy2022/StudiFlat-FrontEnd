import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent {
  listDropDown:Array<object>=[{name:'All'},{name:'Today'},{name:'Last Week'},{name:'This month'},{name:'This year'}]

  items:any;
 ngOnInit() {

  this.items = [
    { label: 'manage blogs', routerLink: '/blogs' },
    { label: 'blog details', routerLink: '/' }
    ]

 }
   /**
  * addItem
  * @param value string
  * @returns void
  */
 showSide:string='';
 addItem(value: string): void {
  this.showSide = value
}

 /**
  * selectedfromDropDown
  * @param $event string
  * @returns void
  */
 Date:any="All"

 selectedfromDropDown(value:any){

  this.Date=value.name;


}
}
