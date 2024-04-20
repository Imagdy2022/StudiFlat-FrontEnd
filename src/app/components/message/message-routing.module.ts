import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message.component';
import { AssginTicketComponent } from './assgin-ticket/assgin-ticket.component';
import { MessResquestComponent } from './mess-resquest/mess-resquest.component';
import { AddNewMessageComponent } from './add-new-message/add-new-message.component';


const routes: Routes = [
  {
    path: '', component: MessageComponent,
  },
  {
    path: 'assgin-tiket/:id', component: AssginTicketComponent,
  },
  {
    path: 'message-tiket/:id', component: MessResquestComponent,
  },
  {
    path: 'create-new', component: AddNewMessageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }

