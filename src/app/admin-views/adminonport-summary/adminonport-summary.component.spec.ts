import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminonportSummaryComponent } from './adminonport-summary.component';

describe('AdminonportSummaryComponent', () => {
  let component: AdminonportSummaryComponent;
  let fixture: ComponentFixture<AdminonportSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminonportSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminonportSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
