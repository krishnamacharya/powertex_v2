import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPendingPaymentsPrintComponent } from './supplier-pending-payments-print.component';

describe('SupplierPendingPaymentsPrintComponent', () => {
  let component: SupplierPendingPaymentsPrintComponent;
  let fixture: ComponentFixture<SupplierPendingPaymentsPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPendingPaymentsPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPendingPaymentsPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
