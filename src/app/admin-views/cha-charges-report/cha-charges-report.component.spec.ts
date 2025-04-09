import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaChargesReportComponent } from './cha-charges-report.component';

describe('ChaChargesReportComponent', () => {
  let component: ChaChargesReportComponent;
  let fixture: ComponentFixture<ChaChargesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaChargesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaChargesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
