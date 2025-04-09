import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingClearancePaymentComponent } from './outstanding-clearance-payment.component';

describe('OutstandingClearancePaymentComponent', () => {
  let component: OutstandingClearancePaymentComponent;
  let fixture: ComponentFixture<OutstandingClearancePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingClearancePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingClearancePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
