import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LordDetailsComponent } from './lord-details.component';

describe('LordDetailsComponent', () => {
  let component: LordDetailsComponent;
  let fixture: ComponentFixture<LordDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LordDetailsComponent]
    });
    fixture = TestBed.createComponent(LordDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
