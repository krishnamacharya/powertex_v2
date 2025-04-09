import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierInvoicePrintComponent } from './supplier-invoice-print.component';

describe('SupplierInvoicePrintComponent', () => {
  let component: SupplierInvoicePrintComponent;
  let fixture: ComponentFixture<SupplierInvoicePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierInvoicePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierInvoicePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
