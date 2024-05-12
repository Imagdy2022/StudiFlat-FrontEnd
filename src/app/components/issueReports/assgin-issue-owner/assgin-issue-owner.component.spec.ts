/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AssginIssueOwnerComponent } from './assgin-issue-owner.component';

describe('AssginIssueOwnerComponent', () => {
  let component: AssginIssueOwnerComponent;
  let fixture: ComponentFixture<AssginIssueOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssginIssueOwnerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssginIssueOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
