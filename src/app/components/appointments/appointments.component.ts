import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { AppointmentsService } from './appointments.service';
import { Table } from 'primeng/table';
import { Menu } from 'primeng/menu';
import { ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],

})
export class AppointmentsComponent {
  @ViewChild('closebutton') closebutton: any;
  showEdit: Array<boolean> = [];
 showSide: string = '';
 products!: Array<object>;
 selectedProducts: Array<object> = [];
 headerData: Array<any> = [];
//  loading: boolean = true;
 search:boolean=false;
 partnerId:any;
 subscriptions:Subscription[] = [];
 listDropDown:Array<object>=[{name:'All'},{name:'Today'},{name:'Last Week'},{name:'This month'},{name:'This year'}]

 constructor(private datePipe: DatePipe,private appointmentsService: AppointmentsService, public _adminservices:AdminsService ,public router: Router,private messageService: MessageService,) {

 }
 @ViewChild('dt2') dt2!: Table;
  apartments: any[] = [];
  loading: boolean = false;
  value:any;

  items!: any;
  appointments:any[]=[];
  selectedAppointment:any;
  number:string='5';



 ngOnInit() {

  this.items = [
    {
      label: 'View Details',
      icon: 'pi pi-eye',
      command: () =>  {

          this.getDetails('details');

      }
    },
    {
      label: 'Update',
      icon: 'pi pi-pencil',
      command: () =>  {

        this.getDetails('update');

    }
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () =>  {
         this.sureDeleteDialog()
    }

    },

  ];

  this. loadAppointments(1,20000,null);
  this.loadApartAppointments(1,20000,null);
 }

 formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}


 loadAppointments(pageNo: number, pageSize: number, search: any): void {
  this.appointmentsService.getAppointments(pageNo, pageSize, search).subscribe(
    (response) => {
      console.log('Appointments:', response);
      // Map the response data to create a simplified structure for appointments
      this.appointments = response.data.map((appointment: any) => ({

        apartment_Location: appointment.apartment_Location,
        apartment_Manager: appointment.apartment_Manager,
        apartment_Name: appointment.apartment_Name,
        appo_Code: appointment.appo_Code,
        appo_Date: appointment.appo_Date,
        appo_Desc: appointment.appo_Desc,
        appo_From: this.formatTime(appointment.appo_From),
        appo_ID: appointment.appo_ID,
        appo_Title: appointment.appo_Title,
        appo_To: this.formatTime(appointment.appo_To),
      }));
      this.number=this.appointments.length.toString()
    },
    (error) => {
      console.error('Error fetching appointments:', error);
    }
  );
}
numberApart:string;
selectedApartment:any
loadApartAppointments(pageNo: number, pageSize: number, search: any): void {
  this.appointmentsService.getApartAppointments(pageNo, pageSize, search).subscribe(
    (response) => {
      console.log('Apartments:', response);
      // Map the response data to create a simplified structure for appointments
      this.apartments = response.data.map((apartment: any) => ({
        apartment_ID: apartment.apartment_ID,
        apartment_Code: apartment.apartment_Code,
        apartment_Name: apartment.apartment_Name,
        apartment_Location: apartment.apartment_Location,
        apartment_Manager: apartment.apartment_Manager,

      }));
      this.numberApart=this.apartments.length.toString()
    },
    (error) => {
      console.error('Error fetching appointments:', error);
    }
  );
}

visible:boolean=false;
notDisable:boolean=true;
showDialog(){
  this.appointmentData = {
    apartment_ID: '',
    appo_Title: '',
    appo_Desc: '',
    appo_Date: '',
    appo_From: '',
    appo_To: ''
  };
  this.appointmentDataUpdate = {
     appo_ID: '',
    appo_Title: '',
    appo_Desc: '',
    appo_Date: '',
    appo_From: '',
    appo_To: ''
  };
  this.appo_Date='';
  this.appo_Desc='';
  this.appo_Title='';
  this.appo_From='';
  this.appo_To='';

  this.visible=true;
  // this.loadApartAppointments(1,20000,null);

}
sureDelete:boolean=false;
sureDeleteDialog(){

  this.sureDelete=true;
  // this.loadApartAppointments(1,20000,null);

}




appointmentData = {
  apartment_ID: '',
  appo_Title: '',
  appo_Desc: '',
  appo_Date: '',
  appo_From: '',
  appo_To: ''
};

appo_Title:any;
appo_Desc:any
appo_Date:any;
appo_From:any;
appo_To:any;

showSuccess:boolean=false;
createAppointment() {
  console.log('Selected Apartment:', this.selectedApartment);
  const aprtID=localStorage.getItem('aprtID') ||''
  this.appointmentData = {
    apartment_ID: aprtID,
    appo_Title: this.appo_Title,
    appo_Desc: this.appo_Desc,
    appo_Date: this.appo_Date.toString(),
    appo_From: this.appo_From ,
    appo_To: this.appo_To
  };
console.log(this.appointmentData)

  this.appointmentsService.createNewAppointment(this.appointmentData).subscribe(
    (response) => {
      console.log('Appointment created successfully:', response);
    this.messageService.add({ severity: 'success', summary: 'Created Successfully', detail: 'Appointment has been created successfully' });
   this.visible=false;
  this. loadAppointments(1,20000,null);

      // Optionally reset form or display success message
    },
    (error) => {
      console.error('Error creating appointment:', error);
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error on create Appointment' });

    }
  );
}
appointmentDataUpdate = {
  appo_ID: '',
  appo_Title: '',
  appo_Desc:  '',
  appo_Date:  '',
  appo_From: '',
  appo_To:  ''
};
setFromValue(timeString: any): string {
  // Convert timeString to string to avoid errors
  const timeStr = String(timeString);
  // Check if the time string contains "AM" or "PM"
  if (timeStr.includes("AM") ||timeStr.includes("PM")) {
    return this.fromUpdate;
  } else {
    return this.appo_From;
  }
}
setToValue(timeString: any): string {
  const timeStr = String(timeString);


  // Check if the time string contains "AM" or "PM"
  if (timeStr.includes("AM") || timeStr.includes("PM")) {
    return this.toUpdate;
  } else {
    return this.appo_To;
  }
}


updateAppointment() {

  this.appointmentDataUpdate = {
    appo_ID: this.appoID,
    appo_Title: this.appo_Title,
    appo_Desc: this.appo_Desc,
    appo_Date: this.appo_Date.toString(),
    appo_From: this.setFromValue(this.appo_From),
    appo_To:  this.setToValue(this.appo_To)
  };
console.log(this.appointmentDataUpdate)

  this.appointmentsService.updateAppointment(this.appointmentDataUpdate).subscribe(
    (response) => {
      console.log('Appointment updated successfully:', response);
    this.messageService.add({ severity: 'success', summary: 'Updated Successfully', detail: 'Appointment has been updated successfully' });
   this.updateDialog=false;
  this. loadAppointments(1,20000,null);

      // Optionally reset form or display success message
    },
    (error) => {
      console.error('Error updating appointment:', error);
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error on update Appointment' });

    }
  );
}



 onFilter(event: Event) {
  const inputValue = (event.target as HTMLInputElement).value;
  console.log(inputValue)
  this.dt2.filterGlobal(inputValue, 'contains');
  console.log(this.dt2);
  // console.log(this.dt2.filterGlobal(inputValue, 'contains'))
}

onRowSelect(event: any) {
  console.log(event)
  const appoID = event.data.appo_ID;
  console.log('id',appoID);
  this.selectAppointment(appoID);
  this.getDetails('details')
  // this.router.navigate(['/worker-details', workerId]);
}
detailDialog:boolean=false
appoID:any;
selectAppointment(appoID: any) {

  this.appoID=appoID;

}
appointmentDetails:any
updateDialog:boolean=false;
fromUpdate:any;
toUpdate:any;
getDetails(action:string){
  if(action==='details'){
    this.detailDialog=true;
  }else{
    this.updateDialog=true;
  }

  this.appointmentsService.getAppointmentDetails(this.appoID).subscribe(
    (response) => {
      this.appointmentDetails = response;
      console.log(this.appointmentDetails)
     this.fromUpdate=this.appointmentDetails.appo_From;
     this.toUpdate=this.appointmentDetails.appo_To;

     this.appo_Title=this.appointmentDetails.appo_Title;
     this.appo_Desc=this.appointmentDetails.appo_Desc;
    //  this.appo_Date=this.appointmentDetails.appo_Date | date: 'yyyy/MM/dd';
     this.appo_Date = this.datePipe.transform(this.appointmentDetails.appo_Date, 'yyyy/MM/dd');
     this.appo_From=this.formatTime(this.appointmentDetails.appo_From);
     this.appo_To=this.formatTime(this.appointmentDetails.appo_To);
console.log(this.appo_Date)

    },
    (error) => {
      console.error('Error fetching appointment details:', error);
    }
  );
}



 /**
  * addItem
  * @param value string
  * @returns void
  */
 addItem(value: string): void {
  this.showSide = value
}

selected:boolean=false;

assignApartment(apartment:any) {

  if (this.selectedApartment) {
    this.notDisable=false;
    this.selected=true;
    this.appointmentData = {
      apartment_ID: '',
      appo_Title: '',
      appo_Desc: '',
      appo_Date: '',
      appo_From: '',
      appo_To: ''
    };
  console.log('d',this.notDisable)

    // Handle the assignment, e.g., navigate back or update the issue with the selected staff ID
    this.selectedApartment =apartment ;
    console.log('Selected Apartment:', this.selectedApartment);
    localStorage.setItem('aprtID',this.selectedApartment.apartment_ID)

  }
}
reset(){
  this.notDisable=true;
  this.selected=false;
  console.log('d',this.notDisable)
}

selectedAprtId:any;
selectApartment(workerId:any) {
  this.selectedAprtId = workerId;
  console.log(this.selectedAprtId)
}
deleteAppointment(){
  this.appointmentsService.deleteAppointment(this.appoID).subscribe(
    (response) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Appointment deleted successfully' });
      this.sureDelete=false;
  this. loadAppointments(1,20000,null);

      // Refresh your data or handle UI changes after deletion here
    },
    (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete appointment' });
    }
  );
}







}
