import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsuccessfullComponent } from './paymentsuccessfull.component';

describe('PaymentsuccessfullComponent', () => {
  let component: PaymentsuccessfullComponent;
  let fixture: ComponentFixture<PaymentsuccessfullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsuccessfullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsuccessfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
