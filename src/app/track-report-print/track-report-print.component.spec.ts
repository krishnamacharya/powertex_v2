import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackReportPrintComponent } from './track-report-print.component';

describe('TrackReportPrintComponent', () => {
  let component: TrackReportPrintComponent;
  let fixture: ComponentFixture<TrackReportPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackReportPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackReportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
