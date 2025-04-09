import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrackReportPrintComponent } from './admin-track-report-print.component';

describe('AdminTrackReportPrintComponent', () => {
  let component: AdminTrackReportPrintComponent;
  let fixture: ComponentFixture<AdminTrackReportPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTrackReportPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrackReportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
