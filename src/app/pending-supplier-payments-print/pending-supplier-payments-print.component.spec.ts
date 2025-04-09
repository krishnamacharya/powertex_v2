import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSupplierPaymentsPrintComponent } from './pending-supplier-payments-print.component';

describe('PendingSupplierPaymentsPrintComponent', () => {
  let component: PendingSupplierPaymentsPrintComponent;
  let fixture: ComponentFixture<PendingSupplierPaymentsPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingSupplierPaymentsPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingSupplierPaymentsPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
