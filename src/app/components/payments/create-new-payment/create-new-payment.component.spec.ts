import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPaymentComponent } from './create-new-payment.component';

describe('CreateNewPaymentComponent', () => {
  let component: CreateNewPaymentComponent;
  let fixture: ComponentFixture<CreateNewPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewPaymentComponent]
    });
    fixture = TestBed.createComponent(CreateNewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
