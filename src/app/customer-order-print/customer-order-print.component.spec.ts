import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderPrintComponent } from './customer-order-print.component';

describe('CustomerOrderPrintComponent', () => {
  let component: CustomerOrderPrintComponent;
  let fixture: ComponentFixture<CustomerOrderPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
