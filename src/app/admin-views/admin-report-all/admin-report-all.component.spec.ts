import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportAllComponent } from './admin-report-all.component';

describe('AdminReportAllComponent', () => {
  let component: AdminReportAllComponent;
  let fixture: ComponentFixture<AdminReportAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReportAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
