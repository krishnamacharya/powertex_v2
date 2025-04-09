import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsPendingPrintComponent } from './payments-pending-print.component';

describe('PaymentsPendingPrintComponent', () => {
  let component: PaymentsPendingPrintComponent;
  let fixture: ComponentFixture<PaymentsPendingPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsPendingPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsPendingPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
