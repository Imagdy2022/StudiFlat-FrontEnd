import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ESideBar } from './constant';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  /** SideBarConstant */
  SideBarConstant = ESideBar;

  constructor(
    private router: Router,private       authenticationService: AuthenticationService

  ) { }
  /** listAnchors */
  listAnchors: Array<any> = [
    { text: "dashboard", img: "assets/images/navigation/dashboard.svg" },
    { text: "apartments", img: "assets/images/navigation/apartment.svg" },
    { text: "users", img: "assets/images/navigation/users.svg" },
    { text: "owners", img: "assets/images/navigation/owner 2.svg" },
    { text: "payments", img: "assets/images/navigation/payments.svg" },
    { text: "messages", img: "assets/images/navigation/messages.svg" },
    { text: "statistics", img: "assets/images/navigation/stats.svg" },
    { text: "inquiries", img: "assets/images/navigation/help.svg" },

    { text: "Issue_Reports", img: "assets/images/navigation/reports.svg" }];

  listAnchorsOther: Array<any> = [
    { text: "Help", img: "assets/images/navigation/help.svg" },
    { text: "Settings", img: "assets/images/navigation/setting.svg" },
    { text: "Logout", img: "assets/images/navigation/logout.svg" },

  ]
  /** link */
  link: Array<boolean> = [];
  /** param */
  param: number = 0;
  permissions:any=[]
  /** showSide */
  @Input() showSide: string = '';
  @Input() titlepage: string = '';
  workers:any={}
  Statistics:any={}
  Messages:any={}
  Owners:any={}
  Issue:any={}
  Users:any={}
  partners:any={}
  Apartments:any={}
  Settings:any={}
  Payments:any={}
  Inquiries:any={}
  Dashboard:any={}
  is_Super:any
  ngOnInit(): void {

    if(this.router.url=='/admins'||this.router.url=='/roles'||this.router.url=='/app-msgs' ||
    this.router.url=='/push-msgs' || this.router.url.includes('/authorization/')){
      this.isFreeze=true
    }
    if(this.router.url=='/inquiries'||this.router.url=='/cancel-inquire'|| this.router.url.includes('/inquire-offer') ||
    this.router.url=='/checkout-inquire' ||this.router.url.includes('/cancel-inquire/view-cancel/') ||
    this.router.url.includes('/checkout-inquire/checkout/') || this.router.url.includes('/waitingList')){
      this.isFreeze2=true
    }

   const data = localStorage.getItem("user");
   if (data !== null) {

    let parsedData = JSON.parse(data);
    this.permissions=parsedData.permissions;
    this.is_Super=parsedData.is_Super
    if(parsedData.is_Super==false) {
for(let i=0; i<this.permissions.length;i++){
  if(this.permissions[i].page_Name=="workers"){
    this.workers=this.permissions[i];
  }

  else if(this.permissions[i].page_Name=="Messages"){
    this.Messages=this.permissions[i];
  }
  else if(this.permissions[i].page_Name=="Statistics"){
    this.Statistics=this.permissions[i];
  }
  else if(this.permissions[i].page_Name=="Owners"){
    this.Owners=this.permissions[i];
  }
  else if(this.permissions[i].page_Name=="Issue Reports"){
    this.Issue=this.permissions[i];
  }
  else if(this.permissions[i].page_Name=="Users"){
    this.Users=this.permissions[i];
  }
  else if(this.permissions[i].page_Name=="partners"){
    this.partners=this.permissions[i];
  }
  else if(this.permissions[i].page_Name=="Apartments"){
    this.Apartments=this.permissions[i];
  }
  else if(this.permissions[i].page_Name=="Settings"){
    this.Settings=this.permissions[i];
  }
  else if(this.permissions[i].page_Name=="Inquiries"){
    this.Inquiries=this.permissions[i];
  }
  else if(this.permissions[i].page_Name=="Payments"){
    this.Payments=this.permissions[i];
  }
  else if(this.permissions[i].page_Name=="Dashboard"){
    this.Dashboard=this.permissions[i];
  }
}}
  }
    this.listAnchors.concat(this.listAnchorsOther).forEach(element => {
      if (element.text === this.titlepage) { this.link[this.param] = true }
      else this.param++
    });

  }

  /**
   * changeAnchor
   * @description ....
   * @returns void
   **/
  isShow="false"
  changeAnchor(index: number): void {

    if(index=10){
    this.isShow="true"
    // this.param = index
    // this.link = this.link.map(el => el == true ? false : false)
    // this.link[index] = true
    // if (index == this.SideBarConstant.Logout) {
    //   this.router.navigate(['/login']);
    // }
    }else{
      this.isShow="false"
      this.param = index
      this.link = this.link.map(el => el == true ? false : false)
      this.link[index] = true
      // if (index == this.SideBarConstant.Logout) {

      //   this.router.navigate(['/login']);
      // }
    }

  }
  color_image:any=false
  changeAnchor2(name:any){

    this.color_image = true
  }
  isFreeze: boolean = false;
  isFreeze2: boolean = false;

  setfraze(){
    this.isFreeze=true
  }

  setfraze2(){
    this.isFreeze2=true
  }
  display = 'none';

  logoutModal() {
    this.display = 'block';
    this.display = 'flex';
  }
  onCloseHandled() {
    this.display = 'none';
  }
  onSubmitModal2(){
    this.authenticationService.logout() ;


}
}
