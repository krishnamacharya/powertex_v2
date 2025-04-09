import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyPaidReportComponent } from './duty-paid-report.component';

describe('DutyPaidReportComponent', () => {
  let component: DutyPaidReportComponent;
  let fixture: ComponentFixture<DutyPaidReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyPaidReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyPaidReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
