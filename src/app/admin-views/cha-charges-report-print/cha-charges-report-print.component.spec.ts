import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaChargesReportPrintComponent } from './cha-charges-report-print.component';

describe('ChaChargesReportPrintComponent', () => {
  let component: ChaChargesReportPrintComponent;
  let fixture: ComponentFixture<ChaChargesReportPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaChargesReportPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaChargesReportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
