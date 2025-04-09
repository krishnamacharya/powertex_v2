import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDiscountsComponent } from './payment-discounts.component';

describe('PaymentDiscountsComponent', () => {
  let component: PaymentDiscountsComponent;
  let fixture: ComponentFixture<PaymentDiscountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentDiscountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
