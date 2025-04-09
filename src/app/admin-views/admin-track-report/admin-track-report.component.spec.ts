import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrackReportComponent } from './admin-track-report.component';

describe('AdminTrackReportComponent', () => {
  let component: AdminTrackReportComponent;
  let fixture: ComponentFixture<AdminTrackReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTrackReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrackReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
