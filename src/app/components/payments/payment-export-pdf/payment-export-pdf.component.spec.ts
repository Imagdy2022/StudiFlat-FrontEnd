import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentExportPdfComponent } from './payment-export-pdf.component';

describe('PaymentExportPdfComponent', () => {
  let component: PaymentExportPdfComponent;
  let fixture: ComponentFixture<PaymentExportPdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentExportPdfComponent]
    });
    fixture = TestBed.createComponent(PaymentExportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
