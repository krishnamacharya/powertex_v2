import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyPaidReportPrintComponent } from './duty-paid-report-print.component';

describe('DutyPaidReportPrintComponent', () => {
  let component: DutyPaidReportPrintComponent;
  let fixture: ComponentFixture<DutyPaidReportPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyPaidReportPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyPaidReportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
