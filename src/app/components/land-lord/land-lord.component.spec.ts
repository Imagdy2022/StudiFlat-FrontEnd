import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandLordComponent } from './land-lord.component';

describe('LandLordComponent', () => {
  let component: LandLordComponent;
  let fixture: ComponentFixture<LandLordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandLordComponent]
    });
    fixture = TestBed.createComponent(LandLordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
