import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApartmentService } from '../../../_services/apartments/apartment.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {

  @Input() show: boolean = true
  @Input() list: Array<any> = []
  @Input() labelinputs: any = {}

  @Input() textButton: string = ''
  @Output() transport = new EventEmitter<object>();
  @Output() inputField = new EventEmitter<object>();
  @Output() skill = new EventEmitter<object>();

  Createtransport: any
  text1: string = ''
  text2: string = ''
  content1: string = ''
  content2: string = ''
  apt_UUID: string = ''
  RemoveActionButton() {
    this.show = false
  }
  constructor(public _ApartmentService: ApartmentService,    private messageService: MessageService,
    ) { }
  ngOnInit(): void {

  }
  saveActionButton() {
    if(this.content1==""||this.content2==""){
      this.messageService.add({ severity: 'error', summary: 'error', detail: `${'please fill inputs before save'}` });

    }
    else{
      this.transport.emit({t_Name:this.content1,t_Distance:this.content2});
      this.list.push({ text1: this.labelinputs.text1, content1: this.content1, text2: this.labelinputs.text2, content2: this.content2 })
      this.show = false
      this.inputField.emit({field_Name:this.content1,field_Content:this.content2});
      this.skill.emit({skill_Name:this.content1,skill_Content:this.content2});

      this.content1 = ''
      this.content2 = ''
    }

  }
 removeitem(){

 }
}
