import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupSummaryPrintComponent } from './sup-summary-print.component';

describe('SupSummaryPrintComponent', () => {
  let component: SupSummaryPrintComponent;
  let fixture: ComponentFixture<SupSummaryPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupSummaryPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupSummaryPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
