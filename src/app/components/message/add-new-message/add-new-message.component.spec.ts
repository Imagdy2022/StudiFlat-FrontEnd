import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMessageComponent } from './add-new-message.component';

describe('AddNewMessageComponent', () => {
  let component: AddNewMessageComponent;
  let fixture: ComponentFixture<AddNewMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewMessageComponent]
    });
    fixture = TestBed.createComponent(AddNewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
