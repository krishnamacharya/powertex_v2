import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsHistoryPrintComponent } from './payments-history-print.component';

describe('PaymentsHistoryPrintComponent', () => {
  let component: PaymentsHistoryPrintComponent;
  let fixture: ComponentFixture<PaymentsHistoryPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsHistoryPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsHistoryPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
