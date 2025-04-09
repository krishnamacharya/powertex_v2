import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminonportSummaryPrintComponent } from './adminonport-summary-print.component';

describe('AdminonportSummaryPrintComponent', () => {
  let component: AdminonportSummaryPrintComponent;
  let fixture: ComponentFixture<AdminonportSummaryPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminonportSummaryPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminonportSummaryPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
